import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('initial HTML includes the about section and real project descriptions', () => {
  for (const text of [
    'id="about"',
    'Product engineering, end to end.',
    'From empty repo to production URL.',
    'InferenceSaver',
    'SSR-first AI SaaS platform',
    'RentSpace',
    'Rental platform with AI tenant screening',
    'SyntaxArk',
    'Multi-file editing, runtime execution',
    'Kami Drywall &amp; Renovation',
  ]) {
    assert.ok(html.includes(text), `Initial HTML missing: ${text}`);
  }
  assert.ok(!html.includes('<div id="root"></div>'), 'Vite app shell was not pre-rendered');
});

test('crawlers are allowed to access the site', async () => {
  const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \//);
});
