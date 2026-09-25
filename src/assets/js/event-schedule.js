// The dated events in eventscontent.html are the source for both the next-event
// banner and the current season's past/upcoming lists.
(function () {
    function detroitToday(now = new Date()) {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Detroit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(now);
        const get = (name) => parts.find((part) => part.type === name).value;
        return `${get("year")}-${get("month")}-${get("day")}`;
    }

    function updateSchedule(doc, today, movePast) {
        const season = doc.querySelector("[data-current-season]");
        if (!season) return null;
        const entries = Array.from(season.querySelectorAll(".cs-card-group > [data-event-date]"));
        const upcoming = entries.filter((item) => item.dataset.eventDate >= today);
        const past = entries.filter((item) => item.dataset.eventDate < today);

        if (movePast) {
            const archive = doc.querySelector("[data-current-season-past]");
            if (archive && past.length) {
                const list = archive.querySelector(".cs-card-group");
                // Most recent past event first, matching the older archives.
                past.reverse().forEach((item) => list.appendChild(item));
                archive.hidden = false;
            }
        }

        return upcoming[0] || null;
    }

    function updateBanner(next) {
        const banner = document.querySelector("#cta-1693 .cs-link");
        if (!banner) return;
        if (!next) {
            banner.textContent = "View upcoming events";
            return;
        }
        const date = next.dataset.eventDate;
        const [, month, day] = date.split("-").map(Number);
        const monthName = new Intl.DateTimeFormat("en-US", {
            month: "short",
            timeZone: "UTC"
        }).format(new Date(Date.UTC(2026, month - 1, day)));
        const title = next.querySelector(".cs-h3").textContent.trim().replace(/\s+/g, " ");
        const time = next.querySelector(".cs-time")?.textContent.trim();
        banner.textContent = `Upcoming: ${title} — ${monthName} ${day}${time ? ` at ${time}` : ""}`;
    }

    async function refresh() {
        const today = detroitToday();
        const currentSeason = document.querySelector("[data-current-season]");
        if (currentSeason) {
            updateBanner(updateSchedule(document, today, true));
            return;
        }
        try {
            const response = await fetch("/events/");
            if (!response.ok) throw new Error(`Events page returned ${response.status}`);
            const eventsPage = new DOMParser().parseFromString(await response.text(), "text/html");
            updateBanner(updateSchedule(eventsPage, today, false));
        } catch (error) {
            // The generic banner link remains usable when the events page is unavailable.
            console.error("Unable to load the next event:", error);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", refresh, { once: true });
    } else {
        refresh();
    }
})();