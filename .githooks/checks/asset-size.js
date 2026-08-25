'use strict';
const assert = require('assert');
const { fs, path, ROOT } = require('./lib');

const CEILING_BYTES = 400 * 1024; // 400KB, generous vs the current 15-100KB norm
const IMG_EXT = /\.(jpe?g|png|webp)$/i;

function run() {
  const dir = path.join(ROOT, 'assets', 'projects');
  const over = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir)) {
      if (!IMG_EXT.test(f)) continue;
      const size = fs.statSync(path.join(dir, f)).size;
      if (size > CEILING_BYTES) over.push(`assets/projects/${f} (${Math.round(size / 1024)}KB)`);
    }
  }
  const assetsDir = path.join(ROOT, 'assets');
  for (const f of fs.readdirSync(assetsDir)) {
    if (!IMG_EXT.test(f)) continue;
    const full = path.join(assetsDir, f);
    if (fs.statSync(full).isDirectory()) continue;
    const size = fs.statSync(full).size;
    if (size > CEILING_BYTES) over.push(`assets/${f} (${Math.round(size / 1024)}KB)`);
  }
  assert.strictEqual(
    over.length,
    0,
    `image(s) over ${CEILING_BYTES / 1024}KB, resize (sips -Z 900) + convert to webp (cwebp -q 80) first: ${over.join(', ')}`
  );
}

if (require.main === module) {
  try {
    run();
    console.log('PASS asset-size');
  } catch (e) {
    console.error('FAIL asset-size:', e.message);
    process.exit(1);
  }
}
module.exports = run;
