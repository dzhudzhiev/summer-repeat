import { readFileSync, writeFileSync, globSync } from 'fs';

const files = globSync('src/content/week-*/day-*.ts');

for (const file of files) {
  let content = readFileSync(file, 'utf-8');

  // Fix single backslash before letters to double backslash
  // (?<!\\) = negative lookbehind: not preceded by backslash
  // \\([a-zA-Z]) = backslash followed by a letter
  // Replacement: \\$1 = double backslash + the letter
  content = content.replace(/(?<!\\)\\([a-zA-Z])/g, '\\\\$1');

  // But now we've broken valid escapes: \$ in the original content
  // Wait, \$ — the $ is not a letter, so our regex didn't touch it
  // What about \\n in existing practice arrays?
  // \\ → first \ escapes the second → produces \n (literal backslash + n)
  // Our regex finds \(letter), so \\n has `\` before `n` in `\n`
  // But `\\n` = literal `\` followed by literal `n` in JS
  // The actual escape sequence analysis:
  // In source: \\n  →  JS interprets: \\ is literal \, n is just n  → result: \n
  // Our regex starts from the raw file content: \\
  // It finds \n (backslash + n) and changes to \\n (two backslashes + n)
  // New result in JS: \\n → \\ is literal \, n is n → result: \n
  // Wait, that's the same! \\n → \\ is literal backslash, n is n → \n
  // And in the LaTeX: `\n` isn't a LaTeX command, so this is fine.

  // But actually, we also just broke things like \newline or similar
  // And more importantly, \\ in the source code represents one literal backslash
  // Our regex finds every single \ before a letter and doubles it
  // So: `\\n` in source has TWO chars: \ and \ (which JS sees as one escaped \)
  // followed by n
  // Wait no — the file content is raw text. In the raw file: `\n` is the backslash char followed by n.
  // And `\\n` in the raw file is two backslash chars followed by n.
  // The negative lookbehind checks the raw file characters.
  // So `\n` → matches (no preceding \), replaces to `\\n`
  // `\\n` → does NOT match (preceded by \), stays `\\n`
  // This is correct!

  // Check for: `\$` in the content — this is valid JS in template literals for literal $
  // But `\${` starts a template expression...
  // `\$` — the `\$` is an escape for $ in template literals
  // Our regex only targets letters, not $, so `\$` is untouched. Good.

  writeFileSync(file, content, 'utf-8');
  console.log('Fixed:', file);
}
