# Tuesday Musicale of Detroit — Eleventy Site

An [Eleventy](https://www.11ty.dev/) static site with SASS preprocessing, built on the [CodeStitch Intermediate Starter Kit](https://github.com/CodeStitchOfficial/Intermediate-Website-Kit-SASS). Includes Decap CMS configuration for blog management (CMS is Netlify-hosted; not used locally).

## Stack

- **Eleventy v2** — static site generator with Nunjucks templating
- **SASS** — compiled to CSS at dev/build time
- **Decap CMS** — blog management via Netlify Identity (production only)
- **Netlify** — deployment target

## Running on Replit

```
npm run start:replit
```

Starts SASS watcher + Eleventy dev server on port **8080** (no CMS proxy). `src/config/server.js` pins `host: "0.0.0.0"` and `port: 8080` so the port is deterministic and reachable through Replit's preview proxy.

## Building for Netlify

```
npm run build
```

Produces minified output in `public/`. This is what Netlify runs automatically on deploy (configured in `netlify.toml`).

## Notes

- `package.json` overrides force newer versions of `liquidjs`, `shell-quote`, and `handlebars` to satisfy Replit's security policy. These overrides are safe and don't affect the build output.
- `decap-server` was removed from dependencies (it pulled in `simple-git` which is blocked). The CMS itself (`src/admin/`) is untouched and works in production on Netlify.
- Content lives in `src/content/` as Nunjucks/HTML pages and Markdown blog posts.

## User preferences

- No local CMS — keep `npm run start:replit` as the dev command (not `npm start`)
