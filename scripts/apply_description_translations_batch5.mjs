import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  92: `이 부분은 나중에 덧붙였습니다. 펜타토닉 일부를 반복하는 구조지만 재미있습니다.

e---------------------------------------------------
b-----------------------------3---------------------
g----0-2-0-2-4-2-0-0-0-2-0-2-4----------------------
d---2-------------2-2-------------------------------
a---------------------------------------------------
E---------------------------------------------------`,
  134: `먼저 이렇게 연주합니다:

e|-------------------
B|-------------------
G|----14-12-10-9-10-9
D|-12----------------
A|-------------------
E|-------------------

그 다음에는 아래로 이어갑니다:

e|---------------------------------
B|---------------------------------
G|----12-10-9-10-9-----10-9-7-9-7--
D|-10-------------10\\8------------8/Intro Riff*
A|---------------------------------
E|---------------------------------

* 마지막 8 이후에는 시작 리프로 슬라이드해서 들어가는 편입니다.
* 전체를 2번 반복하세요.
* 표기: \\ = 슬라이드 다운, / = 슬라이드 업`,
  166: '이 리프는 해머온과 다운스트로크를 연습하기에 아주 좋습니다. 얼터네이트 피킹이나 다운스트로크 둘 다 연습할 수 있습니다. 이런 피킹 패턴은 메탈과 록의 다양한 리프에서 자주 등장합니다. 타이밍이 핵심이며, 특히 마지막 리프에서 중요합니다. 템포는 90bpm입니다. 각 코드가 강조되도록 음을 구성했으며, 팜 뮤트가 코드와 리드를 더 또렷하게 만들어줍니다. 연습하면 이 피킹 테크닉으로 자신만의 멋진 브레이크다운도 만들 수 있습니다! MP3로 재생하세요.',
  208: `같은 음들을 사용하는 또 다른 릭입니다. Vai나 Satch 느낌이 납니다.

e----5-9-5---------5-9-5---------5-9-5----------5-------------
B---5-----8-5-----5-----8-5-----5-----8-5-------5-------------
G--6---------7-6-6---------7-6-6---------7-6----6-------------
D-7-------------7-------------7-------------7---5-------------
A-----------------------------------------------7-------------
E-----------------------------------------------5-------------

MP3로 재생하세요.`,
  230: `3도(C#)까지 포함하고 싶다면 아래처럼 연주할 수 있습니다:

D D U H H D D H H P P U U P P U

E|-----------------9-12-15-12-9---------------|
B|--------------12--------------12------------|
G|------9-12-14--------------------14-12-9----|
D|---11------------------------------------11-|
A|12------------------------------------------|
E|--------------------------------------------|

원래 피킹 감각은 그대로 유지하고, 다운/업 두 스트로크는 스윕처럼 부드럽게 연결해 전체 흐름을 매끄럽게 만드는 것이 포인트입니다.`,
  238: `셔레드 릭 예시입니다:

E|15-14-12----------14-12-10----------------------------------------10-14-13b14~~~|
B|---------15-14-12----------14-12-10----------------------------12---------------|
G|------------------------------------15-12-11----------------11------------------|
D|---------------------------------------------14-12-11----12---------------------|
A|------------------------------------------------------14------------------------|
E|--------------------------------------------------------------------------------|`,
  243: `벌스/코러스는 확실치 않습니다. 아래 리프를 반복(x4)합니다:

e---------------------------------------------
b--------------------------------------------- x4
g7-999-7-999-7-999-7-999----------------------
d---------------------------------------------
a---------------------------------------------
E---------------------------------------------

코드는 Em, A, C, D입니다. 의견이나 제안이 있으면 알려주세요. 솔로에서 어떤 스케일을 쓰면 좋을지도 조언 부탁합니다.`,
  254: `A7 위에서 쓰는 간단한 아이디어입니다:

A7
e|8p5---5--------5---------------------------------------3------------------------|
B|----8---8-5-8b---5---------7-5-------------------------2------------------------|
G|-------------------7brp5---7-5-------------------2-----2------------------------|
D|-------------------------7-------7-5h7p5---------2-----2------------------------|
A|-----------------------------------------7-6-5-3-0-----0------------------------|
E|--------------------------------------------------------------------------------|

WAV로 재생하세요.`,
  304: 'F# 프리지안에서 연주합니다. 이 릭의 핵심은 해머온/풀오프 없이 모두 피킹하는 것이고, 그 덕분에 플라멩코 같은 느낌이 납니다. 템포가 빠르므로 아직 속도가 안 나온다면 천천히 시작해서 플라멩코 템포까지 단계적으로 올리되, 실수 없이 깨끗하게 연주하는 것을 우선하세요. 멜로디는 취향의 영역이니, 마음에 들지 않으면 연습용 패턴으로 써도 좋습니다. 그렇게 하면 모두에게 이득입니다. :D',
  306: '아주 훌륭한 릭이고, Charlie Parker가 얼마나 전설적인 인물인지도 함께 떠올리면 좋습니다. 그는 비밥을 시작한 인물로, 원래는 형편없는 연주자였고 다른 재즈 뮤지션들이 함께 연주해주지 않았다고 합니다. 그래서 그는 방에 틀어박혀 하루에 최소 12시간씩 연습하고 공부해 결국 지금의 전설이 되었습니다. 더 많은 이야기가 궁금하면 그의 삶을 다룬 영화 "Bird"를 추천합니다(그의 별명이기도 합니다). 이 릭은 "Anthropology"에서 나온 것이고, 정말 놀라운 트랙입니다.',
  317: '첫 릭 도전입니다. 여기에 올릴 만한 내용이면 좋겠고, 아니라면 삭제되어도 상관없을 정도로 마음은 단단합니다. :-) 블루스를 꽤 공부하면서 워크북도 따라가고, 스케일과 코드를 연습하지 않을 때는 펜타토닉(마이너 + 블루 노트 추가 버전 포함)으로 이런저런 걸 해봅니다. 어느 날 이 작은 릭을 치다가 공유할 만하다고 생각했습니다. 포맷을 깔끔하게 만드는 팁을 알려준 GuitarGeorge에게 감사드립니다!',
  324: '곡은 Bb 키이고, 여기 옮긴 릭은 IV(코러스 5번째 마디)에서 시작합니다. Bb 마이너 펜타토닉 블루스 스케일 프레이즈로 시작한 뒤, D7 위에서 A dim 아르페지오(5, b7, b9, 3)를 사용합니다. 마지막은 블루지한 크로매틱 프레이즈로 마무리됩니다. 저는 이 릭을 Bireli Lagrene가 Jaco Pastorius와 함께 녹음한 앨범 Stuttgart Aria에서 가져왔습니다. 곡 제목은 Pee Wee Ellis가 만든 "Chicken"이며, 정말 연주하기 재미있는 곡이니 아직 못 들어봤다면 꼭 들어보세요. 라이브 버전도 좋습니다.'
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
console.log(`설명 번역 적용(배치5): ${translatedCount}개`);
