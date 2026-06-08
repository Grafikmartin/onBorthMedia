import { useState, useEffect, useRef } from 'react'
import './4.css'
import SectionDots from './SectionDots'

function Four({ id }: { id?: string }) {
  const [scale, setScale] = useState(0.7)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const designSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    designSectionRef.current = document.getElementById('design')
  }, [])

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>
    const viewportHeight = window.innerHeight

    const updateScale = () => {
      const scrollY = window.scrollY
      const designSection = designSectionRef.current
      const designBottom = designSection ? designSection.offsetTop + designSection.offsetHeight : viewportHeight * 5
      const stickyPoint = designBottom
      const scaleStart = designBottom - viewportHeight

      if (scrollY >= stickyPoint) {
        setIsSticky(true)
        setScale(1.0)
      } else {
        setIsSticky(false)
        const scrollProgress = Math.min(Math.max((scrollY - scaleStart) / viewportHeight, 0), 1)
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
    <section id={id} className="kontakt-section">
      <div
        className="kontakt-wrapper"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: '#ffffff',
          padding: 'var(--spacing-xl, 4rem) 0',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 370,
        }}
      >
      <SectionDots />
        <div className="kontakt-content kontakt-content-scrollable">
          <div className="kontakt-text">
            <h2 className="kontakt-title">Kontakt</h2>
            <p className="kontakt-lead">
              Bereit, dein Projekt an Bord zu holen?
            </p>
            <p className="kontakt-address">
              OnBorthMedia – Webseiten, Webapps und Design aus einer Hand.<br />
              E-Mail: <a href="mailto:kontakt@onborthmedia.de" className="kontakt-link">kontakt@onborthmedia.de</a>
            </p>
            <p className="kontakt-note">
              Erzähl uns von deinem Vorhaben – wir melden uns mit einem klaren nächsten Schritt.
            </p>
          </div>
          <a
            href="mailto:kontakt@onborthmedia.de?subject=Projektanfrage%20OnBorthMedia"
            className="kontakt-anfahrt-btn"
          >
            Projekt starten
          </a>
        </div>
      </div>
    </section>
  )
}

export default Four
