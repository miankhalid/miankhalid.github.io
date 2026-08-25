'use strict';
const assert = require('assert');
const { read } = require('./lib');

function run() {
  const js = read('app.js');
  const m = js.match(/function buildShapes\(\)[\s\S]*?\n  \}/);
  assert.ok(m, 'buildShapes() not found in app.js');
  const hexHits = m[0].match(/#[0-9a-fA-F]{3,6}/g) || [];
  assert.strictEqual(
    hexHits.length,
    0,
    `buildShapes() has hardcoded hex color(s) ${hexHits.join(', ')}, must read from CSS vars via getComputedStyle to stay theme-aware`
  );
}

if (require.main === module) {
  try {
    run();
    console.log('PASS hardcoded-colors');
  } catch (e) {
    console.error('FAIL hardcoded-colors:', e.message);
    process.exit(1);
  }
}
module.exports = run;
