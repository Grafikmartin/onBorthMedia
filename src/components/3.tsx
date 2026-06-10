import { useState, useEffect, useRef } from 'react'
import './3.css'
import SectionDots from './SectionDots'
import webdesignImage from '../assets/Webdesign-quer copy.jpg'
import soundPulseLogo from '../assets/logos-design/SoundPulse_green.png'
import goPresseLogo from '../assets/logos-design/go-presse.png'
import architekturMLogo from '../assets/logos-design/logo-architektur_m.svg'
import getwizeLogo from '../assets/logos-design/Logo_GETWIZE.svg'
import qbLogo from '../assets/logos-design/QB-Logo.png'
import aretoLogo from '../assets/logos-design/areto-group-blau.svg'
import vettierioLogo from '../assets/logos-design/vettierio.svg'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

const DESIGN_LOGOS = [
  soundPulseLogo,
  goPresseLogo,
  architekturMLogo,
  getwizeLogo,
  qbLogo,
  aretoLogo,
  vettierioLogo,
]

const LOGO_HOLD_MS = 2200
const LOGO_FADE_MS = 900

function DesignLogoCycle() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fadeInTimer = window.setTimeout(() => setVisible(true), 50)

    const cycleTimer = window.setInterval(() => {
      setVisible(false)
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % DESIGN_LOGOS.length)
        setVisible(true)
      }, LOGO_FADE_MS)
    }, LOGO_HOLD_MS + LOGO_FADE_MS)

    return () => {
      window.clearTimeout(fadeInTimer)
      window.clearInterval(cycleTimer)
    }
  }, [])

  return (
    <div className="about-logo-cycle" aria-hidden="true">
      <img
        src={DESIGN_LOGOS[index]}
        alt=""
        className={`about-logo-cycle-img${visible ? ' visible' : ''}`}
        loading="lazy"
      />
    </div>
  )
}

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
          backgroundColor: 'var(--color-surface)',
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
        <div className="about-images-row">
          <div className="about-image-wrap">
            <img src={webdesignImage} alt="" className="about-image" loading="lazy" />
          </div>
          <DesignLogoCycle />
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default Three
