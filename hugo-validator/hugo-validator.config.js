// hugo-validator configuration
// See: https://github.com/thedavecarroll/hugo-validator

module.exports = {
  // Required: Your site's URL (used to skip self-referential links)
  siteUrl: 'https://thedavecarroll.com/',

  // Ports to kill before validation (dev servers that might conflict)
  portsToKill: [1313, 3000],

  // External domains to skip in link checking
  // Key is domain, value is reason for skipping
  // skipExternalDomains: Defaults provided by hugo-validator, add site-specific overrides here
  skipExternalDomains: {
    // Example: 'example.com': 'Custom reason',
  },

  // CSS validation: glob pattern for SCSS/CSS files
  cssPattern: 'themes/*/assets/scss/**/*.scss',

  // Paths to skip in accessibility and link tests
  skipPaths: ['/rss.xml', '/sitemap.xml', '/robots.txt'],

  // Responsive testing configuration
  responsive: {
    // CSS selector for your main page wrapper
    wrapperSelector: '.tj-page',
    // Pages to spot-check for responsive layout issues
    spotCheckPages: ['/', '/powershell/', '/about/'],
  },

  // Interaction testing configuration
  interaction: {
    // CSS selector for main navigation links
    navSelector: '.tj-nav a',
    // Selectors for touch target size testing
    touchTargetSelectors: [
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      'nav a',
    ],
  },

  // Report settings
  reportRetention: 8,                    // Number of reports to keep
  reportFilename: 'VALIDATION-REPORT.md', // Main report filename
  reportsDir: 'hugo-validator/reports',  // Directory for timestamped reports

  // Test server settings
  testServerPort: 3000,
};
