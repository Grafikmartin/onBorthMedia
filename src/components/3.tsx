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

const printModules = import.meta.glob('../assets/PrintDesigns/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const PRINT_DESIGNS = Object.keys(printModules)
  .sort()
  .map((path) => printModules[path])

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

const LOGO_HOLD_MS = 3200
const LOGO_FADE_MS = 1400
const PRINT_HOLD_MS = 6500
const PRINT_FADE_MS = 1200

type PrintOrientation = 'landscape' | 'portrait'

function usePrintOrientations() {
  const [orientations, setOrientations] = useState<PrintOrientation[]>([])

  useEffect(() => {
    let cancelled = false

    Promise.all(
      PRINT_DESIGNS.map(
        (src) =>
          new Promise<PrintOrientation>((resolve) => {
            const img = new Image()
            img.onload = () => {
              resolve(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape')
            }
            img.onerror = () => resolve('landscape')
            img.src = src
          }),
      ),
    ).then((result) => {
      if (!cancelled) setOrientations(result)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return orientations
}

function getPrintPanClass(orientation: PrintOrientation, index: number) {
  const reverse = index % 2 === 1
  if (orientation === 'portrait') {
    return reverse ? 'about-print-cycle-layer--pan-bt' : 'about-print-cycle-layer--pan-tb'
  }
  return reverse ? 'about-print-cycle-layer--pan-rl' : 'about-print-cycle-layer--pan-lr'
}

function useCrossfadeCycle(length: number, holdMs: number, fadeMs: number) {
  const [baseIndex, setBaseIndex] = useState(0)
  const [topIndex, setTopIndex] = useState<number | null>(null)
  const [topVisible, setTopVisible] = useState(false)
  const baseIndexRef = useRef(0)

  useEffect(() => {
    baseIndexRef.current = baseIndex
  }, [baseIndex])

  useEffect(() => {
    if (length <= 1) return

    let fadeTimeout: number | undefined

    const cycleTimer = window.setInterval(() => {
      const nextIndex = (baseIndexRef.current + 1) % length
      setTopIndex(nextIndex)
      setTopVisible(false)

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setTopVisible(true))
      })

      fadeTimeout = window.setTimeout(() => {
        setBaseIndex(nextIndex)
        baseIndexRef.current = nextIndex
        setTopIndex(null)
        setTopVisible(false)
      }, fadeMs)
    }, holdMs + fadeMs)

    return () => {
      window.clearInterval(cycleTimer)
      if (fadeTimeout) window.clearTimeout(fadeTimeout)
    }
  }, [length, holdMs, fadeMs])

  return { baseIndex, topIndex, topVisible }
}

function DesignPrintCycle() {
  const orientations = usePrintOrientations()
  const { baseIndex, topIndex, topVisible } = useCrossfadeCycle(
    PRINT_DESIGNS.length,
    PRINT_HOLD_MS,
    PRINT_FADE_MS,
  )

  useEffect(() => {
    PRINT_DESIGNS.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  if (PRINT_DESIGNS.length === 0) return null

  const renderLayer = (imageIndex: number) => {
    const orientation = orientations[imageIndex] ?? 'landscape'
    const panClass = getPrintPanClass(orientation, imageIndex)

    return (
      <div className={`about-print-cycle-layer ${panClass}`}>
        <img src={PRINT_DESIGNS[imageIndex]} alt="" className="about-print-cycle-img" loading="lazy" />
      </div>
    )
  }

  return (
    <div className="about-print-cycle" aria-hidden="true">
      <div className="about-print-cycle-layer-wrap about-print-cycle-layer-wrap--base">
        {renderLayer(baseIndex)}
      </div>
      {topIndex !== null && (
        <div className={`about-print-cycle-layer-wrap about-print-cycle-layer-wrap--top${topVisible ? ' visible' : ''}`}>
          {renderLayer(topIndex)}
        </div>
      )}
    </div>
  )
}

function DesignLogoCycle() {
  const { baseIndex, topIndex, topVisible } = useCrossfadeCycle(
    DESIGN_LOGOS.length,
    LOGO_HOLD_MS,
    LOGO_FADE_MS,
  )

  const renderLayer = (logoIndex: number) => {
    const logo = DESIGN_LOGOS[logoIndex]

    return (
      <div
        className="about-logo-cycle-layer"
        style={logo.bg ? { background: logo.bg } : undefined}
      >
        <img
          src={logo.src}
          alt=""
          className={`about-logo-cycle-img${logo.large ? ' about-logo-cycle-img--large' : ''}`}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="about-logo-cycle" aria-hidden="true">
      <div className="about-logo-cycle-layer-wrap about-logo-cycle-layer-wrap--base">
        {renderLayer(baseIndex)}
      </div>
      {topIndex !== null && (
        <div className={`about-logo-cycle-layer-wrap about-logo-cycle-layer-wrap--top${topVisible ? ' visible' : ''}`}>
          {renderLayer(topIndex)}
        </div>
      )}
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
          <DesignPrintCycle />
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default Three
