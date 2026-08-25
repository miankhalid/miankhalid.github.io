'use strict';
const checks = [
  ['journey-order', require('./journey-order')],
  ['asset-size', require('./asset-size')],
  ['content-integrity', require('./content-integrity')],
  ['anchor-integrity', require('./anchor-integrity')],
  ['icon-coverage', require('./icon-coverage')],
  ['contrast', require('./contrast')],
  ['shared-controls', require('./shared-controls')],
  ['responsive-guard', require('./responsive-guard')],
  ['no-emoji', require('./no-emoji')],
  ['hardcoded-colors', require('./hardcoded-colors')]
];

let failed = 0;
for (const [name, run] of checks) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
    failed++;
  }
}
if (failed) {
  console.error(`\n${failed}/${checks.length} check(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} checks passed.`);
