import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { licks } from '../src/data/licks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/licks.js');

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

function formatArray(value, indentLevel) {
  if (!Array.isArray(value) || value.length === 0) {
    return '[]';
  }

  const hasObject = value.some((item) => item && typeof item === 'object' && !Array.isArray(item));

  if (!hasObject) {
    const items = value.map((item) => formatPrimitive(item));
    return `[${items.join(', ')}]`;
  }

  // chords처럼 객체 배열은 한 줄 객체로 표시하되 배열은 한 줄로 유지
  const items = value.map((item) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      return formatChordObject(item);
    }
    return formatPrimitive(item);
  });
  return `[${items.join(', ')}]`;
}

function formatValue(value, indentLevel) {
  if (Array.isArray(value)) {
    return formatArray(value, indentLevel);
  }
  if (value && typeof value === 'object') {
    const indent = ' '.repeat(indentLevel);
    const innerIndent = ' '.repeat(indentLevel + 4);
    const entries = Object.entries(value).map(
      ([key, val]) => `${innerIndent}${formatKey(key)}: ${formatValue(val, indentLevel + 4)}`
    );
    return `\n${innerIndent}{\n${entries.join(',\n')}\n${innerIndent}}`;
  }
  return formatPrimitive(value);
}

function orderedKeys(entry) {
  const keys = Object.keys(entry);
  const ordered = PROP_ORDER.filter((key) => keys.includes(key));
  const rest = keys.filter((key) => !PROP_ORDER.includes(key)).sort();
  return [...ordered, ...rest];
}

function formatEntry(entry) {
  const baseIndent = '    ';
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
    const formatted = Array.isArray(value)
      ? formatArray(value, propIndent.length)
      : formatValue(value, propIndent.length);

    lines.push(`${propIndent}${formatKey(key)}: ${formatted},`);
  }

  // 마지막 쉼표 제거
  const lastIndex = lines.length - 1;
  lines[lastIndex] = lines[lastIndex].replace(/,$/, '');
  lines.push('    },');
  return lines.join('\n');
}

const sorted = [...licks].sort((a, b) => Number(a.id) - Number(b.id));
const body = sorted.map((entry) => formatEntry(entry)).join('\n\n');
const output = `export const licks = [\n    // ID 순 정렬\n${body}\n];\n`;

writeFileSync(TARGET, output, 'utf-8');
console.log(`licks 정렬 완료: ${sorted.length}개`);
