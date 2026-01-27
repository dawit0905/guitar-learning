import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse

import requests

ROOT = Path(__file__).resolve().parents[1]
LICKS_PATH = ROOT / "src/data/licks.js"
PUBLIC_IMG_DIR = ROOT / "public/licks/img"

IMAGE_EXT_RE = re.compile(r"\.(png|jpe?g|gif|webp|svg)(\?.*)?$", re.IGNORECASE)
HTTP_RE = re.compile(r"^https?://", re.IGNORECASE)


def extract_remote_image_urls() -> list[str]:
    node_script = """
import { licks } from './src/data/licks.js';
const imageRe = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
const httpRe = /^https?:\/\//i;
const urls = licks
  .map((l) => String(l.tab || '').trim())
  .filter((tab) => httpRe.test(tab) && imageRe.test(tab));
console.log(JSON.stringify([...new Set(urls)]));
""".strip()
    result = subprocess.run(
        ["node", "--input-type=module", "-e", node_script],
        check=True,
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    return json.loads(result.stdout or "[]")


def filename_from_url(url: str) -> str:
    parsed = urlparse(url)
    name = Path(parsed.path).name
    if not name:
        raise ValueError(f"파일명을 추출할 수 없습니다: {url}")
    # 혹시 모를 이상한 문자 방지
    safe = re.sub(r"[^A-Za-z0-9._-]", "_", name)
    return safe


def download(url: str, dest: Path) -> None:
    if dest.exists():
        return
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    dest.write_bytes(resp.content)


def main() -> None:
    if not LICKS_PATH.exists():
        raise SystemExit(f"릭 데이터 파일이 없습니다: {LICKS_PATH}")

    PUBLIC_IMG_DIR.mkdir(parents=True, exist_ok=True)

    urls = extract_remote_image_urls()
    if not urls:
        print("원격 이미지 URL이 없습니다.")
        return

    mapping: dict[str, str] = {}

    for url in urls:
        if not (HTTP_RE.search(url) and IMAGE_EXT_RE.search(url)):
            continue
        filename = filename_from_url(url)
        dest = PUBLIC_IMG_DIR / filename
        download(url, dest)
        mapping[url] = f"/licks/img/{filename}"

    text = LICKS_PATH.read_text(encoding="utf-8")
    updated = text
    replaced = 0
    for remote, local in mapping.items():
        if remote in updated:
            updated = updated.replace(remote, local)
            replaced += 1

    if replaced == 0:
        print("치환된 URL이 없습니다.")
        return

    LICKS_PATH.write_text(updated, encoding="utf-8")
    print(f"이미지 {len(mapping)}개 로컬 저장, {replaced}개 URL 치환 완료")


if __name__ == "__main__":
    main()
