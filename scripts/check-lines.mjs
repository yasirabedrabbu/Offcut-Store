import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['src', 'supabase', 'scripts', 'config'];
const allowed = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.sql', '.json']);
async function files(dir) {
  let result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    result = entry.isDirectory() ? result.concat(await files(path)) : result.concat(path);
  }
  return result;
}
const paths = [];
for (const root of roots) { try { paths.push(...await files(root)); } catch {} }
const failures = [];
for (const path of paths) if (allowed.has(path.slice(path.lastIndexOf('.')))) {
  const count = (await readFile(path, 'utf8')).split(/\r?\n/).length;
  if (count > 100) failures.push(`${path}: ${count} lines`);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
