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
import lisftschaenkeLogo from '../assets/logos-design/lisftschaenke.png'
import gapLogo from '../assets/logos-design/GAP.webp'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

const iconModules = import.meta.glob('../assets/icons/*positiv*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const DESIGN_ICONS = Object.keys(iconModules)
  .filter((path) => /positiv/i.test(path) && !/negativ/i.test(path))
  .sort()
  .map((path) => iconModules[path])

const DESIGN_LOGOS: { src: string; bg?: string; large?: boolean }[] = [
  { src: soundPulseLogo },
  { src: goPresseLogo },
  { src: architekturMLogo },
  { src: getwizeLogo },
  { src: qbLogo, bg: '#f2f2f2' },
  { src: aretoLogo },
  { src: vettierioLogo },
  { src: lisftschaenkeLogo, bg: '#000000' },
  { src: gapLogo, large: true },
]

const LOGO_HOLD_MS = 700
const LOGO_FADE_MS = 250
const ICON_HOLD_MS = 700
const ICON_FADE_MS = 250

function pickNextIconIndex(currentIndices: number[], nextRef: { current: number }) {
  if (DESIGN_ICONS.length <= 3) {
    const index = nextRef.current % DESIGN_ICONS.length
    nextRef.current += 1
    return index
  }

  for (let offset = 0; offset < DESIGN_ICONS.length; offset += 1) {
    const candidate = (nextRef.current + offset) % DESIGN_ICONS.length
    if (!currentIndices.includes(candidate)) {
      nextRef.current = candidate + 1
      return candidate
    }
  }

  const fallback = nextRef.current % DESIGN_ICONS.length
  nextRef.current += 1
  return fallback
}

function DesignIconCycle() {
  const [indices, setIndices] = useState([0, 1, 2])
  const [visible, setVisible] = useState([false, false, false])
  const nextIconRef = useRef(3)
  const slotRef = useRef(0)

  useEffect(() => {
    if (DESIGN_ICONS.length < 3) return

    const timers: number[] = []
    const schedule = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay))
    }

    schedule(() => setVisible([true, true, true]), 50)

    const cycle = () => {
      const slot = slotRef.current % 3
      slotRef.current += 1

      setVisible((prev) => {
        const next = [...prev]
        next[slot] = false
        return next
      })

      schedule(() => {
        setIndices((prev) => {
          const next = [...prev]
          next[slot] = pickNextIconIndex(prev, nextIconRef)
          return next
        })
        setVisible((prev) => {
          const next = [...prev]
          next[slot] = true
          return next
        })
      }, ICON_FADE_MS)
    }

    const cycleTimer = window.setInterval(cycle, ICON_HOLD_MS + ICON_FADE_MS)

    return () => {
      window.clearInterval(cycleTimer)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  if (DESIGN_ICONS.length < 3) return null

  return (
    <div className="about-icon-cycle" aria-hidden="true">
      <div className="about-icon-cycle-slots">
        {indices.map((iconIndex, slot) => (
          <img
            key={slot}
            src={DESIGN_ICONS[iconIndex]}
            alt=""
            className={`about-icon-cycle-img${visible[slot] ? ' visible' : ''}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}

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

  const currentLogo = DESIGN_LOGOS[index]

  return (
    <div
      className={`about-logo-cycle${currentLogo.large ? ' about-logo-cycle--large' : ''}`}
      style={currentLogo.bg ? { background: currentLogo.bg } : undefined}
      aria-hidden="true"
    >
      <img
        src={currentLogo.src}
        alt=""
        className={`about-logo-cycle-img${currentLogo.large ? ' about-logo-cycle-img--large' : ''}${visible ? ' visible' : ''}`}
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
          backgroundColor: 'var(--farbe-2)',
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
          <DesignLogoCycle />
          <div className="about-image-wrap">
            <img src={webdesignImage} alt="" className="about-image" loading="lazy" />
          </div>
          <DesignIconCycle />
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default Three
