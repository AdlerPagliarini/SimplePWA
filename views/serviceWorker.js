importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

const cacheName = 'news-v1';

const staticAssets = [
  './',
  './source/app.js',
  './source/styles.css',
  './source/fallback.json',
  './images/offline.jpg'
];

// const workbox = new WorkboxSW(); version 2, version 3 does not need to initialize
   //https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-v2#workbox-sw
if (workbox) {
   console.log(`Yay! Workbox is loaded 🎉`);
   console.log(workbox);
 } else {
   console.log(`Boo! Workbox didn't load 😬`);
}

//v2 workbox.precache(staticAssets);
workbox.precaching.precache(staticAssets);

//v2 - workbox.routing.registerRoute('https://newsapi.org/(.*)', workbox.strategies.networkFirst());
workbox.routing.registerRoute(
  new RegExp('^https://newsapi.org/(.*)'),
  workbox.strategies.networkFirst(),
);