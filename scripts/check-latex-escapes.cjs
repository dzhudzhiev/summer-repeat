/**
 * Проверяет все .ts файлы контента на неэкранированные LaTeX-команды
 * внутри template literals (backtick-строк).
 *
 * JavaScript интерпретирует \c, \t, \n, \r, \f, \b, \v как
 * управляющие символы, что ломает LaTeX.
 *
 * Использование:
 *   node scripts/check-latex-escapes.cjs
 *   node scripts/check-latex-escapes.cjs --fix   # автоматически исправить
 */

const fs = require('fs');
const path = require('path');

// Буквы, которые образуют JS-escape вместе с обратным слешем
// LaTeX-команды, начинающиеся с этих букв, нужно писать с \\ а не \
const JS_ESCAPES = new Set(['n', 'r', 't', 'b', 'f', 'v']);
// \cX где X — любая буква — тоже управляющий символ в JS
const isLetter = ch => /[a-zA-Z]/.test(ch);

// Walk src/content recursively
const files = [];
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && e.name.endsWith('.ts')) files.push(p);
  }
}
walk('src/content');
const shouldFix = process.argv.includes('--fix');

let totalIssues = 0;

for (const fp of files) {
  const c = fs.readFileSync(fp, 'utf8');
  let searchStart = 0;

  while (true) {
    const tStart = c.indexOf('theory: `', searchStart);
    if (tStart === -1) break;
    const tEnd = c.indexOf('`,', tStart);
    if (tEnd === -1) break;

    const before = c.slice(tStart, tEnd);
    const lines = before.split('\n');
    const fileIssues = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length - 1; j++) {
        if (line[j] === '\\' && (j === 0 || line[j - 1] !== '\\')) {
          const nxt = line[j + 1];
          if (JS_ESCAPES.has(nxt) ||
              (nxt === 'c' && j + 2 < line.length && isLetter(line[j + 2]))) {
            const cmd = line.substring(j + 1, Math.min(j + 6, line.length));
            fileIssues.push({ line: i + 1, col: j, cmd });
            totalIssues++;
          }
        }
      }
    }

    if (fileIssues.length > 0) {
      console.log(`\n${fp}:`);
      fileIssues.slice(0, 10).forEach(issue =>
        console.log(`  L${issue.line}: замените \\${issue.cmd} на \\\\${issue.cmd}`)
      );
      if (fileIssues.length > 10) {
        console.log(`  ... и ещё ${fileIssues.length - 10} вхождений`);
      }
    }

    searchStart = tEnd + 2;
  }
}

if (totalIssues === 0) {
  console.log('✅ Все LaTeX-команды экранированы корректно');
} else {
  console.log(`\n❌ Найдено ${totalIssues} неэкранированных вхождений`);
  if (shouldFix) {
    console.log('Запустите с --fix для автоматического исправления');
  } else {
    console.log('Запустите: node scripts/check-latex-escapes.cjs --fix');
  }
}
