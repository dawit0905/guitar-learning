import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  66: '4/4 박자에서 약 170bpm 정도가 잘 어울립니다. 저는 얼터네이트 피킹으로 치지만, 일부 구간을 스윕으로 처리해도 좋습니다.',
  67: '드롭 D 튜닝입니다. 이름을 못 정했어요. 보기 이상해도 미안합니다. 이 사이트에 올리는 첫 릭이니 너그럽게 봐주세요.',
  75: "( ' ) 표시는 짧게 끊는 '숨' 또는 멈춤을 의미합니다. 또 하나의 쉬운 입문자용 릭입니다!",
  82: '이전 릭은 컴퓨터가 숫자를 섞어버려서 죄송합니다. 여기에는 올바른 탭을 올렸습니다!',
  99: '마지막 반복에서는 C7#9를 생략하고, 리프 3을 한 번 더 반복합니다. 즐겁게 연주하세요!',
  100: '솔로에서는 C9 코드를 펑키하게 연주하면 됩니다. 즐겁게 연주하세요! MP3로 재생하세요.',
  114: '아르페지오를 이것저것 만지다가 만든 꽤 괜찮은 조합들입니다. 즐겁게 연주하세요! 프로그레시브 메탈 최고!',
  120: 'B줄의 모든 음에 핀치 하모닉을 넣었습니다… 제 두 번째 탭이에요!!!! 야호!!! 댓글과 평가 부탁해요!!!',
  132: 'PB는 프리벤드, /는 슬라이드, ~~~는 여운(비브라토)을 의미합니다. 어떻게 생각하는지 알려주세요.',
  133: '타이밍을 정확히 맞추려면 원곡을 들어보는 것이 좋습니다.',
  160: '오, 좋은 스트레칭 연습입니다. 시작 전에 왼손을 풀어주세요. 늘 그렇듯 천천히 시작해서 점점 빠르게 하세요… 행운을 빕니다 :)',
  162: '릭을 연주하는 짧은 영상을 만들었습니다. 여기서 확인해보세요.',
  171: 'Michael Angelo Batio가 자주 쓰는 패턴입니다. Randy Rhoads의 탭핑 아르페지오를 스윕 아르페지오로 바꿨다고 합니다.',
  193: '진행: Em x2 → D x1 → F#m7b5 x1 → Em x2 → G x1 → Gadd9 x1',
  202: '길이 표기: H=2분음표, Q=4분음표, E=8분음표, S=16분음표. 미디로 재생하세요.',
  207: '첫 탭이라 괜찮길 바랍니다. 드롭 D 튜닝이며, 개방 저음 D줄은 팜 뮤트합니다.',
  223: '아르페지오 파트에서 12프렛이 두 번 나오는 부분은, 새끼손가락 대신 검지로 바꿔 잡아 더 넓은 Amin 아르페지오를 연주하세요.',
  226: '보통에서 빠른 템포로 연주하고, 계속 반복하세요. 얼터네이트 피킹을 사용하면 좋습니다.',
  227: '원하는 만큼 반복하세요. 고정된 Cmaj 코드 위에서 잘 어울립니다. 얼터네이트 피킹을 사용하세요.',
  229: '블루스 진행을 연주할 때, 마지막의 A7 코드를 치는 대신 이 릭을 쓰는 것을 좋아합니다.',
  231: '이걸 정말 잘하려면, 같은 운지로 스트링 스킵 없는 스케일부터 시작하세요. 정말 도움이 됩니다.',
  239: '언제 시작할지 알 수 있도록 탭 위에 작은 메트로놈 표시를 넣었습니다.',
  245: '추신: 올라가는 것과 내려가는 것을 모두 연습하세요. 얼터네이트 피킹과/또는 레가토를 사용하세요. - V3N0M',
  246: '더 있지만 지금은 작업 중(W.I.P.)입니다. 즐겁게 연주하세요 :)',
  258: '…그리고 네, Collective Soul의 "Shine"에 큰 영향을 받았습니다.',
  266: '이걸 연주하는 방법은 정말 많습니다. 손가락을 벌리거나, 슬라이드하거나, 탭핑하는 등 다양하게 시도해보세요.',
  282: '각 스윕을 두 번씩 반복하세요. 결국에는 이 스윕을 아주 쉽게 통과하게 될 겁니다. 방금 만들었는데 소리가 좋아서 올립니다 ;) D 튜닝',
  284: '이걸 연주한 뒤 거꾸로도 연주하세요. 기타 전체를 내려갔다가, 다시 올라오면서 반복하세요. Dime을 추모합니다.',
  286: '첫 릭은 Cmaj7#5 아르페지오(E7b13)로 시작해 A 멜로딕 마이너 스케일로 이어집니다. MP3로 재생하세요.',
  288: '여기서는 Fm7 코드를 Abmaj7로 대리하고, 약간의 크로매틱 진행을 넣었습니다.',
  289: "이 멋진 릭은 CD 'Tenderly'의 'Stella by Starlight'에서도 나옵니다. MP3로 재생하세요.",
  294: 'Pat Martino 스타일이며, 주로 도리안 모드에 기반합니다.',
  297: '두 번째 마디의 후반부는 Fm7b5 아르페지오입니다. 세 번째 마디는 C 리디안 스케일을 사용합니다.',
  298: 'II-V-I 진행이며, 두 번째 마디에 B 디미니쉬드 스케일을 사용합니다.',
  299: '패턴의 리듬을 바꿔보는 연습입니다. 도미넌트 계열 키에서 쓸 수 있으니, 다양한 키와 포지션에서 시도해보세요.',
  300: 'G 비밥 스케일로 시작하고 끝납니다. 이 릭을 알려준 Dirk에게 감사합니다.',
  302: 'II-V-I 진행이며, 개인적으로 보이스 리딩이 좋다고 생각합니다.',
  312: '그의 곡 "Donna Lee"에서 가져온 훌륭한 릭입니다. 첫 마디에 "Honeysuckle Rose" 프레이즈를 사용합니다.',
  314: '간단한 믹솔리디안 릭입니다. C7 위에서 쓰기 좋습니다. WAV로 재생하세요.',
  321: '아주 기본적이라 누구나 연주할 수 있습니다. 한 번 해보세요! 전부 G 키이며, 유용한 스케일 3가지를 사용합니다.'
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
console.log(`설명 번역 적용(배치2): ${translatedCount}개`);
