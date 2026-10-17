/** Parse all project JS/JSX files. Requires `npm install` (typescript is a dev dependency). */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    return ent.isDirectory() ? walk(full) : [full];
  });
}
const files = walk(path.resolve('src')).filter(f => /\.(jsx?|mjs)$/.test(f));
let bad = 0;
for (const filename of files) {
  const file = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.ESNext,
    true, filename.endsWith('.jsx') ? ts.ScriptKind.JSX : ts.ScriptKind.JS);
  for (const error of file.parseDiagnostics) {
    bad++;
    const point = file.getLineAndCharacterOfPosition(error.start || 0);
    console.error(`${filename}:${point.line + 1}:${point.character + 1} ${ts.flattenDiagnosticMessageText(error.messageText, ' ')}`);
  }
}
console.log(`Parsed ${files.length} JS/JSX files; ${bad} syntax errors.`);
process.exitCode = bad ? 1 : 0;
