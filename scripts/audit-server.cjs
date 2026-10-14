// Serve an already-built production site with compression, without the dev
// server's reload client. For local Lighthouse verification only.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const root = path.resolve(process.argv[2] || "public");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
http.createServer((req, res) => {
    let file;
    try {
        file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
        if (!file.startsWith(root + path.sep) && file !== root) throw new Error("Invalid path");
        if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
        const ext = path.extname(file);
        const data = fs.readFileSync(file);
        const compressed = /\.(html|css|js|svg|xml|txt)$/.test(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "");
        res.writeHead(200, {
            "Content-Type": types[ext] || "application/octet-stream",
            "Vary": "Accept-Encoding",
            ...(compressed ? { "Content-Encoding": "gzip" } : {})
        });
        res.end(compressed ? zlib.gzipSync(data) : data);
    } catch {
        res.writeHead(404);
        res.end("Not found");
    }
}).listen(8081, "127.0.0.1", () => console.log("Production audit server listening on 8081"));
