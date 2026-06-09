import { useRef, type CSSProperties } from 'react'
import './4.css'
import SectionDots from './SectionDots'
import LogoWeisserPunkt from './LogoWeisserPunkt'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

const LOGO_WIDTH_VW = 34

function Four({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)

  return (
    <section ref={sectionRef} id={id} className="kontakt-section">
      <div
        className="kontakt-wrapper"
        data-header-bg="light"
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
          zIndex: 420,
        }}
      >
      <SectionDots />
      <LogoWeisserPunkt
        className="aufmacher-logo kontakt-logo-left"
        style={{ '--aufmacher-logo-width': `${LOGO_WIDTH_VW}vw` } as CSSProperties}
      />
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
