module.exports = {
    isProduction: process.env.ELEVENTY_ENV === "PROD",
    // Allow Replit's proxied iframe to reach the dev server
    host: "0.0.0.0",
    // Pin to 8080 so the Replit preview proxy always finds it
    port: 8080,
};
