'use strict';
const assert = require('assert');
const { read, htmlPages } = require('./lib');

// Real emoji ranges + emoji presentation selector. The Misc Symbols/Dingbats block
// (2600-27BF) is included since it holds real emoji (checkmarks, hazard signs, etc),
// but the star (2605) is explicitly allowed: this repo uses it as a plain decorative
// glyph ("★ THE ONLY FILE YOU EDIT ★"), not an emoji.
const STAR = '★';
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{2B00}-\u{2BFF}]|️/u;

function run() {
  const files = ['app.js', 'content.js', 'styles.css', ...htmlPages()];
  const hits = [];
  for (const f of files) {
    const text = read(f).split(STAR).join('');
    if (EMOJI_RE.test(text)) hits.push(f);
  }
  assert.strictEqual(hits.length, 0, `emoji found in: ${hits.join(', ')} (AGENTS.md: no emojis unless explicitly asked)`);
}

if (require.main === module) {
  try {
    run();
    console.log('PASS no-emoji');
  } catch (e) {
    console.error('FAIL no-emoji:', e.message);
    process.exit(1);
  }
}
module.exports = run;
