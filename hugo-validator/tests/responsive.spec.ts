import { test, expect, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
  responsive: {
    wrapperSelector: string;
    spotCheckPages: string[];
  };
}

// Load configuration
function loadConfig(): Config {
  const configPath = path.join(process.cwd(), 'hugo-validator', 'hugo-validator.config.js');
  const defaults: Config = {
    responsive: {
      wrapperSelector: '.page-wrapper',
      spotCheckPages: ['/', '/posts/', '/about/'],
    },
  };

  if (fs.existsSync(configPath)) {
    try {
      const userConfig = require(configPath);
      return {
        responsive: { ...defaults.responsive, ...userConfig.responsive },
      };
    } catch {
      return defaults;
    }
  }
  return defaults;
}

const config = loadConfig();

const MOBILE_VIEWPORT = devices['iPhone 12'];
const TABLET_VIEWPORT = devices['iPad Mini'];
const TIMEOUT = 10000;

// Pages to test
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

      // Skip non-HTML
      const contentType = response.headers()['content-type'] || '';
      if (!contentType.includes('text/html')) continue;
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

test.describe('Responsive Layout', () => {
  test('no horizontal overflow on mobile', async ({ page, baseURL }) => {
    test.setTimeout(300000); // 5 minutes - crawling all pages takes time
    // Set mobile viewport
    await page.setViewportSize({
      width: MOBILE_VIEWPORT.viewport.width,
      height: MOBILE_VIEWPORT.viewport.height,
    });

    const allPages = await getAllPages(page, baseURL!);
    const overflowPages: { url: string; overflow: number }[] = [];
    let checkedCount = 0;

    for (const currentPath of allPages) {
      // Skip non-HTML pages (RSS feeds, XML files, etc.)
      if (currentPath.endsWith('.xml') || currentPath.endsWith('.rss') || currentPath.endsWith('.json')) {
        continue;
      }

      const response = await page.goto(`${baseURL}${currentPath}`, { waitUntil: 'load' });

      // Skip non-HTML content types
      const contentType = response?.headers()['content-type'] || '';
      if (!contentType.includes('text/html')) {
        continue;
      }

      checkedCount++;

      // Check if any content overflows horizontally
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const viewWidth = document.documentElement.clientWidth;
        return docWidth - viewWidth;
      });

      if (overflow > 0) {
        overflowPages.push({ url: currentPath, overflow });
      }
    }

    if (overflowPages.length > 0) {
      const report = overflowPages
        .map(p => `  ${p.url} (overflow: ${p.overflow}px)`)
        .join('\n');
      expect(overflowPages, `Pages with horizontal overflow:\n${report}`).toHaveLength(0);
    }

    console.log(`Checked ${checkedCount} pages for mobile overflow (skipped non-HTML)`);
  });

  test('content stays within page wrapper on mobile', async ({ page, baseURL }) => {
    await page.setViewportSize({
      width: MOBILE_VIEWPORT.viewport.width,
      height: MOBILE_VIEWPORT.viewport.height,
    });

    // Spot check key pages from config
    const pagesToCheck = config.responsive.spotCheckPages;
    const wrapperSelector = config.responsive.wrapperSelector;
    const violations: { url: string; elements: string[] }[] = [];

    for (const currentPath of pagesToCheck) {
      await page.goto(`${baseURL}${currentPath}`, { waitUntil: 'load' });

      // Find elements that extend beyond the page wrapper
      const overflowingElements = await page.evaluate((selector: string) => {
        const wrapper = document.querySelector(selector);
        if (!wrapper) return [];

        const wrapperRect = wrapper.getBoundingClientRect();
        const elements: string[] = [];

        // Check direct children and key containers
        const checkSelectors = `${selector} > *, .post-content *, .footer-icons *, .site-nav *`;
        document.querySelectorAll(checkSelectors).forEach(el => {
          const rect = el.getBoundingClientRect();
          // Allow 2px tolerance for borders/shadows
          if (rect.width > 0 && (rect.right > wrapperRect.right + 2 || rect.left < wrapperRect.left - 2)) {
            const tag = el.tagName.toLowerCase();
            const cls = el.className ? `.${el.className.toString().split(' ')[0]}` : '';
            elements.push(`${tag}${cls}`);
          }
        });

        return [...new Set(elements)].slice(0, 10); // Limit to first 10
      }, wrapperSelector);

      if (overflowingElements.length > 0) {
        violations.push({ url: currentPath, elements: overflowingElements });
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map(v => `  ${v.url}: ${v.elements.join(', ')}`)
        .join('\n');
      // Soft assertion - important but may have edge cases
      expect.soft(violations, `Elements extending beyond wrapper:\n${report}`).toHaveLength(0);
    }

    console.log(`Checked ${pagesToCheck.length} pages for content bounds`);
  });

  test('no horizontal overflow on tablet', async ({ page, baseURL }) => {
    test.setTimeout(300000); // 5 minutes - crawling all pages takes time
    await page.setViewportSize({
      width: TABLET_VIEWPORT.viewport.width,
      height: TABLET_VIEWPORT.viewport.height,
    });

    const allPages = await getAllPages(page, baseURL!);
    const overflowPages: { url: string; overflow: number }[] = [];

    for (const currentPath of allPages) {
      // Skip non-HTML pages (RSS feeds, XML files, etc.)
      if (currentPath.endsWith('.xml') || currentPath.endsWith('.rss') || currentPath.endsWith('.json')) {
        continue;
      }

      const response = await page.goto(`${baseURL}${currentPath}`, { waitUntil: 'load' });

      // Skip non-HTML content types
      const contentType = response?.headers()['content-type'] || '';
      if (!contentType.includes('text/html')) {
        continue;
      }

      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const viewWidth = document.documentElement.clientWidth;
        return docWidth - viewWidth;
      });

      if (overflow > 0) {
        overflowPages.push({ url: currentPath, overflow });
      }
    }

    if (overflowPages.length > 0) {
      const report = overflowPages
        .map(p => `  ${p.url} (overflow: ${p.overflow}px)`)
        .join('\n');
      expect(overflowPages, `Tablet pages with horizontal overflow:\n${report}`).toHaveLength(0);
    }

    console.log(`Checked ${allPages.length} pages for tablet overflow (skipped non-HTML)`);
  });
});
