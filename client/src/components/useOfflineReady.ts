import { useEffect } from 'react'

export function useOfflineReady() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker registered:', registration)
        }).catch(error => {
          console.log('ServiceWorker registration failed:', error)
        })
      })
    }
  }, [])
}
