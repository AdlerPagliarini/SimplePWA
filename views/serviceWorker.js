const cacheName = 'news-v1';

const staticAssets = [
  './',
  './source/app.js',
  './source/styles.css'
];

self.addEventListener('install', async function () {
    console.log(`install`);
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event =>{
    console.log(`fetch`);
});