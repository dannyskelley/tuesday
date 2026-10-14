document.querySelectorAll("[data-video-id]").forEach(preview => {
    preview.addEventListener("click", event => {
        event.preventDefault();
        const player = document.createElement("iframe");
        player.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(preview.dataset.videoId)}?autoplay=1`;
        player.title = "Tuesday Musicale of Detroit video";
        player.allow = "autoplay; encrypted-media; picture-in-picture";
        player.allowFullscreen = true;
        player.referrerPolicy = "strict-origin-when-cross-origin";
        preview.replaceWith(player);
        player.focus();
    });
});
