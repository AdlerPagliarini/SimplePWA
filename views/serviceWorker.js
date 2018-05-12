const cacheName = 'news-v1';

const staticAssets = [
  './',
  './source/app.js',
  './source/styles.css',
  './source/fallback.json',
  './images/offline.jpg'
];

self.addEventListener('install', async function () {
    console.log(`install`);
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event =>  {
    console.log(`fetch`);
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin == location.origin)
        event.respondWith(cacheFirst(req));
    else
        event.respondWith(networkFirst(req));
});

async function cacheFirst(req){
    console.log(`cacheFirst`);
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req){
    console.log(`networkFirst`);
    const cache = await caches.open('news-dynamic');
    
    try{
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    }catch(error){
        const cachedResponse = await cache.match(req);
        return cachedResponse || caches.match('./source/fallback.json');
    }
}