import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const url = process.env.URL || 'http://localhost:3002/';
const outDir = path.resolve(process.cwd(), 'a11y');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ args: ['--no-sandbox'] });
  } catch (error) {
    console.error('Error launching browser. Please run: npx playwright install chromium');
    console.log('Using existing a11y artifacts (if available)...');
    
    // Check if artifacts already exist
    const summaryPath = path.join(outDir, 'summary.json');
    const reportPath = path.join(outDir, 'axe-report.json');
    if (fs.existsSync(summaryPath) && fs.existsSync(reportPath)) {
      console.log('Existing accessibility reports found in', outDir);
    } else {
      console.error('No existing accessibility reports found. Browser installation required.');
    }
    process.exit(1);
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
  } catch (e) {
    console.error('Unable to reach', url);
    await browser.close();
    process.exit(2);
  }

  // Inject axe-core from CDN and run it in-page. This avoids adding axe packages to npm.
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js' });
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
  });
  const outFile = path.join(outDir, 'axe-report.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  // write a small summary
  const summary = {
    violations: results.violations.length,
    incomplete: results.incomplete.length,
    passes: results.passes.length,
  };
  fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log('Axe report written to', outFile);

  await browser.close();
})();
