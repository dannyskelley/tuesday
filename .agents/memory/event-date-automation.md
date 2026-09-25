---
name: Event date automation
description: Why the site's current-season event dates use visitor-time scheduling
---

Use Detroit's calendar date to decide whether a scheduled event is upcoming, retaining it through its listed day. Do not treat events with a TBA day as eligible for the next-event banner.

**Why:** This is a static Netlify site; build-time date checks would freeze until the next deploy. An unknown day cannot safely be ordered among dated concerts. The user wants dated past-event placement and the next-event banner to roll over without manual edits.

**How to apply:** When adding a dated concert, include its date in the current season's event markup so the automatic archive and banner stay aligned. Once a TBA day is confirmed, set its exact date. New seasons still need their event content and heading entered manually.