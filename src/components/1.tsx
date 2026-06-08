import { useState, useEffect } from 'react'
import './1.css'
import SectionDots from './SectionDots'
import ShowcaseSlider, { WEBSITE_SHOWCASE } from './ShowcaseSlider'

function One({ id }: { id?: string }) {
  const [scale, setScale] = useState(0.7)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>
    const viewportHeight = window.innerHeight
    const stickyPoint = viewportHeight * 2

    const updateScale = () => {
      const scrollY = window.scrollY
      if (scrollY >= stickyPoint) {
        setIsSticky(true)
        setScale(1.0)
      } else {
        setIsSticky(false)
        const scrollProgress = Math.min(Math.max((scrollY - viewportHeight) / viewportHeight, 0), 1)
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
    <section id={id} className="einfuehrungstext-section">
      <div
        className="einfuehrungstext-spacer"
        style={{ minHeight: '100vh' }}
        aria-hidden="true"
      />
      <div
        className="einfuehrungstext-wrapper"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: '#ffffff',
          padding: 'var(--spacing-xl, 4rem) 0',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 110,
        }}
      >
      <SectionDots />
      <div className="einfuehrungstext-text einfuehrungstext-text-scrollable">
        <h2 className="einfuehrungstext-title">Webseiten</h2>
        <p>Webseiten, die nicht nur gut aussehen, sondern Vertrauen schaffen, Orientierung geben und Kunden gewinnen.</p>
        <p>Von der ersten Idee bis zur fertigen Online-Präsenz: klar strukturiert, responsiv und auf deine Zielgruppe ausgerichtet.</p>
        <p>Ob Unternehmensseite, Portfolio oder Landingpage – wir setzen dein digitales Schaufenster professionell um.</p>
        <ShowcaseSlider items={WEBSITE_SHOWCASE} variant="light" />
      </div>
      </div>
    </section>
  )
}

export default One
