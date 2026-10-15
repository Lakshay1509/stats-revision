// Sanity check for data.js and assign.js. Run: node check.js
const assert = require('assert');
const src = ['data.js', 'assign.js'].map(f => require('fs').readFileSync(__dirname + '/' + f, 'utf8')).join('\n');
eval(src + ';globalThis.Q = QUIZ; globalThis.C = CARDS; globalThis.A = ASSIGN');
// a LaTeX backslash inside '...' or "..." is eaten by JS ('\chi' -> 'chi'), so any text with LaTeX must use T`...`
assert(!/\\/.test(src.replace(/T`[^`]*`/g, '')), 'text with LaTeX must use T`...`, not quotes');
const mathOk = s => !/<su[bp]>/.test(s) && (s.match(/\$/g) || []).length % 2 === 0;
Q.forEach((q, i) => {
  assert(q.w >= 1 && q.w <= 12, `quiz ${i}: bad week`);
  assert(q.q && q.why, `quiz ${i}: missing question/why`);
  assert(q.o.length >= 2 && q.a >= 0 && q.a < q.o.length, `quiz ${i}: bad options/answer`);
  assert([q.q, ...q.o, q.why, q.trap || ''].every(mathOk), `quiz ${i}: math must be $LaTeX$ with paired $, not <sub>/<sup>`);
});
C.forEach((c, i) => {
  assert(c.w >= 1 && c.w <= 12 && c.t && c.f, `card ${i}: bad card`);
  assert([].concat(c.f).every(f => typeof f === 'string' && !/<\w/.test(f)), `card ${i}: formula must be LaTeX, not HTML`);
  assert([c.t, c.n || ''].every(s => (s.match(/\$/g) || []).length % 2 === 0), `card ${i}: unpaired $ in name/note`);
});
A.forEach((q, i) => {
  const at = `assignment ${q.w} Q${q.n}`;
  assert(q.w >= 1 && q.w <= 12 && q.n >= 1 && q.n <= 10, `assignment entry ${i}: bad assignment/question number`);
  assert(q.q && q.why, `${at}: missing question/why`);
  assert(q.o.length >= 2 && q.o.length <= 6 && q.a >= 0 && q.a < q.o.length, `${at}: bad options/answer`);
  assert([q.q, ...q.o, q.why, q.trap || ''].every(mathOk), `${at}: math must be $LaTeX$ with paired $`);
});
for (let w = 1; w <= 12; w++) {
  const ns = A.filter(q => q.w === w).map(q => q.n).join();
  assert.strictEqual(ns, '1,2,3,4,5,6,7,8,9,10', `assignment ${w}: expected questions 1–10 in order, got [${ns}]`);
}
console.log(`ok: ${Q.length} questions, ${C.length} cards, ${A.length} assignment questions`);
