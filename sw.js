var cacheName = 'rra-static-v1';

self.addEventListener('install', event => {

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        // I see what I missed xD
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/css/styles-res.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/img/not-available.jpg',
      ]);
    }).catch(err => {
        console.log("Error while caching: ", err);
    })
  );
});

self.addEventListener('fetch', event => {

  let reqURL = new URL(event.request.url);

  if(reqURL.origin === location.origin) {
    if(reqURL.pathname == '/') {
      event.respondWith(caches.match('/index.html'));
      return ;
    }
  }
  
  event.respondWith(
      fetch(event.request).then(res => {
        if(res.status === 404) {
            return fetch('img/not-available.jpg')
        }
        return res;
      }).catch(() => {
          return new Response('triggering a 404... Somehow :D');
      })
  );
});