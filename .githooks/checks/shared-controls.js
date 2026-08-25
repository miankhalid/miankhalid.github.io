'use strict';
const assert = require('assert');
const { fs, ROOT, read, htmlPages } = require('./lib');

function stripStyleTags(html) {
  return [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
}

function run() {
  // .theme-toggle / .fab CSS rules must live only in assets/controls.css, never redeclared.
  const controlsCss = read('assets/controls.css');
  assert.ok(/\.theme-toggle\s*\{/.test(controlsCss), 'assets/controls.css missing .theme-toggle rule');
  assert.ok(/\.fab\s*\{/.test(controlsCss), 'assets/controls.css missing .fab rule');

  const siteCss = read('styles.css');
  assert.ok(!/\.theme-toggle\s*\{/.test(siteCss), 'styles.css redeclares .theme-toggle, should live only in controls.css');
  assert.ok(!/\.fab\s*\{/.test(siteCss), 'styles.css redeclares .fab, should live only in controls.css');

  for (const page of htmlPages()) {
    const html = read(page);
    const inlineStyle = stripStyleTags(html);
    assert.ok(
      !/\.theme-toggle\s*\{/.test(inlineStyle),
      `${page}: redeclares .theme-toggle in an inline <style> block, should load controls.css instead`
    );
    // .fab{z-index:N} is an allowed per-page override (AGENTS.md: keep .fab above a sticky header);
    // any other property redeclared here is not.
    for (const m of inlineStyle.matchAll(/\.fab\s*\{([^}]*)\}/g)) {
      assert.ok(
        /^z-index:\d+;?$/.test(m[1].trim()),
        `${page}: .fab redeclared with more than a z-index override ("${m[1].trim()}"), should load controls.css instead`
      );
    }

    assert.ok(/href="[^"]*assets\/controls\.css"/.test(html), `${page}: does not load assets/controls.css`);
    assert.ok(/src="[^"]*assets\/controls\.js"/.test(html), `${page}: does not load assets/controls.js`);
    assert.ok(
      /<button[^>]*id="theme-toggle"[^>]*class="theme-toggle"[^>]*>|<button[^>]*class="theme-toggle"[^>]*id="theme-toggle"[^>]*>/.test(
        html
      ),
      `${page}: missing standard #theme-toggle.theme-toggle button markup`
    );
    assert.ok(
      /<button[^>]*id="fab"[^>]*class="fab"[^>]*>|<button[^>]*class="fab"[^>]*id="fab"[^>]*>/.test(html),
      `${page}: missing standard #fab.fab button markup`
    );

    for (const size of ['32', '16']) {
      assert.ok(
        new RegExp(`favicon-${size}\\.png`).test(html),
        `${page}: missing favicon-${size}.png link tag`
      );
    }
    assert.ok(/apple-touch-icon\.png/.test(html), `${page}: missing apple-touch-icon.png link tag`);
  }
}

if (require.main === module) {
  try {
    run();
    console.log('PASS shared-controls');
  } catch (e) {
    console.error('FAIL shared-controls:', e.message);
    process.exit(1);
  }
}
module.exports = run;
