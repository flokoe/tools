const CACHE_NAME = "running-interval-timer-v2";
const APP_URLS = [
    "./",
    "./index.html",
    "./running-interval-timer.webmanifest",
    "./running-interval-timer-icon.svg",
    "./running-interval-timer-icon-192.png",
    "./running-interval-timer-icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith("running-interval-timer-") && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method !== "GET") return;

    const requestUrl = new URL(request.url);
    const cachedPath = APP_URLS
        .map((url) => new URL(url, self.registration.scope).pathname)
        .includes(requestUrl.pathname);

    if (
        request.mode === "navigate"
        && (
            requestUrl.pathname.endsWith("/running-interval-timer/")
            || requestUrl.pathname.endsWith("/running-interval-timer/index.html")
        )
    ) {
        event.respondWith(networkFirst(request, "./"));
        return;
    }

    if (cachedPath) {
        event.respondWith(cacheFirst(request));
    }
});

async function cacheFirst(request) {
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || fetch(request);
}

async function networkFirst(request, fallbackUrl) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(fallbackUrl, response.clone());
        return response;
    } catch {
        return caches.match(fallbackUrl);
    }
}
