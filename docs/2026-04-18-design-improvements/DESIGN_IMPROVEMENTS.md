# 디자인 개선안 — Luthier's Manual v2

현재 상태: **색/폰트만 바뀐 상태**. 구조·레이아웃·정보 밀도는 기존 "다크 테마 카드 쌓기" 그대로라 에디토리얼 감성과 충돌함.

아래 개선안은 **임팩트 순**으로 정렬. 상위 3개만 해도 체감 차이 큼.

---

## 우선순위 A — 구조적 변경 (가장 체감 큼)

### A1. 헤더: 중앙 대칭 → 비대칭 매거진 마스트헤드
**문제**: 로고 이모지 + 제목 + 부제가 모두 중앙 정렬. 에디토리얼 미감은 비대칭/그리드가 핵심.

**제안**:
```
┌─────────────────────────────────────────────────────┐
│ § 00        기타 스케일              VOL. I         │
│ LUTHIER'S   ────────────             SPRING 2026    │
│ MANUAL      마스터                                  │
│                          실전 활용도 순으로…         │
└─────────────────────────────────────────────────────┘
```
- 3컬럼 그리드 (좌: 섹션 레이블 / 중: 초대형 제목 / 우: 권호 정보)
- 제목을 `clamp(4rem, 10vw, 8rem)` 수준으로 키우고 line-height 0.9
- 🎸 이모지는 제거하거나 작은 brass orientation mark로 대체

**구현 위치**: [Header.jsx](src/components/Header.jsx) + `.header` CSS

---

### A2. 메인 네비: 이모지 탭 → 번호 매긴 챕터 목차
**문제**: `🎯 스케일 / 🎼 모달 / 🎵 트라이어드` — 이모지가 editorial serif와 충돌. 탭도 동일 가중치로 나열돼 "어디서 시작해야 하나" 불명확.

**제안**: 숫자 챕터 + 한글 소제목 + 영문 letterspaced 라벨
```
I.  스케일         II.  모달         III. 트라이어드
    SCALES             MODES             TRIADS
```
- 이모지 전부 제거
- 로마 숫자로 진행 흐름 암시
- 현재 챕터는 러스트 색 + 언더라인 (이미 됨) 유지
- 각 탭에 `data-chapter="1"` 붙여 hover 시 작은 글리프로 chapter 번호 표시

**구현 위치**: [MainNav.jsx](src/components/MainNav.jsx) — 이모지 제거하고 영문 라벨 추가

---

### A3. 스케일 화면: 세로 카드 쌓기 → 2컬럼 에디토리얼 그리드
**문제**: `Roadmap → ScaleSelector → KeySelector → Fretboard → ScaleInfo → Theory → Tips` 가 모두 전폭(full-width)으로 세로 배치. 매거진 펼침면(spread) 느낌 제로.

**제안 레이아웃** (데스크톱 1024px+):
```
┌──────────────────────────────────────────────────┐
│  FIG. I FRETBOARD (전폭, 크게)                   │
└──────────────────────────────────────────────────┘
┌──────────────┬─────────────────┬─────────────────┐
│ § SCALE INFO │ § THEORY        │ § PRACTICE      │
│ 사이드바     │ 본문 (더 넓게)  │ 풀 인용문       │
│ 라벨:값      │ 화성 진행       │ 이탤릭 조언     │
│ 라벨:값      │ 다이어토닉 코드 │                 │
└──────────────┴─────────────────┴─────────────────┘
```
- CSS Grid `grid-template-columns: 1fr 2fr 1fr` 같이
- 현재 `.tips-section`은 separate section이 아니라 오른쪽 사이드로 이동
- Roadmap은 헤더 바로 아래가 아니라 **하단 "다음 챕터" 내비게이션**으로 강등

**구현 위치**: [App.jsx](src/App.jsx) 구조 + CSS grid 유틸리티 추가

---

## 우선순위 B — 타이포그래피 정교화

### B1. 드롭캡 (Drop Cap) — 설명 텍스트 첫 글자
스케일 설명, 릭 설명의 첫 문단에 Fraunces 드롭캡 추가.
```css
.info-item.description .info-value::first-letter {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 3.4em;
  float: left;
  line-height: 0.85;
  margin: 0.05em 0.08em 0 0;
  color: var(--rust);
}
```
에디토리얼 시그니처 모먼트 1개 확보.

### B2. 타입 스케일 대비 강화
현재: `2.5rem → 1.6rem → 1.3rem → 1rem` — 점진적이라 밋밋.
제안: `clamp(4rem, 10vw, 7rem) → 1.6rem → 1rem → 0.88rem` — 제목만 확 키우고 나머지는 본문 밀도.

### B3. 숫자 디스플레이
프렛 번호, 키, 인터벌을 `font-feature-settings: "lnum", "tnum"` (tabular lining numerals)로. 또는 Fraunces의 oldstyle numerals로 의도적 대비.

### B4. Korean × Latin 혼용 리듬
한글 제목 뒤 작은 Latin 부제 패턴:
```
마이너 펜타토닉  minor pentatonic
────────────────────
```
모든 주요 스케일/모드/섹션에 bilingual display 적용.

---

## 우선순위 C — 컴포넌트별 세부 개선

### C1. 프렛보드
- [ ] **FIG. I** 캡션을 상단 레이블이 아닌 **하단 figure caption** 으로 옮기고 설명 문장 추가: `Fig. I — 지판 다이어그램. 적색은 루트, 황동은 블루노트.`
- [ ] 프렛 인레이 도트 (12f, 15f의 흰 점) 현재 누락. 목재 바디에 mother-of-pearl 느낌 추가:
  ```css
  .fret[data-fret="3"]::after,
  .fret[data-fret="5"]::after,
  ...{ content:''; width:8px; height:8px; border-radius:50%; background:var(--fretwire-bright); position:absolute; top:calc(50% + 130px); }
  ```
- [ ] 넛(nut)을 더 두껍게, 상아색(`#E8D4A9`) 강조
- [ ] 포지션 마커 inlay를 single dot(3,5,7,9) + double dot(12)로 정확히

### C2. 키 선택기 (KeySelector)
- [ ] 검은색 프레임 괜찮지만, 피아노 키 비유로: **샵/플랫 키는 검은 건반 스타일** (어둡게), 내추럴은 현재 크림
- [ ] 선택된 키를 잉크 블록이 아닌 **러스트 wax seal** 느낌 원형 스탬프로:
  ```css
  .key-btn.active {
    background: var(--rust);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--paper), 0 0 0 4px var(--rust);
  }
  ```

### C3. 로드맵 (Roadmap)
- [ ] 현재 활성 스테이지가 잉크 블록 → editorial "실(string)로 꿰맨 챕터 스티커" 느낌으로. 각 스테이지에 `FASC. 01 / 02 / 03` 라벨
- [ ] 스테이지 사이 연결선을 빗금(hatch) 패턴 또는 점선으로

### C4. Licks 카탈로그
- [ ] 카드 리스트가 균일 그리드라 "카탈로그 목록" 느낌 약함. **"Lead lick" 1개 + 작은 카드 4개** 패턴으로 비대칭:
  ```
  ┌────────────┬──────┬──────┐
  │            │ lick │ lick │
  │ LEAD LICK  ├──────┼──────┤
  │ (크게)     │ lick │ lick │
  └────────────┴──────┴──────┘
  ```
- [ ] 각 카드에 작은 **fret-position mini-diagram** 썸네일 (4프렛 정도만)
- [ ] 난이도를 뱃지가 아닌 **편집자 별점** (`★★★☆☆`) 또는 `MM.J=96` BPM 표기로

### C5. Lick 상세 페이지
- [ ] `.lick-title` 위에 **kicker 텍스트** 추가: `LICK № 34 — MINOR PENTATONIC · A KEY`
- [ ] 탭 위에 작은 **footnote-style 각주**: `¹ 슬라이드는 2번 프렛에서 시작.`
- [ ] TAB 하단에 `MEASURE 1 · 2 · 3 · 4` 편집자 마커

### C6. 코드 뱃지 / 진행 표기
- [ ] 현재 `I - IV - V` 같은 진행을 **oversize display**로 바꾸고 화살표 대신 **en-dash(—)** 또는 악보 repeat 마크 스타일
- [ ] 코드 뱃지를 정사각 stamp (1cm × 1cm) + hairline border

---

## 우선순위 D — 시그니처 모먼트 (한두 개만)

### D1. 로딩/페이지 진입 애니메이션
현재 `fadeIn` 6px translate — 너무 평범. 에디토리얼은 **"책장 넘기는" 모션**:
- 섹션이 하단에서 stagger (각 요소 50ms 딜레이) 로 slide up
- 프렛보드는 fret별로 좌→우 순서대로 그려지듯 reveal (clip-path 애니메이션)

### D2. 커서 커스터마이징 (옵셔널)
프렛보드 위에서는 **brass pick(피크)** 커서. SVG 커서로 교체. 호버 시에만.

### D3. 인쇄 모드 미리보기
`@media print` 스타일 제대로 작성 → Cmd+P 하면 진짜 매뉴얼처럼 인쇄됨. 에디토리얼 컨셉 완성.

### D4. 음원 재생 시 grain 움직임
탭 재생(MIDI) 시 body::before grain overlay가 살짝 떨리는 애니메이션 (1초). 아날로그 느낌.

---

## 우선순위 E — 접근성 / 품질 (필수)

- [ ] **포커스 링** — 모든 버튼에 `:focus-visible { outline: 2px solid var(--rust); outline-offset: 2px; }`
- [ ] **ARIA** — `.nav-tab` → `role="tab"` + `aria-selected`, `.nav-tabs` → `role="tablist"`
- [ ] **폰트 로딩 FOIT** — `font-display: swap`은 있지만, Pretendard 로딩 중 깜빡임 있음. `<link rel="preload" as="style">` 추가
- [ ] **grain overlay 성능** — SVG data-URI noise는 저사양 기기에서 jank. `will-change` 빼고, 옵셔널하게 `prefers-reduced-motion` 존중
- [ ] **컬러 대비** — `var(--ink-mute)` `#7A6A5A` on `#F3EADA` = 대비율 체크 필요 (WCAG AA 4.5:1 이상이어야)

---

## 구현 로드맵 제안

| 단계 | 범위 | 예상 시간 |
|---|---|---|
| **Phase 1** | A1 + A2 + B1 (헤더/네비/드롭캡) | 30–40분 |
| **Phase 2** | A3 (2컬럼 그리드 레이아웃) | 60–90분 |
| **Phase 3** | C1–C3 (프렛보드/키/로드맵 디테일) | 60분 |
| **Phase 4** | C4–C5 (Licks 카탈로그 재설계) | 60–90분 |
| **Phase 5** | D1 + E (시그니처 모션 + 접근성) | 45분 |

**추천**: Phase 1 + 2 먼저. 이 둘이 "카드 쌓기" → "매거진 스프레드" 전환의 핵심. 나머지는 옵션.

---

## 참고 레퍼런스

- **Apartamento Magazine** — 비대칭 그리드, 손글씨 느낌 serif
- **The Gentlewoman** — 대형 제목 + 극단적 여백
- **Rolling Stone 70s 편집 디자인** — 음악 잡지 레이아웃의 원형
- **Premier Guitar 매거진** — 기타 도메인 특화 (프렛보드 다이어그램, 악기 카탈로그)
- **ECM Records 커버 디자인** — 미니멀 + 활자 + 공간감
