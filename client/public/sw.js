self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('niryat-ai-cache-v1').then(async cache => {
      const files = [
        '/',
        '/index.html',
        '/manifest.json',
        // Add icons if present
      ];
      // Only cache files that exist
      for (const file of files) {
        try {
          const response = await fetch(file);
          if (response.ok) await cache.put(file, response.clone());
        } catch (e) {
          // Skip missing files
        }
      }
    })
  );
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        // Gracefully handle fetch errors
        return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
})
