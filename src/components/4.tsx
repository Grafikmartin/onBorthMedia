import { useRef } from 'react'
import './4.css'
import { SocialLinks } from './SocialLinks'
import ObmLogo from './ObmLogo'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

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
          backgroundColor: 'var(--farbe-2)',
          padding: 'var(--spacing-xl, 4rem) 0',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 420,
        }}
      >
        <div className="kontakt-content">
          <div className="kontakt-text kontakt-content-scrollable">
            <h2 className="kontakt-title">Kontakt</h2>
            <ObmLogo className="kontakt-logo" title="OnBorthMedia" />
            <p className="kontakt-tagline">Gemeinsam auf Kurs.</p>
            <p className="kontakt-address">
              Erzähl mir von deinem Vorhaben – ich melde mich mit einem klaren nächsten Schritt.
            </p>
          </div>
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}

export default Four
