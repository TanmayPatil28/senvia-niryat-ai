import { useEffect } from 'react'
import { useOfflineReady } from './components/useOfflineReady'

function AppWrapper() {
  useOfflineReady()

  useEffect(() => {
    document.body.classList.add('app-root')
    return () => { document.body.classList.remove('app-root') }
  }, [])

  return <></>
}

export default AppWrapper
