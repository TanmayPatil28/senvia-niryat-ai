import { useEffect } from 'react'

export function useOfflineReady() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Registration failed or not allowed in this environment; intentionally silent
        })
      })
    }
  }, [])
}
