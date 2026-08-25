'use strict';
const assert = require('assert');
const { read } = require('./lib');

function verKey(id) {
  // "v11-2" -> [11,2], "v9" -> [9,0], "v10-1" -> [10,1]
  const m = id.match(/^v(\d+)(?:-(\d+))?$/);
  if (!m) throw new Error(`bad journey id format: ${id}`);
  return [Number(m[1]), m[2] ? Number(m[2]) : 0];
}
function cmp(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

function run() {
  const html = read('docs/journey.html');

  const railBlock = html.match(/<div class="rail">([\s\S]*?)<\/div>/);
  assert.ok(railBlock, 'rail block not found in journey.html');
  const railIds = [...railBlock[1].matchAll(/href="#(v[\w-]+)"/g)].map((m) => m[1]);
  const currentCount = (railBlock[1].match(/rail-item current/g) || []).length;
  assert.strictEqual(currentCount, 1, `expected exactly 1 "current" rail item, found ${currentCount}`);
  assert.ok(
    railBlock[1].trimStart().startsWith('<a class="rail-item current"'),
    'the "current" rail item must be first (leftmost/newest)'
  );

  const cardIds = [...html.matchAll(/<li class="card [^"]*" id="(v[\w-]+)">/g)].map((m) => m[1]);

  const dupes = cardIds.filter((id, i) => cardIds.indexOf(id) !== i);
  assert.strictEqual(dupes.length, 0, `duplicate journey card id(s): ${[...new Set(dupes)].join(', ')}`);

  for (let i = 1; i < cardIds.length; i++) {
    assert.ok(
      cmp(verKey(cardIds[i - 1]), verKey(cardIds[i])) < 0,
      `journey cards out of chronological order: "${cardIds[i - 1]}" appears before "${cardIds[i]}"`
    );
  }

  const railSet = [...railIds].sort();
  const cardSet = [...cardIds].sort();
  assert.deepStrictEqual(railSet, cardSet, 'rail dots and timeline cards do not reference the same set of ids');

  const railNewestFirst = [...railIds].reverse();
  assert.deepStrictEqual(
    railNewestFirst,
    cardIds,
    'rail order (reversed) does not match card order; rail must be newest-first, cards oldest-first'
  );
}

if (require.main === module) {
  try {
    run();
    console.log('PASS journey-order');
  } catch (e) {
    console.error('FAIL journey-order:', e.message);
    process.exit(1);
  }
}
module.exports = run;
