---
title: Privacy Statement
description: "What happens when you visit: no cookies, Cloudflare's cookieless analytics, a theme choice kept in your browser, and giscus comments through GitHub."
url: /privacy/
date: 2026-10-10
lastmod: 2026-10-10
layout: page
toc: false
readingTime: false
comments: false
---

### Your Privacy on My Site

This site is my technical journal.
It sets no cookies and has no forms; the only place you can share anything is the comments, through your own GitHub account.

### What Happens When You Visit

1. **Cloudflare Web Analytics** counts the page view and your rough location, without cookies.
2. **Theme Preference**, if you use the light/dark toggle, is remembered in your browser.
3. **giscus Comments**, on articles only, load from giscus.app when you scroll near them, and show the matching GitHub Discussion.

The third parties involved are Cloudflare, which hosts this site and provides the analytics,
and giscus with GitHub, which provide the comments.

If you disable JavaScript, the analytics beacon and the comments don't run and nothing is saved in your browser.
The articles read the same, but the site stays in light mode and the light/dark toggle is hidden.

### Technical Specifics

#### Cloudflare Web Analytics

- Keeps track of anonymous usage data
- Doesn't use cookies
- Uses a JavaScript beacon (`beacon.min.js`) which some privacy-focused browsers may block
  - If you want to block it or all scripts on this site, you won't hurt my feelings.
- Their privacy policy: [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)

#### Theme Preference

- The light/dark toggle saves your choice in your browser (`localStorage`) so it sticks between visits
- It is never sent anywhere, and clearing your browser data removes it

#### giscus Comments

- Comments are stored as replies in this site's GitHub Discussions, under "Site Comments"
- Reading them sends a request to giscus.app, which fetches the discussion from GitHub
- To comment or react, you sign in with GitHub through the giscus app; giscus then keeps a session token (`giscus-session`) in your browser's `localStorage` until you sign out
- You can also comment on GitHub directly, without signing in to giscus
- What you post is public on GitHub, under your GitHub account
- Their privacy policies: [giscus](https://github.com/giscus/giscus/blob/main/PRIVACY-POLICY.md) and [GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)

### Changes

I might update this page occasionally.
When I do, you'll find the latest version right here.
