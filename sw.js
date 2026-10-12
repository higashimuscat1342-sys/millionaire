/* 大富豪 Service Worker（オフライン対応）。index.html と同じ場所に置いてください */
const C='daifugo-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!='GET'||!e.request.url.startsWith('http'))return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return r})
  .catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
