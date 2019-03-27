let staticCache = 'restaurant-static-v2';

self.addEventListener('install', (evt) => {

    evt.waitUntil(
        // create a cache 
        caches.open(staticCache).then((cache) => {
            // cache all the urls
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html?id=1',
                '/restaurant.html?id=2',
                '/restaurant.html?id=3',
                '/restaurant.html?id=4',
                '/restaurant.html?id=5',
                '/restaurant.html?id=6',
                '/restaurant.html?id=7',
                '/restaurant.html?id=8',
                '/restaurant.html?id=9',
                '/restaurant.html?id=10',
                '/js/main.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'
            ]);
        })
    );
});



self.addEventListener('activate', (evt) => {
    // remove the old cache
    evt.waitUntil(
        // grab all the cache names that exist
        caches.keys().then((cacheNames) => {
            // filter the caches name that start with restaurant-
            // make sure it's not equal to our staticCache
            cacheNames.filter((cacheName) => {
                return cacheName.startsWith('restaurant-') &&
                    cacheName != staticCache;
                // map the unwanted caches and delete it
            }).map((cacheName) => {
                return caches.delete(cacheName);
            })
        })
    );
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        // check if there is a match in the caches 
        // if not return a fetch to the network for the original request
        caches.match(evt.request).then((respond) => {
            return respond || fetch(evt.request);
        })
    );
});