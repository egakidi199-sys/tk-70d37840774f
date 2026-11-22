// Сгенерировано scripts/sw-plugin.ts при сборке — не править руками.
const CACHE = 'tk-749875fbd9fc';
const ASSETS = [
 "./",
 "./apple-touch-icon.png",
 "./assets/armorback_v01-Be7QP0de.glb",
 "./assets/basemodule_a-DucMrvZG.glb",
 "./assets/basemodule_c-Dg07b76s.glb",
 "./assets/basemodule_d-Cb66xPb7.glb",
 "./assets/basemodule_e-OP-55dg6.glb",
 "./assets/brute_v02-CJOjA3-4.glb",
 "./assets/containers_blue-Djc5o_LZ.glb",
 "./assets/containers_green-CWiAJmRb.glb",
 "./assets/crawler_v02-DL9R0v1x.glb",
 "./assets/drill-DPKryHMa.glb",
 "./assets/garage-CVDdoKxz.glb",
 "./assets/index-Ba8wjnBi.css",
 "./assets/index-DYMqvUAi.js",
 "./assets/lander_a-UYoUed3J.glb",
 "./assets/rubezh_soldier_v02-JrCcSvOk.glb",
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
 "./assets/spacetruck_large-Mv3c9J3B.glb",
 "./assets/structure_tall-BqSxIBu8.glb",
 "./assets/tracked_robot_v01-BP3o_1k2.glb",
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
