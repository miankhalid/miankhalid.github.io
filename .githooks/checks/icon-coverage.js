'use strict';
const assert = require('assert');
const vm = require('vm');
const { read } = require('./lib');

function extractTechIcons() {
  const js = read('app.js');
  const m = js.match(/const TECH_ICONS = (\{[\s\S]*?\n  \});/);
  assert.ok(m, 'TECH_ICONS object not found in app.js');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`__x = ${m[1]}`, sandbox);
  return sandbox.__x;
}

function loadProjects() {
  const code = read('content.js');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'content.js' });
  return sandbox.window.SITE.projects;
}

function run() {
  const TECH_ICONS = extractTechIcons();
  const projects = loadProjects();
  const missing = [];
  for (const p of projects) {
    for (const tag of p.tags || []) {
      if (!TECH_ICONS[tag]) missing.push(`"${tag}" (used by ${p.title})`);
    }
  }
  assert.strictEqual(
    missing.length,
    0,
    `tag(s) with no TECH_ICONS entry in app.js, icon silently renders blank: ${[...new Set(missing)].join(', ')}`
  );
}

if (require.main === module) {
  try {
    run();
    console.log('PASS icon-coverage');
  } catch (e) {
    console.error('FAIL icon-coverage:', e.message);
    process.exit(1);
  }
}
module.exports = run;
