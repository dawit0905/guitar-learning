import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  94: `네오클래시컬 릭 2가지입니다:

e|-19-17-15----------17-15-14--------------------------------------------------|
B|----------20-19-17----------19-17-15--20-19-17--17-15-14--19-17-15-----------|
G|-------------------------------------------------------------------19-18-16--|
D|-----------------------------------------------------------------------------|
A|-----------------------------------------------------------------------------|
E|-----------------------------------------------------------------------------|

얼터네이트 피킹이나 레가토로 연주하세요. 소리가 이상하면 알려주세요… 그럼 제가 틀렸을 수도 있습니다 =p`,
  96: `8프렛에서 벤딩해서 10프렛과 같은 음이 되도록 올리라는 뜻입니다(같은 음은 E줄 5프렛과 같습니다).
이 릭은 록, 블루스, 컨트리, 메탈에서 매우 자주 등장합니다. 이런 장르에서 즉흥 연주에 널리 쓰이는 펜타토닉 박스를 중심으로 합니다.
B줄에서 한 프렛 낮춰 연주하면 느낌이 크게 달라지며(그 경우 더 멀리 벤딩해야 합니다).

Fig. 2
E|--6----6--|
b|--6----6--|
g|--8b10----|

이건 주로 블루스에서 많이 들을 수 있고, Chuck Berry의 Johnny B. Goode 같은 곡에서도 쉽게 알아볼 수 있습니다.

Fig. 3
E|------------|
b|--7brbp5----|
g|---------5--|

이건 아주 블루지한 작은 벤딩을 표현하려고 제가 할 수 있는 최선의 표기입니다. Stevie Ray Vaughan이 이 테크닉을 자주 씁니다.
기본적으로는 줄을 벤딩했다가 원위치로 돌아오고, 다시 반대 방향으로 살짝 흔드는 느낌입니다. 넥을 단단히 잡고 살짝 흔들어주면 더 쉽게 됩니다.
이 릭들은 어떤 솔로에도 쉽게 끼워 넣을 수 있으니, 이것저것 실험하면서 즐겨보세요!`,
  146: `간단한 스윕/탭 아이디어입니다:

T T
--------------------------13h17p13-----------22p17p14----------12h16P21--------
-----------------------15----------15----15-----------15----15----------14-----
--14----------------14----------------14-----------------14----------------12--
-----15----------15------------------------------------------------------------
--------17p14h17---------------------------------------------------------------
-------------------------------------------------------------------------------

아주 단순하고, 저는 밴드에서 사용하고 있습니다. 제대로 연주하면 꽤 멋집니다.
제가 맞게 적었는지는 확신 없지만, 한 번 시도해보았습니다. 감사합니다!
수정: 탭 숫자를 잘못 적었습니다. 22와 21이 맞고 20과 19는 아닙니다. 물론 원하는 대로 연주하세요. 더 좋게 들리는 쪽이 정답입니다.`,
  173: `적당히 느리게 연주하고, 손가락 위치를 바꿀 때까지 모든 음이 울리게 두세요. 저는 전부 핑거피킹으로 연주하지만, 편한 방식으로 연주해도 됩니다.

e:-7--10~-----------------------------3\\0----3\\0------------------------------|
B:--8----8---10~7--10~10----13\\12---------1-1---------------------------------|
G:---9----9------8------11---------0-0----2-2----0-0-0-0-9-\\8-~-0-0--0--------|
D:---------10-----9-------12-------2-2----2-2----4-4-2-2-9-\\8-~-4-4--2/7------|
A:---------------------------------2-2----0-0----2-2-3-3-10\\9-~-2-2--3--8-----|
D:---------------------------------2-2-----------2-2-5-5-12\\11~-2-2--3---9~~~~|`,
  221: `엔딩 진행은 C → F7 → G7 → F7입니다:

ENDING C F7 G7 F7
e----------------------+--------------------+-----------------+--------------------
B-13-17-13--13-17-13---+13-16-13--13-16-13--+18-15--15-18-15--+16-13--13-16-13-----
G---------14---------14+--------14--------14+-----16--------16+-----14---------14--
D----------------------+--------------------+-----------------+--------------------
A----------------------+--------------------+-----------------+--------------------
E----------------------+--------------------+-----------------+--------------------

이어서 C Db C...(C6) 파트:

e-----------------------------5--
B--------------10↑↓--6-5------5--
G--------------10↑↓--6-5---------
D---10-10-10---------6-5---------
A-7---8--9--10-------------------
E--------------------------------

MP3로 재생하세요.`,
  232: `기타 2는 하모니에서 디미니쉬드 트라이어드를 사용합니다. 모든 트라이어드에서 플랫5로 이동하기도 합니다. Db → G → Db → G가 하모니의 루트 역할을 합니다.

GUITAR 2
e--------------------+---------------------+---12-15-12----12-15-12+15---
B--------------------+-------------11-14-11+14----------14---------+-----
G--------------------+---9-12-9-12---------+-----------------------+-----
D--------------8-11-8+11-------------------+-----------------------+-----
A----7-10-7-10-------+---------------------+-----------------------+-----
E--9-----------------+---------------------+-----------------------+-----

MP3로 재생하세요.`,
  287: '다음 릭의 첫 마디는 Dm7b5 아르페지오를 사용하며, E7 위에서 b7, b9, 3, b13 역할을 하면서 얼터드한 느낌을 냅니다. 두 번째 마디에서 George는 Abmaj7 아르페지오를 연주하는데, 이는 3, b13, 7, #9로 들립니다. 도미넌트 코드에서 메이저7을 쓰는 것은 조금 특이하지만, 텐션을 쌓기 위한 아르페지오 연쇄의 일부라서 여기서는 잘 어울립니다. Abmaj7 뒤에는 Ab#5 트라이어드 아르페지오가 이어지며, 이는 3, b13, 1로 기능하면서 Amin의 9로 연결됩니다. 이 릭은 George Benson의 스탠더드 \"Stella by Starlight\"(CD \"Tenderly\")에서 들을 수 있습니다. 단독으로는 이상할 수 있지만 반주 위에서는 아주 좋습니다.',
  296: '이 릭은 Miles Davis의 앨범 \"Kind of Blue\"에 실린 \"So What\"의 테마입니다. 1959년에 거의 리허설 없이 첫 테이크로 녹음된 이 세션은 진정한 걸작이며, 고정된 화성과 형식에서 벗어난 모달 재즈의 핵심 기록이 되었습니다. 밴드 구성도 매우 뛰어난데(마일스의 탁월한 캐스팅 감각을 보여줍니다), 색소폰에 John Coltrane과 Julian \"Cannonball\" Adderley, 피아노에 Bill Evans(또는 \"Freddie Freeloader\"에서는 Wynton Kelly), 베이스에 Paul Chambers, 드럼에 Jimmy Cobb가 참여했습니다. Miles Davis는 여러 장르의 수많은 음악가에게 영감을 준 진정한 전설입니다.',
  318: '이것은 Jerry Reed Hubbard의 명곡을 시작하는 인트로 부분으로, Chet Atkins와 함께 녹음한 Chet Atkins의 CD \"Me and Jerry\"에서 들을 수 있습니다. 기타를 멜로디 악기처럼 연주하는 데 익숙하지 않다면 상당히 낯설게 느껴질 수 있습니다. 이유는 밴조처럼 멜로디 기타를 연주할 때, 높은 포지션의 운지 음과 가능한 많은 개방현을 섞어 쓰기 때문입니다. 이렇게 하면 울림이 겹치면서 매우 독특한 사운드가 나옵니다. 프렛 음 대신 개방현을 섞어 쓰는 감각에 익숙해질 때까지는 어색할 수 있습니다. 곡을 한 번 빠르게 훑어보면 무슨 말인지 바로 감이 올 것입니다. Guitar Pro 버전도 분위기를 잘 살리지만, 탭이나 악보에서 지시하는 대로 정확히 연주하면 훨씬 더 좋습니다. 제가 표시한 오른손/왼손 운지를 특히 주의 깊게 보세요. 이게 곡을 부드럽고 빠르게 연주하는 핵심입니다. 이 첫 브레이크는 말 그대로 인트로일 뿐이지만, 밴조 스타일의 멋진 릭이고 이것만 제대로 연주해도 충분히 만족스러울 것입니다.',
  323: '이 릭은 Bill Frisell의 아이디어로, C 하모닉 마이너 스케일을 사용해 Cmaj7로 연결합니다. Bill Frisell은 독창적인 테크닉과 사운드 덕분에 매우 독특한 재즈 기타리스트입니다. 볼륨 페달과 딜레이/리버브 같은 이펙트를 적극적으로 사용해 기타를 페달 스틸과 호른의 중간쯤 되는 질감으로 만들기도 합니다. 그는 록, 컨트리, 비밥 등 다양한 장르의 요소를 섞어 이전에 없던 방식으로 결합합니다. 재즈 상황에서도 포크 코드 하나를 과감히 넣고, 빠른 연주에만 의존하지 않습니다. 아직 안 들어봤다면 꼭 한 번 찾아보세요!',
  331: 'Montgomery의 블루지한 ii-V-I 안에는 매우 멋진 하모닉 서브가 숨어 있습니다. 이 라인에서 무슨 일이 벌어지는지, Wes가 무슨 생각을 했는지 함께 생각해보세요. 핵심은 도미넌트 사이클입니다. 가능한 해석은 여러 가지인데, 예를 들면 D7/G7alt → C7alt/F7 또는 D7/Db7 → Gb7/F7, 혹은 도미넌트 7alt 사이클과 트라이톤 서브를 섞는 방식도 가능합니다. 그래서 이 릭이 특히 재미있습니다! 첫 마디는 까다롭습니다. Am7으로 볼 수도 있고, Am7/D7로 볼 수도 있고, A에서 시작하는 G7 릭으로 볼 수도 있습니다. 저는 사이클 진행에 더 잘 맞아서 Am7/D7로 보는 편이지만, G7로 봐도 충분히 맞습니다. 첫 마디를 하나로 딱 고정하기가 어렵습니다.'
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
console.log(`설명 번역 적용(배치6): ${translatedCount}개`);
