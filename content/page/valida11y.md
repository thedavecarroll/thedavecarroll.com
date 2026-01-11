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

Accessibility is validated on every commit using:

- [axe-core](https://github.com/dequelabs/axe-core) - Automated accessibility testing
- [Playwright](https://playwright.dev/) - Cross-browser testing including touch target validation
- Manual testing with screen readers and keyboard navigation

## Validation

All code is validated automatically before deployment.

### HTML

- Validated against HTML5 specification using [html-validate](https://html-validate.org/)
- Checks for proper document structure, valid attributes, and semantic markup

### CSS

- Validated using [Stylelint](https://stylelint.io/) with SCSS standard configuration
- Ensures consistent formatting and catches common errors

### Links

- Internal links verified to exist
- External links checked for availability
- Anchor links validated against page content

## Continuous Integration

Validation runs automatically:

1. **Pre-commit hooks** - All validators run before each commit
2. **Build process** - Hugo validates templates and content
3. **Deployment** - Cloudflare Pages builds with validation

## Report an Issue

Found an accessibility barrier or validation issue? Please reach out on {{< influencer "thedavecarroll" "linkedin" >}} or {{< influencer "thedavecarroll" "bluesky" >}}.
