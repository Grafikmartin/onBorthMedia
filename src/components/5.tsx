import { useRef } from 'react'
import './5.css'
import SectionDots from './SectionDots'
import portraitSrc from '../assets/_WUE9658.jpg'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

function Five({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)

  return (
    <section ref={sectionRef} id={id} className="uebermich-section">
      <div
        className="uebermich-spacer"
        style={{ minHeight: '100vh' }}
        aria-hidden="true"
      />
      <div
        className="uebermich-wrapper"
        data-header-bg="dark"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 410,
        }}
      >
        <SectionDots />
        <div className="uebermich-layout">
          <div className="uebermich-image-wrap">
            <img
              src={portraitSrc}
              alt="Martin Borth"
              className="uebermich-image"
            />
          </div>
          <div className="uebermich-content uebermich-content-scrollable">
            <h2 className="uebermich-title">Über mich</h2>
            <p className="uebermich-lead">Moin, ich bin Martin Borth.</p>
            <p>
              Als Webentwickler und Grafikdesigner unterstütze ich Unternehmen dabei, sichtbar zu werden
              – mit professionellen Webseiten, individuellen Webapps und einer klaren visuellen Identität.
            </p>
            <p>
              Durch meine Erfahrung in Werbeagenturen, Verlag und BI-Consulting bringe ich seit über
              20 Jahren Design, Kommunikation und Technik zusammen. Das Ergebnis sind Lösungen, die nicht
              nur funktionieren, sondern auch nachhaltig Eindruck hinterlassen.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Five
