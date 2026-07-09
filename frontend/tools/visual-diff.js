import puppeteer from 'puppeteer-core';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import path from 'path';

const BASELINE = path.resolve('screenshots', 'baseline.png');
const ACTUAL = path.resolve('screenshots', 'actual.png');
const DIFF = path.resolve('screenshots', 'diff.png');
const URL = process.env.VISUAL_DIFF_URL || 'http://localhost:5175/login';
const BROWSER_PATH = process.env.VISUAL_DIFF_CHROME_PATH || process.env.CHROME_PATH || process.env.CHROMIUM_PATH;

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function findBrowserExecutable() {
  if (BROWSER_PATH && fs.existsSync(BROWSER_PATH)) {
    return BROWSER_PATH;
  }

  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

(async () => {
  await ensureDir('screenshots');
  console.log('Opening browser...');
  const executablePath = findBrowserExecutable();
  if (!executablePath) {
    throw new Error('No local Chrome/Edge browser found. Set VISUAL_DIFF_CHROME_PATH to a valid browser executable.');
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    console.log('Loading', URL);
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
    // wait a bit for animations
    await page.waitForTimeout(500);

    // capture the right-panel only if selector exists
    const selector = 'div.max-w-md';
    const el = await page.$(selector);
    if (el) {
      await el.screenshot({ path: ACTUAL });
    } else {
      await page.screenshot({ path: ACTUAL, fullPage: true });
    }
    console.log('Saved actual screenshot to', ACTUAL);

    if (!fs.existsSync(BASELINE)) {
      fs.copyFileSync(ACTUAL, BASELINE);
      console.log('Baseline did not exist — created baseline at', BASELINE);
      console.log('Place your maquette file at', BASELINE, 'and re-run the script to compare.');
      process.exit(0);
    }

    // read PNGs
    const img1 = PNG.sync.read(fs.readFileSync(BASELINE));
    const img2 = PNG.sync.read(fs.readFileSync(ACTUAL));

    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    if (img1.width !== img2.width || img1.height !== img2.height) {
      console.warn('Baseline and actual have different sizes — comparing on the full canvas with padding.');
    }

    const padded1 = new PNG({ width, height });
    const padded2 = new PNG({ width, height });
    PNG.bitblt(img1, padded1, 0, 0, img1.width, img1.height, 0, 0);
    PNG.bitblt(img2, padded2, 0, 0, img2.width, img2.height, 0, 0);

    const diff = new PNG({ width, height });
    const mismatch = pixelmatch(padded1.data, padded2.data, diff.data, width, height, { threshold: 0.12 });
    fs.writeFileSync(DIFF, PNG.sync.write(diff));
    const total = width * height;
    const ratio = (mismatch / total) * 100;
    console.log(`Pixel mismatch: ${mismatch} pixels (${ratio.toFixed(2)}%)`);
    console.log('Diff image saved to', DIFF);
  } catch (err) {
    console.error('Visual diff failed:', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
