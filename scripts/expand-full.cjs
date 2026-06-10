const fs = require('fs');

function expandDay(file, theories) {
  let content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let starts = [], ends = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('theory: `') && !lines[i].trim().startsWith('//')) starts.push(i);
  }
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '`,' && starts.some(s => i > s)) ends.push(i);
  }
  if (starts.length !== theories.length) {
    console.log('ERROR ' + file + ': ' + starts.length + ' blocks, ' + theories.length + ' provided');
    return;
  }
  let result = [...lines.slice(0, starts[0])];
  for (let t = 0; t < theories.length; t++) {
    result.push(theories[t]);
    if (t < theories.length - 1) result.push(...lines.slice(ends[t] + 1, starts[t + 1]));
  }
  result.push(...lines.slice(ends[theories.length - 1] + 1));
  fs.writeFileSync(file, result.join('\n'));
  console.log('Expanded ' + file);
}
console.log('Script loaded - ready to expand days');
