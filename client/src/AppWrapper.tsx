import { useEffect, useState } from 'react'
import { useOfflineReady } from './components/useOfflineReady'

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('senvia:dark')
      if (saved !== null) return saved === '1'
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('senvia:dark', isDark ? '1' : '0') } catch (e) {}
  }, [isDark])

  return { isDark, setIsDark }
}

function AppWrapper() {
  useOfflineReady()
  useDarkMode()

  useEffect(() => {
    document.body.classList.add('app-root')
    return () => { document.body.classList.remove('app-root') }
  }, [])

  return <></>
}

export default AppWrapper
