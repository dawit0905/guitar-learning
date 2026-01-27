import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  73: 'v=다운스트로크, ^=업스트로크입니다. 타이밍을 돕기 위해 "-"를 사용했습니다. 음 사이 대시가 많을수록 간격이 길어집니다. 스윕 구간이 까다로울 수 있으니 천천히 연습하고, 다른 줄을 실수로 치지 않게 주의하세요. 탭 아래 운지 번호도 넣었습니다: 1=검지, 2=중지, 3=약지, 4=새끼손가락. 즐겁게 연주하세요!',
  81: '여기서는 Fig 2를 두 번 연주한 뒤, Intro와 Fig 1을 하프 벤드 대신 풀 벤드로 연주하세요. 단순화된 순서: Intro x3 → Fig1 x1 → Fig2 x2 → Fig3 x1 → Fig2 x2 → Intro x1 → Fig1 x1(풀 벤드). 참고: Drop-D나 Standard-E에서 모두 연주할 수 있습니다. 베이스와 기타 모두 가능하며, 기타라면 넥 픽업에 톤을 0으로 낮춰보세요.',
  85: '어느 줄에서 연주해도 꽤 괜찮게 들립니다. 빠를수록 더 좋으니 8분음표나 16분음표로 연주해보세요. 마지막 12프렛에서는 손가락을 흔들어 비브라토를 주면 좋습니다. 정확한 키는 모르겠지만 마이너 계열일 가능성이 큽니다. (E줄에서 연주하면 E 마이너일 수도 있습니다.)',
  91: `스래시한 느낌의 릭입니다. C 메이저나 A 마이너 펜타토닉 등에서 응용할 수 있습니다. 아래처럼도 연주할 수 있습니다:
||-----------------------------------------|
||------------17----------17---------------|
||--19b21--19----19-17-19----19-17-19-17---|
||-----------------------------------------|
||-----------------------------------------|
||-----------------------------------------|`,
  98: `E 메이저 펜타토닉 변주(올바른 버전)입니다. 저는 가끔 아래 엔딩을 바로 이어서 사용합니다(어디서 배웠는지는 기억이 안 나고, 제가 만든 것은 아닙니다):
e----12-------12-------12--------------
B-12----12-11----11-10----10-9---------
G----------------------------------0-1-
D----------------------------------1-2-
A----------------------------------1-2-
E----------------------------------0-0-
댓글과 평가 부탁합니다 :)`,
  107: '블루스가 아직 익숙하지 않다면 진행은 다음과 같습니다: INTRO x1 → A PHRASE x1 → B PHRASE x1 → A PHRASE x1 → TURNAROUND x1. 그다음부터는 보통 A PHRASE x2 → B PHRASE x1 → A PHRASE x1 → TURNAROUND x1로 반복합니다. 참고: 턴어라운드의 F#7(#9)와 E9은 스트럼입니다. 스트럼 패턴은 탭으로 전달이 애매해서 넣지 않았습니다. 리듬에 맞춰 자유롭게 만들어보세요. 할 수 있습니다! 즐겁게 연주하세요!',
  109: `16분음표로 단단하게 밀어붙이는 패턴입니다. 아래 코드 진행을 깔고 연주하세요:
| |!----------------------------------------------------|
||o--------------------------------------------------o|
||----------------------------------------------------|
||----------------------------7-----------9-----------|
||o--7-----------9------------5-----------7----------o!
||---5-----------7------------------------------------!
기본적으로 아르페지오를 연주하는 구조이고, 빠르게 연주하면 아주 멋집니다.`,
  119: '이 아이디어를 조금 더 확장하고 싶다면 제 릭 "Wooden Shed\'s Lullabye"도 보세요. 그건 너무 활발해서 진정이 안 되는 닭들을 위한 버전이지만... 기본 아이디어는 같습니다. 이번 버전은 그냥 손가락이 흐르는 대로 두고, 에너지가 손끝을 통해 줄에 닿는 소리를 들어보세요. 꽤 장엄할 수도 있습니다.',
  122: '많은 사람들이 간과하지만 디미니쉬드 아르페지오는 매우 다재다능합니다. 도미넌트7 코드는 토닉의 장3도와 b7 사이에 긴장(감5도)을 가집니다. 그래서 코드의 b7 위에 디미니쉬드 스케일을 사용하면 b9 느낌의 사운드를 만들 수 있습니다.',
  161: '제목 괜찮죠? 다른 것들과 마찬가지로 엄청 화려하진 않지만 실전에서는 충분히 먹힙니다. 스케일/모드/키 이론은 잘 몰라서 자세히 설명하긴 어렵고, A 하모닉 마이너를 섞었다는 것 정도만 알고 있습니다. 아무튼 즐겁게 연주하세요! 감사합니다.',
  185: '두 줄에서 탭핑으로 연주하는 Sus2 아르페지오입니다. 여기 나온 Sus2 코드는 E sus2, D sus2, Csus2, Asus2, Gsus2, Csus2, Dsus2입니다. 전체적으로는 E 마이너 키라고 볼 수 있습니다. 탭 표기: t=탭, p=풀오프, h=해머온, r=링(음을 유지). 저는 보통 클린으로 연주하지만 디스토션도 잘 어울립니다.',
  188: '코러스에서는 F와 C 코드는 2박, G 코드는 4박입니다. 버스에서는 Am과 C는 4박, G는 8박으로 늘어납니다. 원곡을 틀어놓고 같이 연주하면 훨씬 도움이 됩니다. (이 곡에는 쉬운 솔로도 있습니다.) 탭이 어땠는지, 배우기 쉬웠는지 알려주세요.',
  234: '각 스윕의 마지막 음에서 해머온을 넣으면 오른손을 "리셋"해서 다음 스윕의 업스트로크를 준비할 시간이 생깁니다. gs를 위해 제가 쓰는 운지도 탭 아래에 적었습니다. 높은 쪽(D줄)의 마지막 음은 새끼손가락을, 낮은 쪽(G줄)의 마지막 음은 약지를 쓰는 이유는 D줄 쪽은 메이저 스윕에 가깝고, 디미니쉬드 스윕에서는 이상하게 약지가 더 잘 맞기 때문입니다. 전환도 더 부드럽습니다.',
  241: `제가 쓰는 운지(그리고 가장 잘 맞는다고 느낀 방법)는 아래와 같습니다:
Legend- I=검지 M=중지 R=약지 P=새끼손가락
e-------IhPpI--------
B-----R-------R------
G---I-----------I----
D-M---------------M--
A--------------------
E--------------------
이 릭은 펜타토닉 안의 음들로 구성되어 있어서 매우 다재다능하며, 거의 어디에나 끼워 넣을 수 있습니다.`,
  276: '이 테크닉을 처음 배울 때는 개방 B음을 건너뛰고 B줄 3프렛부터 시작하는 것이 더 쉬웠습니다. 이 릭 뒤에는 코드 진행(Bm A G F#M7)과 다른 몇 가지 릭으로 이어갑니다. 나머지 릭도 궁금하면 댓글 남겨주세요. 즐겁게 연주하세요! MP3로 재생하세요.',
  281: '한 옥타브 내려서 반복하는 간단한 리프입니다. C 마이너/D# 메이저라고 볼 수 있는데 어떤 키로 부르는 게 맞는지는 잘 모르겠습니다. 두 번째 파트가 아직 어려워서 녹음을 올리진 못했습니다. 미안합니다. 속도는 초고속까지는 아니고, 빠른 편의 적당한 템포가 어울립니다. 어딘가 익숙하게 들리는데 어디서 들었는지는 기억이 안 나네요.',
  285: '예전에 만든 워밍업 패턴으로 손을 푸는 데 도움이 됩니다. 앉아서 연주를 시작할 때 가장 먼저 하는 워밍업 중 하나입니다. 기본적으로 블루스 스케일을 위아래로 오르내리는 형태입니다. 매번 해머온/풀오프 위치를 바꿔서 연습하기 때문에, 이 버전에는 몇 군데만 예시로 넣었습니다.',
  301: '첫 릭은 아르페지오 연속으로 시작합니다. 처음 4음은 Dm7 아르페지오이고, 그다음은 Cmaj7 아르페지오, 그리고 다시 Dm7으로 이어집니다. 첫 마디의 Cmaj7 아르페지오는 Dm7의 텐션과 b7을 모두 포함합니다: C(b7), E(9), G(11), B(6). 마지막 마디는 C 트라이어드 아르페지오를 중심으로 구성되어 있습니다.',
  303: '크로매틱 패턴을 손에 익히기에 좋은 연습 릭입니다. 이런 류의 릭을 모든 스케일, 모든 포지션에서 만들어보고 공부하는 것이 좋습니다. 이런 연습이 프렛보드 이해를 깊게 해줍니다. 시작음과 끝음이 같아서 루프로 반복 연주하기 좋습니다. MP3로 재생하세요.',
  308: '두 번째 마디에서 Cmaj7을 연주하는 것을 볼 수 있습니다. 위치를 모르겠다면 제 아르페지오 레슨을 참고하세요. G7 위에서 Cmaj7을 쓰는 이유는 다음 코드로 자연스럽게 연결하기 위해서입니다. 항상 코드를 그대로 따라 연주할 필요는 없지만, 그렇게 하는 방법을 아는 것은 중요합니다. 그다음에는 리딩 멜로디를 생각할 수 있습니다.',
  310: '요즘 릭 연습을 더 자주 하고 있습니다. 솔직히 이건 제가 완전히 만든 것은 아니고, 발견한 것입니다. 다만 비슷한 아이디어(음을 가까이 잡고 플럭하는 방식)는 제가 만들었고, 제가 쓰던 프렛보다 이쪽이 더 좋아서 공유합니다. 놀랄 만큼 쉽고 소리도 아주 좋습니다. 입문자에게 특히 좋습니다. 표시된 4분음표 길이를 지켜 플럭하세요.',
  313: 'Django 사운드를 좋아하는 분들을 위한 릭입니다. E7의 9도로 크로매틱 점프를 한 뒤 E7 아르페지오로 이어집니다. Am(3번째 마디)에서는 9음을 더한 트라이어드를 연주합니다. 7화음 아르페지오만 반복할 때 즉흥 연주에 도움이 될 수 있습니다. (참고: 이미지가 작아 보이면 클릭하면 크게 보입니다) :D',
  325: '이 기타 릭은 트라이어드 기반입니다. 첫 마디는 9음을 더한 Gm 트라이어드로 시작하고, 이어지는 Bm 트라이어드가 Gmaj7#5 느낌을 만듭니다. 두 번째 마디는 Bb 트라이어드로 시작해 C9sus4 느낌으로 이어지고, 이후 A 마이너 펜타토닉 또는 F 메이저 펜타토닉 런을 거쳐 크로매틱 프레이즈로 마무리됩니다.',
  326: '두 번째 마디에 C 메이저 아르페지오가 나오는데, D 마이너 기준으로 보면 b7, 9, 11로 들립니다. 이런 걸 어퍼 스트럭처 트라이어드라고 부릅니다. 이 주제로 레슨도 써두었으니 관심 있으면 찾아보세요. 예전에 Chuck이라는 사람이 들려줬는데 정말 놀라웠습니다. 정말 멋진 진행 아닌가요? 즐겁게 연주하세요! MP3로 재생하세요.',
  329: 'D7 위에서 사용할 수 있는 집시 재즈 릭입니다. 피킹 정확도가 특히 중요하니, 천천히 연습해서 속도를 올리세요.',
  330: 'Coltrane의 맛있는 ii-V-I입니다. 화려하진 않지만 정말 달콤합니다! Am7 구간은 F#, G, A, B를 사용하고, D7 구간은 C, D, E, G를 사용합니다. 이어서 F#, G, A, B → Gmaj7 → D, G, B, D → C, D, E, A → G 로 진행됩니다.'
};

const PROP_ORDER = [
  'id',
  'title',
  'difficulty',
  'keys',
  'author',
  'date',
  'tab',
  'chords',
  'description'
];

function isIdentifier(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

function escapeString(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

function formatKey(key) {
  return isIdentifier(key) ? key : JSON.stringify(key);
}

function formatPrimitive(value) {
  if (value === null) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return `"${escapeString(value)}"`;
}

function formatChordObject(chord) {
  const entries = Object.entries(chord);
  const parts = entries.map(([key, value]) => `${formatKey(key)}: ${formatPrimitive(value)}`);
  return `{ ${parts.join(', ')} }`;
}

function formatArray(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return '[]';
  }

  const hasObject = value.some((item) => item && typeof item === 'object' && !Array.isArray(item));

  if (!hasObject) {
    const items = value.map((item) => formatPrimitive(item));
    return `[${items.join(', ')}]`;
  }

  const items = value.map((item) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      return formatChordObject(item);
    }
    return formatPrimitive(item);
  });
  return `[${items.join(', ')}]`;
}

function orderedKeys(entry) {
  const keys = Object.keys(entry);
  const ordered = PROP_ORDER.filter((key) => keys.includes(key));
  const rest = keys.filter((key) => !PROP_ORDER.includes(key)).sort();
  return [...ordered, ...rest];
}

function formatEntry(entry) {
  const propIndent = '        ';
  const keys = orderedKeys(entry);
  const lines = ['    {'];

  for (const key of keys) {
    if (key === 'keys') {
      const keysValue = entry.keys;
      if (!Array.isArray(keysValue) || keysValue.length === 0) {
        continue;
      }
    }

    const value = entry[key];
    const formatted = Array.isArray(value) ? formatArray(value) : formatPrimitive(value);
    lines.push(`${propIndent}${formatKey(key)}: ${formatted},`);
  }

  const lastIndex = lines.length - 1;
  lines[lastIndex] = lines[lastIndex].replace(/,$/, '');
  lines.push('    },');
  return lines.join('\n');
}

let translatedCount = 0;
const updated = licks.map((lick) => {
  const translation = TRANSLATIONS[lick.id];
  if (!translation) return lick;
  translatedCount += 1;
  return { ...lick, description: translation };
});

const sorted = [...updated].sort((a, b) => Number(a.id) - Number(b.id));
const body = sorted.map((entry) => formatEntry(entry)).join('\n\n');
const output = `export const licks = [\n    // ID 순 정렬\n${body}\n];\n`;

writeFileSync(TARGET, output, 'utf-8');
console.log(`설명 번역 적용(배치4): ${translatedCount}개`);
