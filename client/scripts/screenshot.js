import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const url = process.env.URL || 'http://localhost:3002/';
const outDir = path.resolve(process.cwd(), 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 },
];

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ args: ['--no-sandbox'] });
  } catch (error) {
    console.error('Error launching browser. Please run: npx playwright install chromium');
    console.log('Using existing screenshots (if available)...');
    
    // Check if screenshots already exist
    const existingScreenshots = sizes.map(size => [
      path.join(outDir, `${size.name}-light.png`),
      path.join(outDir, `${size.name}-dark.png`)
    ]).flat();
    
    const hasExisting = existingScreenshots.some(file => fs.existsSync(file));
    if (hasExisting) {
      console.log('Existing screenshots found in', outDir);
    } else {
      console.error('No existing screenshots found. Browser installation required.');
    }
    process.exit(1);
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  // Wait for server to be available (simple retry)
  const maxAttempts = 12;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
      if (resp && resp.ok()) break;
    } catch (e) {
      if (i === maxAttempts - 1) {
        console.error('Unable to reach', url);
        await browser.close();
        process.exit(2);
      }
      // wait a bit and retry
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  for (const size of sizes) {
    await page.setViewportSize({ width: size.width, height: size.height });
    // light theme
    await page.evaluate(() => document.documentElement.classList.remove('dark'))
    await page.waitForTimeout(400);
    const lightPath = path.join(outDir, `${size.name}-light.png`);
    await page.screenshot({ path: lightPath, fullPage: true });
    console.log('Saved', lightPath);

    // dark theme
    await page.evaluate(() => document.documentElement.classList.add('dark'))
    await page.waitForTimeout(400);
    const darkPath = path.join(outDir, `${size.name}-dark.png`);
    await page.screenshot({ path: darkPath, fullPage: true });
    console.log('Saved', darkPath);
  }

  await browser.close();
  console.log('Screenshots completed in', outDir);
})();
