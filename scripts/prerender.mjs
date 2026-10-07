import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { render } from '../.prerender/entry-server.js';

const output = resolve('dist/index.html');
const html = await readFile(output, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Root marker missing from built HTML');
const content = render();
for (const expected of ['id="about"', 'InferenceSaver', 'RentSpace', 'SyntaxArk']) {
  if (!content.includes(expected)) throw new Error(`Pre-render missing ${expected}`);
}
await writeFile(output, html.replace(marker, `<div id="root">${content}</div>`));
await rm(resolve('.prerender'), { recursive: true, force: true });
console.log('Pre-rendered portfolio into dist/index.html');
