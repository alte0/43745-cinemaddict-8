const CACHE_NAME = `MOOWLE_APP`;

self.addEventListener(`install`, (evt) => {
  // eslint-disable-next-line no-console
  console.log(`sw, install`, {evt});
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/bundle.js`
        ]);
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  // eslint-disable-next-line no-console
  console.log(`sw`, `activate`, {evt});
});

self.addEventListener(`fetch`, (evt) => {
  // eslint-disable-next-line no-console
  console.log(`fetch`, {evt, request: evt.request});
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(`Find in cache`, {response});
        if (response) {
          return response;
        } else {
          return fetch(evt.request)
            .then(function (response) {
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(evt.request, response.clone()));

              return response.clone();
            });
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error({err}))
  );
});
