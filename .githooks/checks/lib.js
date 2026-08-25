'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}
function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}
function htmlPages() {
  const pages = ['index.html'];
  if (fs.existsSync(path.join(ROOT, 'docs'))) {
    for (const f of fs.readdirSync(path.join(ROOT, 'docs'))) {
      if (f.endsWith('.html')) pages.push('docs/' + f);
    }
  }
  return pages;
}
module.exports = { fs, path, ROOT, read, exists, htmlPages };
