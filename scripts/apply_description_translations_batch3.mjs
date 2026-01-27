import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  62: { mode: 'append', text: '위 탭은 첫 번째 패턴 위에 겹쳐 연주하면 아주 달콤하게 들립니다.' },
  63: { mode: 'append', text: '위 탭은 Em에서 쓰기 좋은 간단한 아이디어입니다. 느리게 정확히 익힌 뒤 속도를 올려보세요.' },
  90: {
    mode: 'replace',
    text: 'Iron Maiden이 할 법한 느낌이 나지만 왜 그런지는 잘 모르겠습니다... A 마이너이며(3도와 6도가 없어서 하모닉 마이너에도 잘 맞습니다).'
  },
  95: { mode: 'append', text: '위 탭은 Stevie Ray Vaughan 스타일의 짧은 릭 아이디어입니다. 반복해서 감을 익혀보세요.' },
  102: {
    mode: 'replace',
    text: 'L=레가토 슬라이드, 1/4=마이크로톤 벤딩(아주 작은 벤딩)입니다. 이건 느낌이 특히 중요합니다. 일렉에서도 잘 어울릴 거라 생각합니다. 아이디어를 준 slingerr에게 고맙고, 저는 조금 더 손봤습니다 ;]'
  },
  103: {
    mode: 'replace',
    text: '제 경험상 이 테크닉은 어쿠스틱 기타나 피에조 픽업이 달린 일렉 기타에서 가장 잘 먹힙니다(특히 Parker Fly에서 반응이 좋습니다). 즐겁게 연주하세요! MP3로 재생하세요.'
  },
  104: {
    mode: 'replace',
    text: '피아노 악보를 기타용으로 옮겼습니다. 곡은 더 길지만 멋진 부분만 가져왔습니다 :p 드롭 D 튜닝이고, 마지막은 제가 살짝 마무리를 덧붙였습니다. 즐겁게 연주하세요 :]'
  },
  115: {
    mode: 'replace',
    text: '스윙 느낌을 꼭 살려 연주하세요! 참고: 1구절의 데드 노트는 프렛 손으로 줄을 뮤트한 뒤, 피킹 손으로 브리지와 넥 사이를 때리듯 슬랩해서 만듭니다. 즐겁게 연주하세요!'
  },
  123: {
    mode: 'replace',
    text: 'Q=4분음표, E=8분음표, S=16분음표입니다. R 줄은 쉼표(한 박자)를 의미합니다. 예전에 곡의 기반으로 써본 리프인데, 저는 리듬적으로 버거워서 아직 완벽하게 못 치겠네요 :P 아무리 느리게(또는 빠르게) 해도 어느 순간 꼬입니다. 미디로 재생하세요.'
  },
  139: {
    mode: 'replace',
    text: '연속되는 패턴이니 반복 사이에 멈추지 말고 계속 이어서 연주하세요. 읽기 어렵게 보일 수도 있지만 줄 순서를 b → d → g → a 로 따라가면 됩니다. 재미있게 연주하세요!'
  },
  143: {
    mode: 'replace',
    text: '음의 홀딩과 벤딩 감각을 익히기에 좋습니다. 제가 보통 벤딩하는 자리에는 (b)를 몇 군데 표시해두었습니다. 저는 어쿠스틱에서 연주하는데, 일렉에서는 어떤 느낌일지 모르겠네요.'
  },
  148: {
    mode: 'replace',
    text: '인도에서는 Sa-Re-Ga-Ma-Pa-Dha-Ni-Sa 진행이라고 부릅니다. C-D-E-F-G-A-B-C와 대응되고, 도레미파솔라시도와도 같습니다. 제 선생님이 가장 먼저 가르쳐 준 릭입니다.'
  },
  149: {
    mode: 'replace',
    text: '타이밍은 4/4이며 모두 4분음표입니다. 어울리는 진행은 |Am7|Fdim|Dm7(9)|입니다. 여러 키로 옮겨 쓰기 좋은(이동이 쉬운) 릭입니다. 즐겁게 연주하세요. 미디로 재생하세요.'
  },
  158: {
    mode: 'replace',
    text: 'G# 에올리안 스케일(G#, A#, B, C#, D#, E, F#)을 실험하다가 발견한 스케일입니다. 스케일을 훑다가 G#m 스윕 아르페지오를 하려다 실수로 C(b4)를 넣게 되었습니다.'
  },
  172: {
    mode: 'replace',
    text: '이건 그렇게 어렵지 않게 배울 수 있습니다. 하이 e 줄에서 내려오는 구간의 트릴은 원하는 만큼 넣어도 되지만, 저는 보통 각 음 묶음마다 2번씩 넣습니다. 끝!'
  },
  182: {
    mode: 'replace',
    text: 'G 메이저 스케일이 좋아졌고, 4/5, 4/2 부분이 멋지게 들려서 주변을 채워보았습니다. 꽤 괜찮게 들립니다. 좋은/나쁜 상관없이 피드백이나 개선 방법을 알려주시면 감사하겠습니다.'
  },
  187: {
    mode: 'replace',
    text: 'A 하모닉 마이너에서 사용하는 릭입니다. 기타 1은 한 옥타브에서, 기타 2는 한 옥타브 위에서 같은 파트를 연주하는 구상입니다. 어떤 속도에서도 잘 통하고, 생각보다 어렵지 않습니다.'
  },
  189: {
    mode: 'replace',
    text: '안녕하세요! 제가 직접 만든 짧은 릭입니다. 중독성이 있고 즉흥적으로 변주할 여지도 많습니다. 즐겁게 연주하시고, 다양한 변주도 만들어보세요!!'
  },
  202: {
    mode: 'replace',
    text: '길이 표기: H=2분음표, Q=4분음표, E=8분음표, S=16분음표입니다. 미디로 재생하세요.'
  },
  215: { mode: 'append', text: '위 라인은 블루스 셔레드 느낌의 진행이며, 마지막은 이렇게 마무리합니다. 멋지게 연주하세요!' },
  244: {
    mode: 'replace',
    text: '마지막을 D#Maj 코드로 끝낸 이유는 (1) 소리가 더 좋고 (2) 이론 덕후가 틀렸다고 해서입니다... 이론적으로는 맞지 않는다는 걸 알지만, 저는 음악의 "규칙"을 꼭 따르진 않습니다.'
  },
  251: {
    mode: 'replace',
    text: '엄청 특별하진 않지만, 분위기가 과열될 때 D 마이너에서 자주 쓰는 릭입니다. 빠르게 연주하거나, 같은 패턴을 목 위쪽 포지션으로 옮기면서 치면 정말 재미있습니다.'
  },
  259: {
    mode: 'replace',
    text: 'h=해머온, p=풀오프, s=슬라이드입니다. 오디오를 올릴 수 있으면 좋겠지만 못 올려서 아쉽네요. 평소에 장난처럼 자주 치는 재지한 아이디어입니다.'
  },
  265: {
    mode: 'replace',
    text: '말했듯이 어려운 내용은 아니지만, 엄청 다재다능하고 소리도 아주 멋진 릭입니다. 오디오를 올릴 수 있으면 좋겠지만, 이 탭을 가져가서 자신만의 것으로 만드는 게 더 좋을 수도 있습니다. 어떤 속도, 어떤 키, 어떤 상황에도 응용 가능합니다. 즐겁게 연주하세요!'
  },
  283: {
    mode: 'replace',
    text: '제가 만든 아이디어입니다. 클린 톤에서 특히 좋고, 디스토션으로도 괜찮습니다. D 튜닝이며 템포는 80bpm 정도가 잘 맞습니다. 여기서 더 이어 붙여서 발전시키기 좋습니다.'
  },
  293: {
    mode: 'replace',
    text: 'Pat Metheny의 "Third Wind"(앨범 Still Life Talking)의 솔로 브레이크입니다. 크로매틱과 펜타토닉 스케일이 많이 들어 있습니다.'
  },
  295: {
    mode: 'replace',
    text: '"Thieves and Poets" 앨범에서 가져왔습니다. D 하모닉 마이너 스케일을 사용하며, 두 번째 마디에서 John McLaughlin이 스윕 피킹을 사용합니다.'
  },
  305: {
    mode: 'replace',
    text: '꽤 간단합니다. 메이저 스케일로 Cmaj7 코드를 보완하는 느낌입니다. 먼저 코드를 치고 그 다음 릭을 연주해보세요. 스케일의 "달콤한 음"이 무엇인지 감이 올 겁니다.'
  },
  307: {
    mode: 'replace',
    text: "Johnny Mandel/Paul Francis Webster가 작곡한 'The Shadow of Your Smile'의 첫 8마디입니다. 아주 멋진 재즈 스탠더드입니다."
  },
  309: {
    mode: 'replace',
    text: '네, 이 릭은 Les Paul의 아이디어입니다. 기타와 8트랙 레코더의 선구자죠. 다른 릭들과 조금 다릅니다. F 트라이어드에 기반하며, F / Fmaj7 / F7 / Dm7 / Bbmaj7 위에서 사용할 수 있습니다. MP3로 재생하세요.'
  },
  311: {
    mode: 'replace',
    text: '제가 릭을 쓰기 시작했을 때 아주 도움이 됐던 작은 패턴입니다. 프렛보드를 익히는 데에도 도움이 됐습니다. 엄청 대단한 릭은 아니지만, 입문자나 좋은 연습거리를 찾는 사람에게 유용합니다. 즐겁게 연주하세요.'
  },
  316: {
    mode: 'replace',
    text: '안녕하세요, Alex Berserker입니다. 앞으로 올릴 많은 셔레드 릭 중 첫 번째이며, 주로 중급/고급 플레이어를 위한 내용입니다! 노트: *오른손으로 18프렛마다 탭 *모든 음을 레가토로 *아웃사이드 피킹 사용. MP3로 재생하세요.'
  },
  319: {
    mode: 'replace',
    text: '즉흥적으로 만든 작은 블루지한 릭입니다. D줄 마지막 7프렛에 비브라토를 넣으면 더 살아납니다. 즐겁게 연주하세요 ^_^ MP3로 재생하세요.'
  },
  329: {
    mode: 'replace',
    text: 'D7 위에서 사용할 수 있는 집시 재즈 릭입니다. 피킹 정확도가 특히 중요하니, 천천히 연습해서 속도를 올리세요.'
  },
  330: {
    mode: 'replace',
    text: 'Coltrane의 맛있는 ii-V-I입니다. 화려하진 않지만 정말 달콤합니다! Am7 구간: F#, G, A, B 사용. D7 구간: C, D, E, G 사용. 이어서 F#, G, A, B → Gmaj7 → D, G, B, D → C, D, E, A → G 로 이어집니다.'
  },
  332: {
    mode: 'replace',
    text: 'Wynton Kelly가 "Freddie Freeloader"에서 연주한 솔로 라인 중 훌륭한 한 줄입니다. 여러 곡에서 활용할 수 있고, 솔로 중간에 생각을 전환할 때 특히 잘 어울립니다.'
  }
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

  if (translation.mode === 'append') {
    return {
      ...lick,
      description: `${lick.description}\n\n${translation.text}`
    };
  }

  return { ...lick, description: translation.text };
});

const sorted = [...updated].sort((a, b) => Number(a.id) - Number(b.id));
const body = sorted.map((entry) => formatEntry(entry)).join('\n\n');
const output = `export const licks = [\n    // ID 순 정렬\n${body}\n];\n`;

writeFileSync(TARGET, output, 'utf-8');
console.log(`설명 번역 적용(배치3): ${translatedCount}개`);
