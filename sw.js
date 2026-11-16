/* Service worker: la web funciona sin conexión.
   - Archivos propios: se sirven de la caché y se actualizan en segundo plano
     (los cambios nuevos se ven al abrir la app una segunda vez).
   - Librerías de CDN (Prism, Mermaid): caché con descarga la primera vez. */
const CACHE = 'apuntes-dam-v1';
const LOCAL = [
  './', 'index.html', 'manifest.webmanifest',
  'css/style.css', 'js/app.js', 'js/tareas.js',
  'js/data/acceso-datos.js', 'js/data/psp.js', 'js/data/pmdm.js', 'js/data/despliegue.js',
  'js/data/interfaces.js', 'js/data/sge.js', 'js/data/ingles.js', 'js/data/digitalizacion.js', 'js/data/sostenibilidad.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];
const PRISM = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/';
const CDN = [PRISM + 'prism.min.js']
  .concat(['java', 'kotlin', 'sql', 'javascript', 'bash', 'json', 'yaml', 'css', 'python'].map(l => PRISM + 'components/prism-' + l + '.min.js'))
  .concat(['https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js']);

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(LOCAL);                                         // imprescindible
    await Promise.all(CDN.map(u => c.add(u).catch(() => {})));      // si falla alguna, no se cancela
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const ok = url.origin === location.origin || url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'cdn.jsdelivr.net';
  if (!ok) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const r = await net;
    if (r) return r;
    if (req.mode === 'navigate') return (await c.match('index.html')) || (await c.match('./'));
    return new Response('Sin conexión', { status: 503, statusText: 'Offline' });
  })());
});
