// Сгенерировано scripts/sw-plugin.ts при сборке — не править руками.
const CACHE = 'tk-e59db6840b48';
const ASSETS = [
 "./",
 "./apple-touch-icon.png",
 "./assets/index-BxOwbcU3.js",
 "./assets/index-DVHtl6U9.css",
 "./assets/rubik-cyrillic-500-normal-BH_pkKR0.woff",
 "./assets/rubik-cyrillic-500-normal-Didq2w9O.woff2",
 "./assets/rubik-cyrillic-700-normal-C_jxLOfU.woff",
 "./assets/rubik-cyrillic-700-normal-DFnztZBh.woff2",
 "./assets/rubik-cyrillic-800-normal-DocVmW4N.woff",
 "./assets/rubik-cyrillic-800-normal-wonQiwhm.woff2",
 "./assets/rubik-cyrillic-900-normal-DPF03d39.woff",
 "./assets/rubik-cyrillic-900-normal-jlxVC9Lu.woff2",
 "./assets/rubik-latin-500-normal-1os41rQk.woff2",
 "./assets/rubik-latin-500-normal-LZYVHeqz.woff",
 "./assets/rubik-latin-700-normal-D-tMm-eS.woff2",
 "./assets/rubik-latin-700-normal-KHOtubUA.woff",
 "./assets/rubik-latin-800-normal-BtaGuVpR.woff2",
 "./assets/rubik-latin-800-normal-Dq1miTTj.woff",
 "./assets/rubik-latin-900-normal-CBojinpD.woff",
 "./assets/rubik-latin-900-normal-Cz6GdZLE.woff2",
 "./icon-192.png",
 "./icon-512.png",
 "./icon-maskable-512.png",
 "./icon.svg",
 "./index.html",
 "./manifest.webmanifest"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('tk-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    // Страница — сначала из сети (новая версия), без сети — из кэша.
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./', copy));
          return res;
        })
        .catch(() => caches.match('./', { ignoreSearch: true })),
    );
    return;
  }
  // Файлы сборки (имена с хэшем) — из кэша, иначе из сети с докладкой в кэш.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
