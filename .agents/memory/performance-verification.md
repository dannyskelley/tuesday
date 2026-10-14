---
name: Performance verification
description: Audit conditions and functionality tradeoffs for this static Netlify site
---

Use a minified production build served with compression for local Lighthouse comparisons. Treat local scores as diagnostic results, not published PageSpeed scores.

**Why:** Eleventy's development server adds reload JavaScript and serves unminified resources; this materially changes mobile performance. Netlify's network conditions also differ from local tests.

**How to apply:** Confirm the published site after publishing. Do not disable analytics, remove the concert video, or delay scripts solely past an audit window to claim a perfect score. Ask before removing visitor tracking; its JavaScript was the dominant remaining script cost in the mobile audit.

Keep Google Analytics enabled when optimizing this site.

**Why:** The user explicitly chose “Keep Google Analytics” rather than removing it to pursue the remaining mobile performance points.

**How to apply:** Preserve tracking during future performance improvements unless the user changes this decision.
