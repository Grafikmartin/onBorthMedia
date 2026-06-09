import { useRef } from 'react'
import './1.css'
import SectionDots from './SectionDots'
import ShowcaseSlider, { WEBSITE_SHOWCASE } from './ShowcaseSlider'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

function One({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)

  return (
    <section ref={sectionRef} id={id} className="einfuehrungstext-section">
      <div
        className="einfuehrungstext-spacer"
        style={{ minHeight: '100vh' }}
        aria-hidden="true"
      />
      <div
        className="einfuehrungstext-wrapper"
        data-header-bg="light"
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
        <p>Ob Unternehmensseite, Portfolio oder Landingpage – dein digitales Schaufenster, professionell umgesetzt.</p>
        <ShowcaseSlider items={WEBSITE_SHOWCASE} variant="light" />
      </div>
      </div>
    </section>
  )
}

export default One
