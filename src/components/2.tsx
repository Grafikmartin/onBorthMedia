import { useState, useEffect } from 'react'
import './2.css'
import SectionDots from './SectionDots'
import ShowcaseSlider, { WEBAPP_SHOWCASE } from './ShowcaseSlider'

function Two({ id }: { id?: string }) {
  const [scale, setScale] = useState(0.7)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>
    const viewportHeight = window.innerHeight
    const stickyPoint = viewportHeight * 3

    const updateScale = () => {
      const scrollY = window.scrollY
      if (scrollY >= stickyPoint) {
        setIsSticky(true)
        setScale(1.0)
      } else {
        setIsSticky(false)
        const scrollProgress = Math.min(Math.max((scrollY - viewportHeight * 2) / viewportHeight, 0), 1)
        setScale(0.7 + scrollProgress * 0.3)
      }
    }

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      updateScale()
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        updateScale()
      }, 150)
    }

    updateScale()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <section id={id} className="leistungen-section">
      <div
        className="leistungen-wrapper"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: 'var(--spacing-xl, 4rem) 0',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 120,
        }}
      >
      <SectionDots />
      <div
        className="leistungen-scroll-area"
        style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
      <div className="leistungen-text">
        <h2 className="leistungen-title">Webapps</h2>
        <p>Individuelle Anwendungen, Portale und digitale Prozesse – maßgeschneidert für dein Geschäftsmodell.</p>
        <p>Von der Konzeption über UX und Entwicklung bis zum Launch begleiten wir komplexe Webprojekte aus einer Hand.</p>
        <h3 className="leistungen-subtitle">Digitale Lösungen</h3>
        <p>Dashboards, Kundenportale, interne Tools und datengetriebene Anwendungen – skalierbar und zukunftssicher.</p>
        <ShowcaseSlider items={WEBAPP_SHOWCASE} variant="dark" />
      </div>
      </div>
      </div>
    </section>
  )
}

export default Two
