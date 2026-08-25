'use strict';
// OPTIONAL / MANUAL ONLY: not wired into run-all.js or the pre-commit hook because
// it needs network access, which shouldn't be a hard dependency of `git commit`.
// Run by hand: node .githooks/checks/iconify-names.js
const https = require('https');
const { read, htmlPages } = require('./lib');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'miankhalid.github.io-icon-check' } }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function collectIconNames() {
  const names = new Set();
  for (const page of htmlPages()) {
    for (const m of read(page).matchAll(/data-icon="([^"]+)"/g)) names.add(m[1]);
  }
  for (const m of read('app.js').matchAll(/'([\w-]+:[\w-]+)'/g)) names.add(m[1]);
  return [...names];
}

async function run() {
  const names = collectIconNames();
  const bad = [];
  for (const name of names) {
    const [set, icon] = name.split(':');
    if (!set || !icon) {
      bad.push(`${name} (malformed, expected "set:name")`);
      continue;
    }
    try {
      const res = await fetchJson(`https://api.iconify.design/${set}.json?icons=${icon}`);
      if (!res.icons || !res.icons[icon]) bad.push(name);
    } catch (e) {
      console.warn(`WARN: could not verify "${name}" (${e.message}), skipping`);
    }
  }
  if (bad.length) {
    console.error('FAIL iconify-names: unknown icon name(s), will silently render blank:', bad.join(', '));
    process.exitCode = 1;
  } else {
    console.log('PASS iconify-names');
  }
}

if (require.main === module) run();
module.exports = run;
