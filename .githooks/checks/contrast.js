'use strict';
const assert = require('assert');
const { read } = require('./lib');

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = [...hex].map((c) => c + c).join('');
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function parseRgba(str) {
  const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\)/);
  if (!m) throw new Error(`unparseable color: ${str}`);
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] !== undefined ? Number(m[4]) : 1];
}
function colorToRgba(str) {
  str = str.trim();
  if (str.startsWith('#')) return [...hexToRgb(str), 1];
  return parseRgba(str);
}
function blend(fg, bg) {
  const [fr, fg_, fb, fa] = fg;
  const [br, bgc, bb] = bg;
  return [fr * fa + br * (1 - fa), fg_ * fa + bgc * (1 - fa), fb * fa + bb * (1 - fa)];
}
function relLuminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(c1, c2) {
  const l1 = relLuminance(c1);
  const l2 = relLuminance(c2);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function run() {
  const css = read('docs/journey.html');

  const rootVars = {};
  for (const m of css.matchAll(/--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/g)) rootVars[m[1]] = m[2];

  const fills = {}; // fillName -> hex
  for (const m of css.matchAll(/\.c-(\w+)\{background:(?:var\(--([\w-]+)\)|(#[0-9a-fA-F]{3,8}))/g)) {
    fills[m[1]] = m[2] ? rootVars[m[2]] : m[3];
  }
  assert.ok(Object.keys(fills).length > 0, 'no .c-* fill rules found in journey.html');

  const inkBody = css.match(/\.ink p,\.ink li[^{]*\{color:(#[0-9a-fA-F]{3,8})\}/);
  const lightBody = css.match(/\.light p,\.light li\{color:(rgba?\([^)]+\))\}/);
  assert.ok(inkBody, '.ink body text color rule not found');
  assert.ok(lightBody, '.light body text color rule not found');
  const textColor = { ink: colorToRgba(inkBody[1]), light: colorToRgba(lightBody[1]) };

  const combos = new Set();
  for (const m of css.matchAll(/<li class="card (ink|light) c-(\w+)"/g)) combos.add(`${m[1]}:${m[2]}`);
  assert.ok(combos.size > 0, 'no journey cards found to check');

  const failures = [];
  for (const combo of combos) {
    const [textClass, fillName] = combo.split(':');
    const fillHex = fills[fillName];
    if (!fillHex) {
      failures.push(`unknown fill "c-${fillName}" (no .c-${fillName}{background:...} rule)`);
      continue;
    }
    const bg = hexToRgb(fillHex);
    const fg = blend(textColor[textClass], bg);
    const ratio = contrastRatio(fg, bg);
    if (ratio < 4.5) {
      failures.push(
        `"${textClass}" text on "c-${fillName}" (${fillHex}) = ${ratio.toFixed(2)}:1, below WCAG AA 4.5:1 for body text`
      );
    }
  }
  assert.strictEqual(failures.length, 0, failures.join('; '));
}

if (require.main === module) {
  try {
    run();
    console.log('PASS contrast');
  } catch (e) {
    console.error('FAIL contrast:', e.message);
    process.exit(1);
  }
}
module.exports = run;
