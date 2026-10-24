/* 2080 Hours offline support for the hosted site (GitHub Pages). The downloaded index.html doesn't need this file.
   The app itself: network first, so updates show up as soon as you're online; the saved copy is used when offline.
   Fonts and the PNG export library: saved the first time they load, then served from the copy.
   Bump VER when the list of app files changes. */
const VER='2080h-v1',APP=['./','index.html','manifest.webmanifest','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
const LIBS=/^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com\/ajax\/libs\/html2canvas\/)/;

self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(APP)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});

self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin){const key=r.mode==='navigate'?'./':r,saved=()=>caches.match(key,{ignoreSearch:true});
    /* offline or a server error (e.g. a GitHub outage): fall back to the saved copy */
    e.respondWith(fetch(r).then(res=>{if(res.ok){const copy=res.clone();caches.open(VER).then(c=>c.put(key,copy));return res}return saved().then(m=>m||res)})
      .catch(()=>saved().then(m=>m||caches.match('./'))));
    return}
  if(LIBS.test(r.url))e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const copy=res.clone();caches.open(VER).then(c=>c.put(r,copy))}return res})))});
