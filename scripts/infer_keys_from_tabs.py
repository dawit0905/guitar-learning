import json
import re
import subprocess
from collections import Counter, defaultdict
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

ROOT = Path(__file__).resolve().parents[1]
LICKS_PATH = ROOT / "src/data/licks.js"

# 표준 튜닝의 피치 클래스(12-TET, C=0)
# E=4, A=9, D=2, G=7, B=11, e=4
STRING_TO_PC = {
    "e": 4,
    "B": 11,
    "G": 7,
    "D": 2,
    "A": 9,
    "E": 4,
}
STANDARD_ORDER = ["e", "B", "G", "D", "A", "E"]

NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11]
MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10]
MAJ_PENT_INTERVALS = [0, 2, 4, 7, 9]
MIN_PENT_INTERVALS = [0, 3, 5, 7, 10]
MAJ_BLUES_INTERVALS = [0, 2, 3, 4, 7, 9]
MIN_BLUES_INTERVALS = [0, 3, 5, 6, 7, 10]

IMAGE_OR_URL_RE = re.compile(r"^(https?://|/licks/img/)", re.IGNORECASE)
IMAGE_EXT_RE = re.compile(r"\.(png|jpe?g|gif|webp|svg)(\?.*)?$", re.IGNORECASE)
MIDI_RE = re.compile(r"\.mid(\?.*)?$", re.IGNORECASE)

STRING_LABEL_RE = re.compile(r"^\s*([eE|BGDA])\s*[:|]")
FRET_RE = re.compile(r"\d+")


def load_licks_json() -> List[dict]:
    node_script = """
import { licks } from './src/data/licks.js';
const data = licks.map((l) => ({
  id: l.id,
  title: l.title,
  tab: String(l.tab || ''),
  keys: l.keys || [],
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


def is_url_tab(tab: str) -> bool:
    t = tab.strip()
    if not t:
        return False
    if IMAGE_OR_URL_RE.search(t):
        return True
    if IMAGE_EXT_RE.search(t) and t.startswith("/"):
        return True
    return bool(MIDI_RE.search(t) and (t.startswith("http") or t.startswith("/")))


def looks_like_tab_line(line: str) -> bool:
    s = line.strip()
    if not s:
        return False

    if STRING_LABEL_RE.match(s):
        return True

    digit_count = sum(ch.isdigit() for ch in s)
    dash_count = s.count("-")
    pipe_count = s.count("|")
    alpha_count = sum(ch.isalpha() for ch in s)

    if digit_count == 0:
        return False
    if dash_count + pipe_count < 3:
        return False
    # 일반 문장과 구분하기 위한 간단한 제한
    if alpha_count > digit_count * 2:
        return False
    return True


def detect_label(line: str) -> str | None:
    m = STRING_LABEL_RE.match(line.strip())
    if not m:
        return None
    label = m.group(1)
    # 파이프(|)로 시작하는 특이 케이스는 라벨로 보지 않는다.
    if label == "|":
        return None
    # 소문자 e는 하이 E, 대문자 E는 로우 E로 본다.
    return label


def chunk(seq: List[str], size: int) -> Iterable[List[str]]:
    for i in range(0, len(seq), size):
        yield seq[i : i + size]


def map_block_to_strings(block: List[str]) -> List[Tuple[str, str]]:
    """탭 블록을 (string_label, line) 목록으로 변환한다."""
    labeled: List[Tuple[str, str]] = []
    unlabeled: List[str] = []

    for line in block:
        label = detect_label(line)
        if label:
            labeled.append((label, line))
        else:
            unlabeled.append(line)

    if labeled and not unlabeled:
        return labeled

    mapped: List[Tuple[str, str]] = []
    if labeled:
        mapped.extend(labeled)

    # 라벨이 없는 라인은 6줄 단위로 표준 순서를 적용한다.
    for group in chunk(unlabeled, 6):
        if len(group) < 6:
            continue
        for idx, line in enumerate(group[:6]):
            mapped.append((STANDARD_ORDER[idx], line))

    return mapped


def extract_note_pcs_from_tab(tab: str) -> Counter:
    lines = tab.replace("\r", "").split("\n")

    blocks: List[List[str]] = []
    current: List[str] = []

    for line in lines:
        if looks_like_tab_line(line):
            current.append(line)
        else:
            if current:
                blocks.append(current)
                current = []
    if current:
        blocks.append(current)

    pcs: Counter = Counter()

    for block in blocks:
        mapped_lines = map_block_to_strings(block)
        for string_label, line in mapped_lines:
            base_pc = STRING_TO_PC.get(string_label)
            if base_pc is None:
                continue
            for fret_str in FRET_RE.findall(line):
                fret = int(fret_str)
                pc = (base_pc + fret) % 12
                pcs[pc] += 1

    return pcs


def scale_set(root_pc: int, intervals: List[int]) -> set:
    return {(root_pc + i) % 12 for i in intervals}


def score_scale(pcs: Counter, root_pc: int, intervals: List[int]) -> float:
    if not pcs:
        return 0.0
    total = sum(pcs.values())
    if total == 0:
        return 0.0
    allowed = scale_set(root_pc, intervals)
    in_scale = sum(count for pc, count in pcs.items() if pc in allowed)
    score = in_scale / total
    # 루트가 실제로 등장하면 약간 가산점
    if pcs.get(root_pc, 0) > 0:
        score += 0.04
    return min(score, 1.0)


def best_key_candidates(pcs: Counter) -> List[str]:
    if len(pcs) < 3 or sum(pcs.values()) < 6:
        return []

    major_types = [MAJOR_INTERVALS, MAJ_PENT_INTERVALS, MAJ_BLUES_INTERVALS]
    minor_types = [MINOR_INTERVALS, MIN_PENT_INTERVALS, MIN_BLUES_INTERVALS]

    major_scores: Dict[int, float] = {}
    minor_scores: Dict[int, float] = {}

    for root in range(12):
        major_scores[root] = max(score_scale(pcs, root, ints) for ints in major_types)
        minor_scores[root] = max(score_scale(pcs, root, ints) for ints in minor_types)

    best_major_root = max(major_scores, key=major_scores.get)
    best_minor_root = max(minor_scores, key=minor_scores.get)
    best_major_score = major_scores[best_major_root]
    best_minor_score = minor_scores[best_minor_root]

    keys: List[str] = []
    # 기준 점수는 다소 관대하게 잡고, 루트 등장 가산점으로 보정한다.
    if best_major_score >= 0.72:
        keys.append(NOTE_NAMES[best_major_root])
    if best_minor_score >= 0.72:
        keys.append(f"{NOTE_NAMES[best_minor_root]}m")

    # 둘 다 없으면, 더 높은 쪽 하나만 완화된 임계값으로 채택한다.
    if not keys:
        if best_major_score >= 0.66 and best_major_score >= best_minor_score:
            keys.append(NOTE_NAMES[best_major_root])
        elif best_minor_score >= 0.66:
            keys.append(f"{NOTE_NAMES[best_minor_root]}m")

    return keys


def infer_keys_for_missing(licks_data: List[dict]) -> Dict[int, List[str]]:
    inferred: Dict[int, List[str]] = {}
    stats = defaultdict(int)

    for lick in licks_data:
        lick_id = int(lick["id"])
        existing_keys = lick.get("keys", [])
        if existing_keys:
            stats["skip_existing_keys"] += 1
            continue

        tab = str(lick.get("tab", "")).strip()
        if not tab:
            stats["skip_empty_tab"] += 1
            continue
        if is_url_tab(tab):
            stats["skip_url_tab"] += 1
            continue

        pcs = extract_note_pcs_from_tab(tab)
        if not pcs:
            stats["skip_no_notes"] += 1
            continue

        keys = best_key_candidates(pcs)
        if not keys:
            stats["skip_low_confidence"] += 1
            continue

        inferred[lick_id] = keys
        stats["inferred"] += 1
        if "Gm" in keys:
            stats["gm_inferred"] += 1

    print({k: stats[k] for k in sorted(stats.keys())})
    return inferred


def inject_keys_into_js(id_to_keys: Dict[int, List[str]]) -> int:
    if not id_to_keys:
        print("추정된 keys가 없습니다.")
        return 0
    if not LICKS_PATH.exists():
        raise SystemExit(f"릭 데이터 파일이 없습니다: {LICKS_PATH}")

    text = LICKS_PATH.read_text(encoding="utf-8")
    lines = text.splitlines()

    out_lines: List[str] = []
    current_id: int | None = None
    current_keys: List[str] = []
    keys_inserted = False
    prop_indent = "        "

    id_re = re.compile(r"^(\s*)id:\s*(\d+),")
    keys_re = re.compile(r"^(\s*)keys:\s*\[.*\],\s*$")
    difficulty_re = re.compile(r"^(\s*)difficulty:")
    end_obj_re = re.compile(r"^\s*},\s*$")

    changed = 0

    def keys_line(indent: str, keys_list: List[str]) -> str:
        return f"{indent}keys: {json.dumps(keys_list, ensure_ascii=False)},"

    for line in lines:
        id_match = id_re.match(line)
        if id_match:
            current_id = int(id_match.group(2))
            current_keys = id_to_keys.get(current_id, [])
            keys_inserted = False
            prop_indent = id_match.group(1)

        if current_id and current_keys:
            keys_match = keys_re.match(line)
            if keys_match:
                if keys_inserted:
                    changed += 1
                    continue
                out_lines.append(keys_line(keys_match.group(1), current_keys))
                keys_inserted = True
                changed += 1
                continue

            diff_match = difficulty_re.match(line)
            if diff_match and not keys_inserted:
                out_lines.append(line)
                out_lines.append(keys_line(diff_match.group(1), current_keys))
                keys_inserted = True
                changed += 1
                continue

            if end_obj_re.match(line) and not keys_inserted:
                out_lines.append(keys_line(prop_indent, current_keys))
                keys_inserted = True
                changed += 1

        out_lines.append(line)

        if end_obj_re.match(line):
            current_id = None
            current_keys = []
            keys_inserted = False

    updated = "\n".join(out_lines) + "\n"
    LICKS_PATH.write_text(updated, encoding="utf-8")
    return changed


def main() -> None:
    licks_data = load_licks_json()
    inferred = infer_keys_for_missing(licks_data)
    changed = inject_keys_into_js(inferred)
    print(f"keys 삽입/교체 수: {changed}")


if __name__ == "__main__":
    main()
