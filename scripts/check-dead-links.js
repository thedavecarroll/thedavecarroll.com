#!/usr/bin/env node
// Check archive.org Wayback Machine for snapshots of dead links
// Usage: node scripts/check-dead-links.js

const fs = require('fs');
const path = require('path');

const DEAD_LINKS = [
  'https://github.com/PowerShell/PowerShell-RFC/blob/master/5-Final/RFC0029-Support-Experimental-Features.md',
  'https://github.com/PowerShell/PowerShell-RFC/blob/master/5-Final/RFC0029-Support-Experimental-Features.md#module-experimental-feature',
  'https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions',
  'https://support.google.com/analytics/answer/9744165',
  'https://www.oracle.com/corporate/acquisitions/dyn/technologies/enterprise-customer-faq.html',
  'https://ntsystems.it/post/converting-powershell-help-a-website',
  'https://events.devopscollective.org/OnRamp/Scholarship/',
  'https://events.devopscollective.org/event/powershell-devops-global-summit/',
  'https://www.learnpwsh.com/change-powershells-tab-complete-behavior/',
  'https://www.planetpowershell.com/feed',
  'https://www.youtube.com/@RMCRetro',
];

async function checkWaybackMachine(url) {
  const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.archived_snapshots?.closest?.available) {
      return {
        original: url,
        archive: data.archived_snapshots.closest.url,
        timestamp: data.archived_snapshots.closest.timestamp,
      };
    }
    return { original: url, archive: null };
  } catch (error) {
    console.error(`Error checking ${url}:`, error.message);
    return { original: url, archive: null, error: error.message };
  }
}

async function main() {
  console.log('Checking archive.org for dead link snapshots...\n');

  const results = [];

  for (const url of DEAD_LINKS) {
    process.stdout.write(`Checking: ${url.substring(0, 60)}... `);
    const result = await checkWaybackMachine(url);

    if (result.archive) {
      console.log('FOUND');
    } else {
      console.log('NOT FOUND');
    }

    results.push(result);

    // Rate limit to be nice to archive.org
    await new Promise(r => setTimeout(r, 500));
  }

  // Generate YAML output
  console.log('\n--- YAML Output for data/dead_links.yaml ---\n');

  for (const result of results) {
    console.log(`- original: "${result.original}"`);
    if (result.archive) {
      console.log(`  archive: "${result.archive}"`);
    } else {
      console.log(`  archive: null`);
    }
    console.log('');
  }

  // Write to data file
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let yaml = '# Dead external links and their archive.org snapshots\n';
  yaml += '# Used by layouts/_default/_markup/render-link.html\n\n';

  for (const result of results) {
    yaml += `- original: "${result.original}"\n`;
    if (result.archive) {
      yaml += `  archive: "${result.archive}"\n`;
    } else {
      yaml += `  archive: null\n`;
    }
    yaml += '\n';
  }

  const outputPath = path.join(dataDir, 'dead_links.yaml');
  fs.writeFileSync(outputPath, yaml);
  console.log(`\nWritten to: ${outputPath}`);
}

main().catch(console.error);
