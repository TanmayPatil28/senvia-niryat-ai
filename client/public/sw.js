self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('niryat-ai-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        // Only cache icons if they exist
        // '/icon-192.png',
        // '/icon-512.png',
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
