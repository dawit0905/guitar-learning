import json
import re
import subprocess
import sys
from html import unescape
from pathlib import Path
from typing import Dict, List, Tuple

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.all-guitar-chords.com"
INDEX_URL = f"{BASE_URL}/guitar-licks"
LICKS_PATH = Path("src/data/licks.js")


def fetch_html(url: str) -> str:
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.text


def parse_index(html: str) -> List[Tuple[int, str, str]]:
    """인덱스 페이지에서 (site_id, title, difficulty) 목록을 추출한다."""
    soup = BeautifulSoup(html, "html.parser")
    table_box = soup.select_one("div.table-box")
    if not table_box:
        raise RuntimeError("인덱스에서 div.table-box를 찾지 못했습니다.")

    results: List[Tuple[int, str, str]] = []
    current_diff = None

    for child in table_box.children:
        if getattr(child, "name", None) == "h2":
            current_diff = child.get_text(strip=True)
            continue
        if getattr(child, "name", None) == "ul" and current_diff:
            for a in child.select("a[href^='/guitar-licks/']"):
                href = a.get("href", "")
                m = re.search(r"/guitar-licks/(\d+)", href)
                if not m:
                    continue
                site_id = int(m.group(1))
                title = unescape(a.get_text(strip=True))
                results.append((site_id, title, current_diff))

    # 중복 제거 (사이트 구조 변경 대비)
    dedup: Dict[int, Tuple[int, str, str]] = {}
    for site_id, title, diff in results:
        dedup[site_id] = (site_id, title, diff)

    return list(dedup.values())


def parse_author_date(text: str) -> Tuple[str, str]:
    """'by author (date)' 형태에서 author/date를 추출한다."""
    text = " ".join(text.split())
    m = re.search(r"by\s+(.*?)\s*\((.*?)\)", text, flags=re.IGNORECASE)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    m2 = re.search(r"by\s+(.*)", text, flags=re.IGNORECASE)
    if m2:
        return m2.group(1).strip(), "Unknown"
    return "Unknown", "Unknown"


def clean_tab(pre_tag) -> str:
    tab_text = pre_tag.get_text("\n")
    tab_text = tab_text.replace("\r", "")
    # 상단/하단의 과도한 공백 라인 제거
    lines = [line.rstrip() for line in tab_text.split("\n")]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return "\n".join(lines).strip()


def normalize_url(href: str) -> str:
    href = href.strip()
    if href.startswith("http://") or href.startswith("https://"):
        return href
    if href.startswith("/"):
        return f"{BASE_URL}{href}"
    return f"{BASE_URL}/{href}"


def is_tab_like(line: str) -> bool:
    """텍스트 라인이 기타 탭 형태인지 휴리스틱하게 판단한다."""
    s = line.strip()
    if not s:
        return False
    dash_count = s.count("-")
    digit_count = sum(ch.isdigit() for ch in s)
    pipe_count = s.count("|")
    tab_score = dash_count + digit_count + pipe_count

    if tab_score >= 6 and (dash_count >= 3 or digit_count >= 1):
        return True
    if re.match(r"^[eE|BGDA][:|]", s):
        return True
    if re.match(r"^[\\-|0-9]", s) and dash_count >= 4:
        return True
    return False


def extract_text_tab_and_description(text_box) -> Tuple[str, str]:
    """
    <pre> 없이 <br>로만 구성된 탭을 파싱한다.
    앞부분의 탭 라인과 나머지 설명 라인을 분리한다.
    """
    raw_text = text_box.get_text("\n").replace("\r", "")
    lines = [ln.rstrip() for ln in raw_text.split("\n")]

    # 앞뒤 공백 라인 제거
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()

    tab_lines: List[str] = []
    desc_lines: List[str] = []
    seen_tab = False

    for ln in lines:
        if is_tab_like(ln) and (seen_tab or not desc_lines):
            tab_lines.append(ln.strip())
            seen_tab = True
            continue
        if seen_tab:
            desc_lines.append(ln.strip())
        else:
            desc_lines.append(ln.strip())

    tab_text = "\n".join([ln for ln in tab_lines if ln]).strip()
    desc_text = " ".join([ln for ln in desc_lines if ln]).strip()
    return tab_text, desc_text


def parse_detail(site_id: int, fallback_title: str) -> Dict[str, str]:
    url = f"{BASE_URL}/guitar-licks/{site_id}"
    html = fetch_html(url)
    soup = BeautifulSoup(html, "html.parser")

    h1 = soup.select_one("main h1")
    title = h1.get_text(strip=True) if h1 else fallback_title

    author_date_p = soup.select_one("p.text-center.text-sm")
    author, date = ("Unknown", "Unknown")
    if author_date_p:
        author, date = parse_author_date(author_date_p.get_text(" ", strip=True))

    text_box = soup.select_one("div.text-box")
    if not text_box:
        raise RuntimeError(f"상세 페이지에서 text-box를 찾지 못했습니다: {url}")

    pre_tag = text_box.select_one("pre")
    midi_link = text_box.select_one("a[href$='.mid']") or soup.select_one("a[href$='.mid']")
    img_tag = soup.select_one("main img[src*='/licks/img/']")

    tab = ""
    description = ""
    if pre_tag:
        tab = clean_tab(pre_tag)
        # 설명은 pre 이후의 텍스트 노드들을 결합해서 만든다.
        desc_parts: List[str] = []
        for sibling in pre_tag.next_siblings:
            if getattr(sibling, "name", None) in {"script", "ins"}:
                continue
            if isinstance(sibling, str):
                text = sibling
            else:
                text = sibling.get_text(" ", strip=True)
            text = " ".join(text.split())
            if text:
                desc_parts.append(text)
        description = " ".join(desc_parts).strip()
    elif midi_link and midi_link.get("href"):
        tab = normalize_url(midi_link.get("href", ""))
        description = text_box.get_text(" ", strip=True)
    elif img_tag and img_tag.get("src"):
        tab = normalize_url(img_tag.get("src", ""))
        description = text_box.get_text(" ", strip=True)
    else:
        tab_text, desc_text = extract_text_tab_and_description(text_box)
        if tab_text:
            tab = tab_text
            description = desc_text
        else:
            raise RuntimeError(f"상세 페이지에서 탭/이미지/MIDI를 찾지 못했습니다: {url}")

    if not description:
        description = "all-guitar-chords.com에서 가져온 릭입니다."

    return {
        "title": title,
        "author": author,
        "date": date,
        "tab": tab,
        "description": description,
        "source_id": site_id,
        "source_url": url,
    }


def parse_existing_metadata(js_text: str) -> Tuple[int, set]:
    """
    기존 릭의 max id와 title 집합을 구한다.
    따옴표 이스케이프가 많은 데이터 특성상 Node 평가를 우선 사용한다.
    """
    try:
        node_script = """
import { licks } from './src/data/licks.js';
const maxId = licks.reduce((m, l) => Math.max(m, Number(l.id || 0)), 0);
const titles = licks.map((l) => String(l.title || ''));
console.log(JSON.stringify({ maxId, titles }));
""".strip()
        result = subprocess.run(
            ["node", "--input-type=module", "-e", node_script],
            check=True,
            capture_output=True,
            text=True,
        )
        payload = json.loads(result.stdout.strip() or "{}")
        max_id = int(payload.get("maxId", 0))
        titles = set(payload.get("titles", []))
        if max_id > 0 and titles:
            return max_id, titles
    except Exception:
        # Node 실행이 실패하면 정규식 기반으로 폴백한다.
        pass

    ids = [int(x) for x in re.findall(r"\bid\s*:\s*(\d+)", js_text)]
    max_id = max(ids) if ids else 0

    raw_titles = re.findall(r"\btitle\s*:\s*\"((?:\\.|[^\"\\])*)\"", js_text)
    titles = set(
        t.replace("\\\"", "\"").replace("\\n", "\n").replace("\\\\", "\\")
        for t in raw_titles
    )
    return max_id, titles


def js_escape(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\n", "\\n")
    )


def format_entry(entry: Dict[str, str], new_id: int, difficulty: str) -> str:
    return (
        "    {\n"
        f"        id: {new_id},\n"
        f"        title: \"{js_escape(entry['title'])}\",\n"
        f"        difficulty: \"{difficulty}\",\n"
        f"        author: \"{js_escape(entry['author'])}\",\n"
        f"        date: \"{js_escape(entry['date'])}\",\n"
        f"        tab: \"{js_escape(entry['tab'])}\",\n"
        "        chords: [],\n"
        f"        description: \"{js_escape(entry['description'])}\"\n"
        "    },\n"
    )


def main() -> int:
    if not LICKS_PATH.exists():
        print(f"릭 데이터 파일을 찾지 못했습니다: {LICKS_PATH}")
        return 1

    js_text = LICKS_PATH.read_text(encoding="utf-8")
    max_id, existing_titles = parse_existing_metadata(js_text)

    index_html = fetch_html(INDEX_URL)
    index_items = parse_index(index_html)

    # 검증: 최소 개수 확인
    if len(index_items) < 50:
        raise RuntimeError(
            f"인덱스에서 비정상적으로 적은 개수({len(index_items)})가 추출되었습니다. 사이트 구조를 확인하세요."
        )

    new_entries_by_diff: Dict[str, List[str]] = {"Beginner": [], "Intermediate": [], "Advanced": []}
    next_id = max_id + 1
    added = 0
    skipped = 0

    for site_id, title, diff in sorted(index_items, key=lambda x: x[0]):
        if title in existing_titles:
            continue
        try:
            detail = parse_detail(site_id, title)
        except Exception as exc:  # 사이트 구조 예외에 대해 방어적으로 처리
            skipped += 1
            print(f"[건너뜀] {site_id} {title}: {exc}")
            continue
        entry_str = format_entry(detail, next_id, diff)
        new_entries_by_diff.setdefault(diff, []).append(entry_str)
        existing_titles.add(title)
        next_id += 1
        added += 1

    if added == 0:
        print("추가할 신규 릭이 없습니다.")
        return 0

    # 난이도 섹션별로 주입 위치를 찾는다.
    updated = js_text
    for diff, entries in new_entries_by_diff.items():
        if not entries:
            continue
        marker = f"// === {diff.upper()} ==="
        marker_idx = updated.find(marker)
        if marker_idx == -1:
            # 섹션이 없으면 배열 종료 직전에 삽입
            insert_at = updated.rfind("];")
            if insert_at == -1:
                raise RuntimeError("licks.js에서 배열 종료(];)를 찾지 못했습니다.")
            block = "\n" + "".join(entries)
            updated = updated[:insert_at] + block + updated[insert_at:]
            continue

        # 해당 섹션 다음 줄의 첫 객체 앞에 삽입
        insert_at = updated.find("{", marker_idx)
        if insert_at == -1:
            raise RuntimeError(f"{diff} 섹션에서 객체 시작을 찾지 못했습니다.")
        block = "".join(entries)
        updated = updated[:insert_at] + block + updated[insert_at:]

    LICKS_PATH.write_text(updated, encoding="utf-8")
    print(f"신규 릭 {added}개를 추가했습니다. 건너뜀: {skipped}개. 마지막 id: {next_id - 1}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
