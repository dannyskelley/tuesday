---
name: Netlify deploys from a Replit-generated lockfile
description: Lockfile/registry and CVE-block quirks when this repo is built on Netlify vs Replit
---

- Replit's npm proxy writes `http://package-firewall.replit.local/npm/...` into `package-lock.json` `resolved` fields. Netlify can't reach it and the build fails with ENOTFOUND.
  **How to apply:** after any `npm install` here, before pushing for a Netlify deploy, rewrite: `sed -i 's|http://package-firewall.replit.local/npm/|https://registry.npmjs.org/|g' package-lock.json`.
- Replit's firewall blocks CVE-flagged tarballs (403). This repo needed `overrides` in package.json (liquidjs, shell-quote, handlebars) and `npm-run-all2` instead of `npm-run-all`; `decap-server` was removed entirely (pulls blocked `simple-git`). Don't re-add them.
- Netlify Node version is pinned via `NODE_VERSION = "22"` in `netlify.toml`; keep it in sync with the workspace Node module.
