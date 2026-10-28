/* SE Database Mobile: static app shell only. Never cache client data. */
const CACHE='sedb-mobile-v0.1.0';
const SHELL=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./vendor/jszip.min.js'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sedb-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});
