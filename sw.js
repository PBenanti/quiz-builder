// Service worker di Moodle Quiz Builder.
// Pagina: prima la rete (così gli aggiornamenti arrivano subito), copia in cache per l'uso offline.
// Librerie CDN (PDF.js, JSZip): dalla cache, aggiornate in background.
// Le chiamate ad api.anthropic.com non passano mai dalla cache.
const VERSION = 'mqb-v1.7.1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'];
const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.all(CDN.map(u => c.add(new Request(u, { mode: 'cors' })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'api.anthropic.com') return;

  if (req.mode === 'navigate' || (url.origin === location.origin)) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh.ok) (await caches.open(VERSION)).put(req, fresh.clone());
        return fresh;
      } catch (err) {
        return (await caches.match(req, { ignoreSearch: true })) ||
               (req.mode === 'navigate' ? caches.match('./index.html') : Response.error());
      }
    })());
    return;
  }

  if (url.hostname === 'cdnjs.cloudflare.com') {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || Response.error();
    })());
  }
});
