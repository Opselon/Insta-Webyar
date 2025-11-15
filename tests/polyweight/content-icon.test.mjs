import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const resolveDataPath = (file) => {
  const testDir = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(testDir, '../../src/data', file);
};

const loadJson = async (file) => {
  const raw = await readFile(resolveDataPath(file), 'utf8');
  return JSON.parse(raw);
};

const [en, fa] = await Promise.all([loadJson('en.json'), loadJson('fa.json')]);

const allowedIcons = new Set([
  'palette',
  'brain',
  'joystick',
  'shield',
  'handshake',
  'box',
  'bolt',
  'chart',
  'loop',
  'target',
  'blueprint',
  'wand',
  'lock',
  'chat'
]);

const extractIcons = (content) => {
  const icons = [];
  content.features.sections.forEach((section) => {
    section.bullets.forEach((bullet) => {
      icons.push(bullet.icon);
    });
  });
  return icons;
};

const allIcons = [...extractIcons(en), ...extractIcons(fa)];

const emojiRegex = /[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u;

test('feature bullet icons map to the SVG registry', () => {
  allIcons.forEach((icon) => {
    assert.ok(
      allowedIcons.has(icon),
      `Unexpected icon key "${icon}". Update icon registry if this is intentional.`
    );
  });
});

test('feature bullet icons no longer use emoji glyphs', () => {
  allIcons.forEach((icon) => {
    assert.equal(
      emojiRegex.test(icon),
      false,
      `Icon "${icon}" should be mapped to an SVG identifier, not a raw emoji.`
    );
  });
});
