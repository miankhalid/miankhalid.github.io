'use strict';
const assert = require('assert');
const { read, htmlPages } = require('./lib');

function run() {
  for (const page of htmlPages()) {
    const html = read(page);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    // strip <code>...</code> spans first: those contain illustrative markup snippets
    // (e.g. docs showing `<a href="#section">`), not real navigable links.
    const withoutCode = html.replace(/<code>[\s\S]*?<\/code>/g, '');
    const hrefs = [...withoutCode.matchAll(/href="#([^"]+)"/g)]
      .map((m) => m[1])
      .filter((h) => h && h !== 'top'); // "#top" is a browser-native jump, not a real element id here
    for (const h of hrefs) {
      assert.ok(ids.has(h), `${page}: href="#${h}" has no matching id="${h}" element in the same file`);
    }
  }
}

if (require.main === module) {
  try {
    run();
    console.log('PASS anchor-integrity');
  } catch (e) {
    console.error('FAIL anchor-integrity:', e.message);
    process.exit(1);
  }
}
module.exports = run;
