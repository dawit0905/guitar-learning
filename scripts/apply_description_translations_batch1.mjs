import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

const TRANSLATIONS = {
  65: 'T는 탭, po는 풀오프를 의미합니다.',
  83: '팁과 댓글을 남겨주시면 정말 감사하겠습니다.',
  105: '즐겁게 연주하세요!',
  106: '즐겁게 연주하세요!',
  110: '즐겁게 연주하세요!',
  125: '즐겁게 연주하세요. MP3로 재생하세요.',
  164: '평가와 댓글 부탁드리고, 즐겁게 연주하세요 :)',
  165: '아마 별로일 수도 있지만, 그래도 해보세요!',
  167: '* 1/4 스텝 정도로 살짝 벤딩하세요.',
  169: '미디로 재생하세요.',
  178: 'WAV로 재생하세요.',
  179: '그리고 반복하세요.',
  184: '미디로 재생하세요.',
  194: '나머지도 곧 올릴게요.',
  209: 'MP3로 재생하세요.',
  210: '대단하진 않지만 입문자에게 괜찮습니다. MP3로 재생하세요.',
  214: '재미있게 연주하세요 ;)',
  216: 'MP3로 재생하세요.',
  217: 'MP3로 재생하세요.',
  218: 'MP3로 재생하세요.',
  222: 'MP3로 재생하세요.',
  236: '*수정* 멋지게 연주하세요 xD xD. MP3로 재생하세요.',
  237: '감이 오나요? 멋지게 연주하세요 xD. MP3로 재생하세요.',
  240: 'MP3로 재생하세요.',
  242: 'MP3로 재생하세요.',
  252: '멋지게 연주하세요! MP3로 재생하세요.',
  274: 'MP3로 재생하세요.',
  275: '오디오: http://www.4shared.com/mp3/p9U50QiC/BMINOR.html',
  279: '미디로 재생하세요.',
  280: 'MP3로 재생하세요.',
  290: '이 릭은 C 마이너 펜타토닉 스케일을 사용합니다.',
  291: 'Ab 마이너 블루스 스케일을 사용합니다.',
  292: '아주 멋진 릭입니다. 어떻게 생각하는지 알려주세요!',
  315: '이 릭은 Dadd11과 C 코드로 마무리됩니다. WAV로 재생하세요.',
  327: '괜찮게 들리는지, 어떻게 생각하는지 알려주세요.'
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
console.log(`설명 번역 적용: ${translatedCount}개`);
