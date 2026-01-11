import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
  skipPaths: string[];
}

// Load configuration
function loadConfig(): Config {
  const configPath = path.join(process.cwd(), 'hugo-validator', 'hugo-validator.config.js');
  const defaults: Config = {
    skipPaths: ['/rss.xml', '/sitemap.xml', '/robots.txt'],
  };

  if (fs.existsSync(configPath)) {
    try {
      const userConfig = require(configPath);
      return { ...defaults, ...userConfig };
    } catch {
      return defaults;
    }
  }
  return defaults;
}

const config = loadConfig();
const TIMEOUT = 10000;

// Collect all internal pages by crawling
async function getAllPages(page: any, baseURL: string): Promise<string[]> {
  const visited = new Set<string>();
  const toVisit = ['/'];

  while (toVisit.length > 0) {
    const currentPath = toVisit.shift()!;
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    try {
      const response = await page.goto(`${baseURL}${currentPath}`, { timeout: TIMEOUT });
      if (!response || response.status() !== 200) continue;
    } catch {
      continue;
    }

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href'))
        .filter((href): href is string => href !== null);
    });

    for (const href of links) {
      if (href.startsWith('/') && !href.startsWith('//')) {
        const cleanPath = href.split('#')[0];
        if (!visited.has(cleanPath) && !toVisit.includes(cleanPath)) {
          toVisit.push(cleanPath);
        }
      }
    }
  }

  return Array.from(visited);
}

test.describe('Accessibility (WCAG 2.2)', () => {
  test('all pages pass WCAG 2.2 AA', async ({ page, baseURL }) => {
    test.setTimeout(600000); // 10 minutes - accessibility checks take time
    const allPages = await getAllPages(page, baseURL!);
    // Skip non-HTML files and configured skip paths
    const pages = allPages.filter(p => {
      if (p.endsWith('.xml') || p.endsWith('.rss') || p.endsWith('.json')) return false;
      if (config.skipPaths.some(skip => p.endsWith(skip))) return false;
      return true;
    });
    console.log(`Testing ${pages.length} pages for accessibility (skipped ${allPages.length - pages.length} non-HTML)`);

    const violations: { url: string; issues: any[] }[] = [];

    for (const currentPath of pages) {
      await page.goto(`${baseURL}${currentPath}`, { waitUntil: 'load' });

      const results = await new AxeBuilder({ page })
        .options({
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
          rules: {
            'target-size': { enabled: true },
          },
        })
        .analyze();

      if (results.violations.length > 0) {
        violations.push({ url: currentPath, issues: results.violations });
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map(v => {
          const issues = v.issues
            .map(i => `    [${i.id}] ${i.help} (${i.impact}) - ${i.nodes.length} element(s)`)
            .join('\n');
          return `  ${v.url}\n${issues}`;
        })
        .join('\n\n');

      expect(violations, `Accessibility violations:\n${report}`).toHaveLength(0);
    }

    console.log(`All ${pages.length} pages passed WCAG 2.2 AA`);
  });
});
