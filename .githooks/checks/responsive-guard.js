'use strict';
const assert = require('assert');
const { fs, path, ROOT, read, htmlPages } = require('./lib');

function run() {
  for (const page of htmlPages()) {
    const html = read(page);
    const isDocsPage = page.startsWith('docs/');

    // AGENTS.md's "new page checklist" mandates this guard for every future page under docs/.
    // index.html predates that rule and has no <pre> blocks, so it's not required to carry it.
    if (isDocsPage) {
      assert.ok(
        /html,\s*body\s*\{[^}]*max-width:100%[^}]*overflow-x:hidden/.test(html) ||
          /html,\s*body\s*\{[^}]*overflow-x:hidden[^}]*max-width:100%/.test(html),
        `${page}: missing the page-level horizontal-scroll guard (html,body{max-width:100%;overflow-x:hidden})`
      );
    }

    if (/<pre[\s>]/.test(html)) {
      assert.ok(
        /pre\s*\{[^}]*max-width:100%[^}]*overflow-x:auto/.test(html) ||
          /pre\s*\{[^}]*overflow-x:auto[^}]*max-width:100%/.test(html),
        `${page}: has <pre> block(s) but no pre{max-width:100%;overflow-x:auto} guard, will overflow on mobile`
      );
    }

    if (/class="rail-item/.test(html)) {
      const m = html.match(/\.rail-item\s*\{[^}]*width:([^;}\s]+)/);
      assert.ok(m, `${page}: .rail-item has no fixed width rule, connector lines will drift off-center`);
      assert.ok(
        /^\d+(\.\d+)?px$/.test(m[1]),
        `${page}: .rail-item width is "${m[1]}", must be a fixed px value (not %/auto) for dot-center connector math`
      );
    }
  }
}

if (require.main === module) {
  try {
    run();
    console.log('PASS responsive-guard');
  } catch (e) {
    console.error('FAIL responsive-guard:', e.message);
    process.exit(1);
  }
}
module.exports = run;
