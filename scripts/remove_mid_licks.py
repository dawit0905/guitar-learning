import re
from pathlib import Path

LICKS_PATH = Path("src/data/licks.js")
MID_RE = re.compile(r"\.mid(?=[^a-zA-Z0-9]|$)", re.IGNORECASE)
ID_RE = re.compile(r"\bid\s*:\s*(\d+)")
TITLE_RE = re.compile(r"\btitle\s*:\s*\"((?:\\.|[^\"\\])*)\"")


def extract_title(block: str) -> str:
    match = TITLE_RE.search(block)
    if not match:
        return "(제목 없음)"
    raw = match.group(1)
    return raw.replace('\\"', '"').replace('\\n', ' ').replace('\\\\', '\\')


def find_array_bounds(text: str) -> tuple[int, int]:
    marker = "export const licks = ["
    start_marker = text.find(marker)
    if start_marker == -1:
        raise RuntimeError("licks 배열 시작을 찾지 못했습니다.")
    array_start = text.find("[", start_marker)
    if array_start == -1:
        raise RuntimeError("licks 배열의 '['를 찾지 못했습니다.")

    # 문자열 내부의 ']' 때문에 깊이 계산이 깨질 수 있으므로
    # 파일의 마지막 배열 종료 패턴을 기준으로 잡는다.
    array_end_marker = text.rfind("];")
    if array_end_marker == -1:
        raise RuntimeError("licks 배열의 끝(];)을 찾지 못했습니다.")
    array_end = array_end_marker
    if array_end <= array_start:
        raise RuntimeError("licks 배열 경계가 비정상적입니다.")
    return array_start, array_end


def find_mid_blocks(text: str, array_start: int, array_end: int):
    depth = 0
    i = array_start + 1
    mid_blocks = []

    while i < array_end:
        ch = text[i]
        if ch == "{" and depth == 0:
            obj_start = i
            depth = 1
            i += 1
            while i < array_end and depth > 0:
                ch2 = text[i]
                if ch2 == "{":
                    depth += 1
                elif ch2 == "}":
                    depth -= 1
                i += 1

            obj_end = i  # '}' 다음 인덱스
            j = obj_end
            while j < array_end and text[j].isspace():
                j += 1
            if j < array_end and text[j] == ",":
                j += 1
                while j < array_end and text[j].isspace():
                    j += 1

            block = text[obj_start:j]
            if MID_RE.search(block):
                id_match = ID_RE.search(block)
                lick_id = int(id_match.group(1)) if id_match else -1
                title = extract_title(block)
                mid_blocks.append({
                    "range": (obj_start, j),
                    "id": lick_id,
                    "title": title,
                })
            continue

        if ch == "{":
            depth += 1
        elif ch == "}":
            depth = max(depth - 1, 0)
        i += 1

    return mid_blocks


def remove_ranges(text: str, ranges: list[tuple[int, int]]) -> str:
    if not ranges:
        return text
    ranges = sorted(ranges)
    parts = []
    cursor = 0
    for start, end in ranges:
        parts.append(text[cursor:start])
        cursor = end
    parts.append(text[cursor:])
    return "".join(parts)


def main():
    if not LICKS_PATH.exists():
        raise SystemExit(f"파일이 없습니다: {LICKS_PATH}")

    text = LICKS_PATH.read_text(encoding="utf-8")
    array_start, array_end = find_array_bounds(text)
    mid_blocks = find_mid_blocks(text, array_start, array_end)

    if not mid_blocks:
        print(".mid를 사용하는 릭이 없습니다.")
        return

    ranges = [item["range"] for item in mid_blocks]
    updated = remove_ranges(text, ranges)
    LICKS_PATH.write_text(updated, encoding="utf-8")

    print(f".mid 릭 제거 완료: {len(mid_blocks)}개")
    for item in mid_blocks:
        print(f"- id={item['id']} title={item['title']}")


if __name__ == "__main__":
    main()
