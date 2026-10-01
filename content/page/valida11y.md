---
title: Accessibility & Validation
url: /valida11y/
description: How this site ensures accessibility compliance and code quality through automated validation.
layout: single
sitemap:
  priority: 0.3
---

## Accessibility

This site is designed to meet **WCAG 2.2 Level AA** accessibility standards.

### Features

- **Keyboard Navigation** - All interactive elements are accessible via keyboard
- **Screen Reader Support** - Semantic HTML with proper ARIA landmarks and labels
- **Color Contrast** - Text meets minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- **Touch Targets** - Interactive elements meet 44x44px minimum touch target size
- **Responsive Design** - Content adapts to all screen sizes and zoom levels
- **Reduced Motion** - Animations respect `prefers-reduced-motion` preference
- **Dark Mode** - Supports system color scheme preference

### Testing

Accessibility is checked on every commit using:

- [axe-core](https://github.com/dequelabs/axe-core) - Automated WCAG 2.2 AA testing of every page
- [Playwright](https://playwright.dev/) - Keyboard navigation, visible focus, and touch target size checks
- Manual testing with screen readers and keyboard navigation

## Validation

All code is validated locally before it can be committed, using [hugo-validator](https://github.com/thedavecarroll/hugo-validator), a validation pipeline I maintain for my Hugo sites.

### Build

- Hugo builds the site with warnings treated as errors, so deprecated templates and broken content never reach production

### HTML

- Validated against the HTML5 specification using [html-validate](https://html-validate.org/)
- Checks for proper document structure, valid attributes, and semantic markup

### CSS

- Validated using [Stylelint](https://stylelint.io/) with the SCSS standard configuration
- Ensures consistent formatting and catches common errors

### Layout

- Every page is checked at mobile and tablet widths for horizontal overflow and content escaping its container

### Links

- Internal links verified to exist
- External links checked for availability
- When an external site disappears, the link is replaced with an [archive.org](https://archive.org) snapshot where one exists, marked with **[archive]**, or shown as plain text when none does

## Continuous Integration

Validation runs automatically:

1. **Pre-commit hook** - The full pipeline runs before each commit and blocks the commit on any failure
2. **Build** - Cloudflare Pages builds the site from the `main` branch after changes are merged

Validation does not run on Cloudflare; nothing reaches `main` without passing locally first.

## Report an Issue

Found an accessibility barrier or validation issue? Please reach out on {{< influencer "thedavecarroll" "linkedin" >}} or {{< influencer "thedavecarroll" "bluesky" >}}.
