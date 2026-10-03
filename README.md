# Dave's Technical Journal

This repo contains the raw content and framework for my blog, [Dave's Technical Journal](https://thedavecarroll.com).

## Build and Deployment

The site is built and deployed by Cloudflare Pages through its GitHub integration. Every push to `main` triggers a production build; pushes to other branches get a preview URL. Nothing deploys from a local machine.

Cloudflare build settings (these exist only in the Cloudflare dashboard, recorded here so they can be recreated):

| Setting | Value |
|---------|-------|
| Framework preset | Hugo |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| Root directory | `/` |
| Environment variable `HUGO_VERSION` | Match the local Hugo version (currently 0.166.0) |
| Environment variable `NODE_VERSION` | `24` |

Cloudflare only builds. No validation runs there; it runs locally before each commit (see Validation).

## Validation

Validation is provided by [hugo-validator](https://github.com/thedavecarroll/hugo-validator), installed from GitHub as the only dev dependency. This repo commits only `hugo-validator/hugo-validator.config.js`; the tests are synced from the package at run time.

The generated pre-commit hook runs the full pipeline on every commit: Hugo build (warnings are errors), stylelint, html-validate, and Playwright tests for links, responsive layout, interaction and WCAG 2.2 AA.

```bash
npm install
npx --no playwright install chromium
npx --no hugo-validator doctor     # Check the toolchain
npm run validate                   # All stages, skipping ones whose inputs are unchanged
npm run validate -- --full         # All stages
npm test                           # Playwright tests only
```

A full run takes about a minute (174 pages, around 290 external links). A few external links report certificate or 403 warnings; they are warnings by design, not failures.

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/new-post.sh [-s section] [-b] [-n] <slug>` | Create a draft article from the archetype. Section is `powershell` (default) or `blog`. `-b` makes a page bundle, `-n` sets `toc: false`. The front matter date is the time of creation. Run with no arguments for usage. |
| `scripts/prune-deployments.sh [--dry-run]` | Delete old Cloudflare Pages deployments, which Pages otherwise keeps forever. Keeps the newest 3 production deployments and the newest deployment of each preview branch. Needs `~/.config/cloudflare/pages.env` with `CLOUDFLARE_API_TOKEN` (Pages Edit) and `CLOUDFLARE_ACCOUNT_ID`. Run with `--dry-run` first. |
| `scripts/check-dead-links.js` | Repair helper for dead external links: records them in `data/dead_links.yaml`. Not part of validation. |

## Comments

Comments use [giscus](https://giscus.app), backed by GitHub Discussions in this repo, category "Site Comments", mapped by pathname. The repo and category IDs are in `hugo.yaml` under `params.comments.giscus`; `giscus.json` restricts the widget to the production origin and the `*.thedavecarroll-com.pages.dev` preview URLs.

## License

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

The content of this site is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].
You may share and adapt it with attribution, for non-commercial purposes, under the same licence.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
