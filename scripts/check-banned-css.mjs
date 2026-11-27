import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function scan(dir) {
  let result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    result = entry.isDirectory() ? result.concat(await scan(path)) : result.concat(path);
  }
  return result;
}
const paths = await scan('src');
const banned = /\b(box-shadow|text-shadow|drop-shadow|linear-gradient|radial-gradient|conic-gradient)\b/i;
const failures = [];
for (const path of paths.filter((item) => /\.(css|ts|tsx)$/.test(item))) {
  const text = await readFile(path, 'utf8');
  if (banned.test(text)) failures.push(path);
}
if (failures.length) { console.error(`Banned visual effects: ${failures.join(', ')}`); process.exit(1); }
