import { useState, useEffect, useRef } from 'react'
import './3.css'
import SectionDots from './SectionDots'
import ShowcaseSlider, { DESIGN_SHOWCASE } from './ShowcaseSlider'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

function Three({ id }: { id?: string }) {
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([false, false, false])
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = paragraphRefs.current.indexOf(entry.target as HTMLParagraphElement)
          if (index !== -1) {
            setVisibleParagraphs(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        }
      })
    }, observerOptions)

    paragraphRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      paragraphRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (isSticky) {
      setVisibleParagraphs([true, true, true])
    }
  }, [isSticky])

  return (
    <section ref={sectionRef} id={id} className="about-section">
      <div
        className="about-spacer"
        style={{ minHeight: '100vh' }}
        aria-hidden="true"
      />
      <div
        className="about-wrapper"
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
          backgroundColor: 'var(--color-surface, #f5f5f5)',
          padding: 'var(--spacing-xl, 4rem) 0',
          transform: isSticky ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          zIndex: 350,
        }}
      >
      <SectionDots />
      <div className="about-content about-content-scrollable">
        <div className="about-text">
          <h2 className="about-title">Design</h2>
        <p
          ref={(el) => { paragraphRefs.current[0] = el }}
          className={visibleParagraphs[0] ? 'visible' : ''}
        >
          Ein starker Auftritt beginnt nicht erst bei der Website. Logo, Farben, Typografie und Gestaltung sorgen für Wiedererkennung.
        </p>
        <p
          ref={(el) => { paragraphRefs.current[1] = el }}
          className={visibleParagraphs[1] ? 'visible' : ''}
        >
          Corporate Design schafft eine visuelle Sprache, die dein Unternehmen klar positioniert – online und offline.
        </p>
        <p
          ref={(el) => { paragraphRefs.current[2] = el }}
          className={visibleParagraphs[2] ? 'visible' : ''}
        >
          Von Logoentwicklung über Styleguides bis zur konsistenten Umsetzung in Web und Print – alles aus einer Hand.
        </p>
          <ShowcaseSlider items={DESIGN_SHOWCASE} variant="muted" />
      </div>
      </div>
      </div>
    </section>
  )
}

export default Three
