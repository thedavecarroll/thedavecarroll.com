#!/usr/bin/env node
// Print the résumé page to static/resume/resume.pdf.
//
//   node scripts/resume-pdf.js [--drafts] [--a4]
//
// Hugo cannot make a PDF and Cloudflare's build only runs Hugo, so the PDF is
// made here and committed. Run this after changing data/resume.yaml, then
// commit the PDF with the change.
//
// It builds the site into a temporary folder, opens /resume/ in the Chromium
// that hugo-validator installs, and prints it with the page's print styles.
//
//   --drafts   build draft pages too (while the résumé is still a draft)
//   --a4       A4 paper. The default is US Letter.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const unknown = args.filter((arg) => !['--drafts', '--a4'].includes(arg));
if (unknown.length > 0) {
  console.error(`resume-pdf: unknown option ${unknown.join(' ')}`);
  console.error('usage: node scripts/resume-pdf.js [--drafts] [--a4]');
  process.exit(2);
}

const root = path.join(__dirname, '..');
const output = path.join(root, 'static', 'resume', 'resume.pdf');

function fail(message) {
  console.error(`resume-pdf: ${message}`);
  process.exit(1);
}

// Playwright belongs to hugo-validator, not to this site's package.json
let chromium;
try {
  const playwright = require.resolve('@playwright/test', {
    paths: [path.join(root, 'node_modules', 'hugo-validator'), root],
  });
  ({ chromium } = require(playwright));
} catch {
  fail('Playwright was not found. Run: npm ci');
}

const site = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-pdf-'));
// Also on failure: fail() exits the process
process.on('exit', () => fs.rmSync(site, { recursive: true, force: true }));

(async () => {
  const hugoArgs = ['--quiet', '--destination', site];
  if (args.includes('--drafts')) hugoArgs.push('--buildDrafts');
  const build = spawnSync('hugo', hugoArgs, { cwd: root, stdio: 'inherit' });
  if (build.error) fail(`hugo could not be run: ${build.error.message}`);
  if (build.status !== 0) fail('the Hugo build failed');

  const page = path.join(site, 'resume', 'index.html');
  if (!fs.existsSync(page)) {
    fail('the build has no /resume/ page. If it is still a draft, add --drafts');
  }

  const browser = await chromium.launch();
  try {
    const tab = await browser.newPage();
    await tab.goto(`file://${page}`);
    await tab.emulateMedia({ media: 'print' });
    fs.mkdirSync(path.dirname(output), { recursive: true });
    await tab.pdf({ path: output, format: args.includes('--a4') ? 'A4' : 'Letter', preferCSSPageSize: true });
  } finally {
    await browser.close();
  }

  const size = Math.round(fs.statSync(output).size / 1024);
  console.log(`Wrote ${path.relative(root, output)} (${size} KB)`);
})()
  .catch((error) => fail(error.message));
