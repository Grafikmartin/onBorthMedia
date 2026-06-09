import { useState, useEffect } from 'react'
import './App.css'
import Aufmacher from './components/Aufmacher'
import HamburgerMenu from './components/HamburgerMenu'
import Video from './components/Video'
import One from './components/1'
import Two from './components/2'
import Three from './components/3'
import Four from './components/4'
import Five from './components/5'
import ScrollHint from './components/ScrollHint'
import Footer from './components/Footer'
import CursorFollower from './components/CursorFollower'
import ImpressumDrawer from './components/ImpressumDrawer'
import Loader, { LOADER_MIN_DURATION_MS } from './components/Loader'

function App() {
  const [canScroll, setCanScroll] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  // Verhindere Scrollen während der Animation
  useEffect(() => {
    if (!canScroll) {
      // Verhindere Scrollen
      document.body.style.overflow = 'hidden'
    } else {
      // Erlaube Scrollen
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [canScroll])

  useEffect(() => {
    const startedAt = Date.now()
    let hideTimeout: ReturnType<typeof setTimeout> | undefined
    let unmountTimeout: ReturnType<typeof setTimeout> | undefined

    const finishLoading = () => {
      const remaining = Math.max(0, LOADER_MIN_DURATION_MS - (Date.now() - startedAt))
      hideTimeout = window.setTimeout(() => {
        setIsLoading(false)
        unmountTimeout = window.setTimeout(() => setShowLoader(false), 400)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
    }

    return () => {
      window.removeEventListener('load', finishLoading)
      if (hideTimeout) window.clearTimeout(hideTimeout)
      if (unmountTimeout) window.clearTimeout(unmountTimeout)
    }
  }, [])

  // Scroll sofort erlauben (kein Klick mehr nötig)
  useEffect(() => {
    if (isLoading) return

    const timer = setTimeout(() => {
      setCanScroll(true)
      setShowScrollHint(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <div className="app">
      {showLoader && <Loader hiding={!isLoading} />}
      <HamburgerMenu onImpressumClick={() => setImpressumOpen(true)} />
      <section className="aufmacher-section" data-header-bg="light">
        <div className="welcome-container">
          <Aufmacher />
        </div>
      </section>
      <Video />
      <One id="webseiten" />
      <Two id="webapps" />
      <Three id="design" />
      <Five id="ueber-mich" />
      <Four id="kontakt" />
      <Footer />
      {showScrollHint && <ScrollHint />}
      <CursorFollower />
      <ImpressumDrawer isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
    </div>
  )
}

export default App

