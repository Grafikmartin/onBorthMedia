import { useRef } from 'react'
import './2.css'
import SectionDots from './SectionDots'
import ShowcaseSlider, { WEBAPP_SHOWCASE } from './ShowcaseSlider'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

function Two({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)

  return (
    <section ref={sectionRef} id={id} className="leistungen-section">
      <div
        className="leistungen-wrapper"
        data-header-bg="dark"
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
        <p>Von der Konzeption über UX und Entwicklung bis zum Launch – komplexe Webprojekte aus einer Hand.</p>
        <p>Dashboards, Kundenportale, interne Tools und datengetriebene Anwendungen – skalierbar und zukunftssicher.</p>
        <ShowcaseSlider items={WEBAPP_SHOWCASE} variant="dark" />
      </div>
      </div>
      </div>
    </section>
  )
}

export default Two
