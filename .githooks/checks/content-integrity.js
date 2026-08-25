'use strict';
const assert = require('assert');
const vm = require('vm');
const { read, exists, ROOT } = require('./lib');

function loadSite() {
  const code = read('content.js');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'content.js' });
  return sandbox.window.SITE;
}

function run() {
  const SITE = loadSite();
  assert.ok(SITE, 'window.SITE not found after evaluating content.js');
  assert.ok(Array.isArray(SITE.projects) && SITE.projects.length > 0, 'SITE.projects must be a non-empty array');

  const titles = [];
  for (const p of SITE.projects) {
    const who = p.title || '(untitled project)';
    assert.ok(typeof p.title === 'string' && p.title.trim(), `${who}: title must be a non-empty string`);
    assert.ok(typeof p.blurb === 'string' && p.blurb.trim(), `${who}: blurb must be a non-empty string`);
    assert.ok(Array.isArray(p.tags) && p.tags.length > 0, `${who}: tags must be a non-empty array`);
    assert.ok(Array.isArray(p.links), `${who}: links must be an array (can be empty)`);
    assert.ok(typeof p.image === 'string' && p.image.trim(), `${who}: image must be a non-empty string`);
    assert.ok(exists(p.image), `${who}: image path "${p.image}" does not exist on disk`);
    titles.push(p.title);
  }
  const dupes = titles.filter((t, i) => titles.indexOf(t) !== i);
  assert.strictEqual(dupes.length, 0, `duplicate project title(s): ${[...new Set(dupes)].join(', ')}`);
}

if (require.main === module) {
  try {
    run();
    console.log('PASS content-integrity');
  } catch (e) {
    console.error('FAIL content-integrity:', e.message);
    process.exit(1);
  }
}
module.exports = run;
