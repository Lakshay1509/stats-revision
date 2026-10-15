// Sanity check for data.js. Run: node check.js
const assert = require('assert');
eval(require('fs').readFileSync(__dirname + '/data.js', 'utf8') + ';globalThis.Q = QUIZ; globalThis.C = CARDS');
Q.forEach((q, i) => {
  assert(q.w >= 1 && q.w <= 12, `quiz ${i}: bad week`);
  assert(q.q && q.why, `quiz ${i}: missing question/why`);
  assert(q.o.length >= 2 && q.a >= 0 && q.a < q.o.length, `quiz ${i}: bad options/answer`);
});
C.forEach((c, i) => assert(c.w >= 1 && c.w <= 12 && c.t && c.f, `card ${i}: bad card`));
console.log(`ok: ${Q.length} questions, ${C.length} cards`);
