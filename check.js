// Sanity check for data.js. Run: node check.js
const assert = require('assert');
const src = require('fs').readFileSync(__dirname + '/data.js', 'utf8');
eval(src + ';globalThis.Q = QUIZ; globalThis.C = CARDS');
// a LaTeX backslash inside '...' is eaten by JS ('\chi' -> 'chi'); card text with LaTeX must use T`...`
assert(!/\b[tfn]: '[^'\n]*\\/.test(src), 'card text with LaTeX must use T`...`, not quotes');
Q.forEach((q, i) => {
  assert(q.w >= 1 && q.w <= 12, `quiz ${i}: bad week`);
  assert(q.q && q.why, `quiz ${i}: missing question/why`);
  assert(q.o.length >= 2 && q.a >= 0 && q.a < q.o.length, `quiz ${i}: bad options/answer`);
});
C.forEach((c, i) => {
  assert(c.w >= 1 && c.w <= 12 && c.t && c.f, `card ${i}: bad card`);
  assert([].concat(c.f).every(f => typeof f === 'string' && !/<\w/.test(f)), `card ${i}: formula must be LaTeX, not HTML`);
  assert([c.t, c.n || ''].every(s => (s.match(/\$/g) || []).length % 2 === 0), `card ${i}: unpaired $ in name/note`);
});
console.log(`ok: ${Q.length} questions, ${C.length} cards`);
