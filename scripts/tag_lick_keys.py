import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LICKS_PATH = ROOT / "src/data/licks.js"

# 음 이름 패턴과 정규화 규칙
NOTE_PATTERN = r"(?:C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|[A-G])"
FLAT_TO_SHARP = {
    "DB": "C#",
    "EB": "D#",
    "GB": "F#",
    "AB": "G#",
    "BB": "A#",
}


def normalize_note(note: str) -> str:
    """플랫을 샵으로 정규화하고 대문자 표기로 통일한다."""
    raw = note.strip().upper()
    raw = raw.replace("♯", "#").replace("♭", "B")
    if raw in FLAT_TO_SHARP:
        return FLAT_TO_SHARP[raw]
    if len(raw) >= 2 and raw[1] == "B" and raw not in {"AB", "BB"}:
        return FLAT_TO_SHARP.get(raw, raw)
    return raw


def to_key(note: str, minor: bool) -> str:
    root = normalize_note(note)
    return f"{root}m" if minor else root


def minor_from_suffix(suffix: str) -> bool:
    s = (suffix or "").lower()
    if not s:
        return False
    if s.startswith("maj"):
        return False
    return s.startswith("m") or s.startswith("min") or s.startswith("minor")


def extract_keys_from_text(text: str) -> set[str]:
    keys: set[str] = set()
    if not text:
        return keys

    patterns = [
        # key of ...
        (re.compile(rf"key of\s+({NOTE_PATTERN})\s*(?:minor|min|m)\b", re.IGNORECASE), True),
        (re.compile(rf"key of\s+({NOTE_PATTERN})\s*(?:major|maj)\b", re.IGNORECASE), False),
        (re.compile(rf"key of\s+({NOTE_PATTERN})\b", re.IGNORECASE), False),
        # in the key of ...
        (re.compile(rf"in the key of\s+({NOTE_PATTERN})\s*(?:minor|min|m)\b", re.IGNORECASE), True),
        (re.compile(rf"in the key of\s+({NOTE_PATTERN})\s*(?:major|maj)\b", re.IGNORECASE), False),
        (re.compile(rf"in the key of\s+({NOTE_PATTERN})\b", re.IGNORECASE), False),
        # in ... minor/major
        (re.compile(rf"\bin\s+({NOTE_PATTERN})\s*(?:minor|min)\b", re.IGNORECASE), True),
        (re.compile(rf"\bin\s+({NOTE_PATTERN})\s*(?:major|maj)\b", re.IGNORECASE), False),
        (re.compile(rf"\bin\s+({NOTE_PATTERN})m\b", re.IGNORECASE), True),
    ]

    for regex, is_minor in patterns:
        for match in regex.finditer(text):
            keys.add(to_key(match.group(1), is_minor))

    # 코드/스케일 표기 기반 휴리스틱 (Gm7, Gmaj7, Am, etc.)
    chord_like = re.compile(
        rf"\b({NOTE_PATTERN})(maj|min|minor|m)?(?:(?:[0-9]|sus|dim|aug|add|\(|/|#|b))",
        re.IGNORECASE,
    )
    for match in chord_like.finditer(text):
        note = match.group(1)
        suffix = match.group(2) or ""
        keys.add(to_key(note, minor_from_suffix(suffix)))

    # "Gm triad", "Am chord" 같은 맥락형 마이너 표기를 잡기 위한 보강
    minor_context = re.compile(
        rf"\b({NOTE_PATTERN})m\b(?=\s*(?:triad|chord|scale|pentatonic|arpeggio|lick|riff|mode|key)\b)",
        re.IGNORECASE,
    )
    for match in minor_context.finditer(text):
        keys.add(to_key(match.group(1), True))

    # "g minor pentatonic" 같은 표현을 잡기 위한 보강
    scale_like_minor = re.compile(rf"({NOTE_PATTERN})\s*minor\b", re.IGNORECASE)
    for match in scale_like_minor.finditer(text):
        keys.add(to_key(match.group(1), True))

    return keys


def extract_keys_from_chords(chords: list[dict]) -> set[str]:
    keys: set[str] = set()
    chord_root = re.compile(rf"^({NOTE_PATTERN})", re.IGNORECASE)
    for chord in chords or []:
        label = str(chord.get("label", "")).strip()
        if not label:
            continue
        m = chord_root.match(label)
        if not m:
            continue
        note = m.group(1)
        rest = label[m.end():].lower()
        is_minor = rest.startswith("m") and not rest.startswith("maj")
        keys.add(to_key(note, is_minor))
    return keys


def load_licks_json() -> list[dict]:
    node_script = """
import { licks } from './src/data/licks.js';
const data = licks.map((l) => ({
  id: l.id,
  title: l.title,
  description: l.description,
  chords: l.chords || [],
}));
console.log(JSON.stringify(data));
""".strip()
    result = subprocess.run(
        ["node", "--input-type=module", "-e", node_script],
        check=True,
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    return json.loads(result.stdout or "[]")


def build_key_mapping(licks_data: list[dict]) -> dict[int, list[str]]:
    mapping: dict[int, list[str]] = {}
    key_counter = defaultdict(int)

    for lick in licks_data:
        text = f"{lick.get('title', '')}\n{lick.get('description', '')}"
        keys = extract_keys_from_text(text)
        keys |= extract_keys_from_chords(lick.get("chords", []))

        if not keys:
            continue

        # 보기 편하도록 정렬 및 중복 제거
        keys_list = sorted(keys)
        mapping[int(lick["id"])] = keys_list
        for key in keys_list:
            key_counter[key] += 1

    print(f"keys 태깅 대상 릭 수: {len(mapping)}")
    # Gm이 실제로 얼마나 잡히는지 확인
    print(f"Gm 태깅 수: {key_counter.get('Gm', 0)}")
    return mapping


def inject_keys_into_js(id_to_keys: dict[int, list[str]]) -> int:
    if not LICKS_PATH.exists():
        raise SystemExit(f"릭 데이터 파일이 없습니다: {LICKS_PATH}")

    text = LICKS_PATH.read_text(encoding="utf-8")
    lines = text.splitlines()

    out_lines: list[str] = []
    current_id: int | None = None
    current_keys: list[str] = []
    keys_inserted = False
    prop_indent = "        "

    id_re = re.compile(r"^(\s*)id:\s*(\d+),")
    keys_re = re.compile(r"^(\s*)keys:\s*\[.*\],\s*$")
    difficulty_re = re.compile(r"^(\s*)difficulty:")
    end_obj_re = re.compile(r"^\s*},\s*$")

    replaced_or_inserted = 0

    def keys_line(indent: str, keys_list: list[str]) -> str:
        return f"{indent}keys: {json.dumps(keys_list, ensure_ascii=False)},"

    for line in lines:
        id_match = id_re.match(line)
        if id_match:
            current_id = int(id_match.group(2))
            current_keys = id_to_keys.get(current_id, [])
            keys_inserted = False
            prop_indent = id_match.group(1)

        if current_id and current_keys:
            # 기존 keys가 있으면 교체
            keys_match = keys_re.match(line)
            if keys_match:
                if keys_inserted:
                    # 이미 keys를 삽입했다면 기존 keys 라인은 제거한다.
                    replaced_or_inserted += 1
                    continue
                out_lines.append(keys_line(keys_match.group(1), current_keys))
                keys_inserted = True
                replaced_or_inserted += 1
                continue

            # difficulty 다음에 keys 삽입
            diff_match = difficulty_re.match(line)
            if diff_match and not keys_inserted:
                out_lines.append(line)
                out_lines.append(keys_line(diff_match.group(1), current_keys))
                keys_inserted = True
                replaced_or_inserted += 1
                continue

            # 객체 종료 직전까지 못 넣었으면 종료 전에 삽입
            if end_obj_re.match(line) and not keys_inserted:
                out_lines.append(keys_line(prop_indent, current_keys))
                keys_inserted = True
                replaced_or_inserted += 1

        out_lines.append(line)

        if end_obj_re.match(line):
            current_id = None
            current_keys = []
            keys_inserted = False

    updated = "\n".join(out_lines) + "\n"
    LICKS_PATH.write_text(updated, encoding="utf-8")
    return replaced_or_inserted


def main() -> None:
    licks_data = load_licks_json()
    id_to_keys = build_key_mapping(licks_data)
    changed = inject_keys_into_js(id_to_keys)
    print(f"keys 라인 교체/삽입 수: {changed}")


if __name__ == "__main__":
    main()
