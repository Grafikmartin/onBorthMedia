import { useState, useRef, useEffect } from 'react'
import './HamburgerMenu.css'

const MENU_ITEMS = [
  { label: 'Webseiten', id: 'webseiten' },
  { label: 'Webapps', id: 'webapps' },
  { label: 'Design', id: 'design' },
  { label: 'Über mich', id: 'ueber-mich' },
  { label: 'Kontakt', id: 'kontakt' },
  { label: 'Impressum', action: 'impressum' as const },
]

type HamburgerMenuProps = {
  onImpressumClick?: () => void
}

function HamburgerMenu({ onImpressumClick }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [onDarkBg, setOnDarkBg] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const closeMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      closeTimeoutRef.current = undefined
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('hamburger-menu-open')
    } else {
      document.body.classList.remove('hamburger-menu-open')
    }
    return () => document.body.classList.remove('hamburger-menu-open')
  }, [isOpen])

  useEffect(() => {
    const updateHeaderTheme = () => {
      const menu = menuRef.current
      if (!menu) return

      const rect = menu.getBoundingClientRect()
      const x = Math.min(Math.max(rect.left + rect.width / 2, 0), window.innerWidth - 1)
      const y = Math.min(Math.max(rect.top + rect.height / 2, 0), window.innerHeight - 1)

      for (const el of document.elementsFromPoint(x, y)) {
        if (menu.contains(el)) continue
        const themed = el.closest('[data-header-bg]')
        if (themed) {
          setOnDarkBg(themed.getAttribute('data-header-bg') === 'dark')
          return
        }
      }

      setOnDarkBg(false)
    }

    updateHeaderTheme()
    window.addEventListener('scroll', updateHeaderTheme, { passive: true })
    window.addEventListener('resize', updateHeaderTheme)
    return () => {
      window.removeEventListener('scroll', updateHeaderTheme)
      window.removeEventListener('resize', updateHeaderTheme)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <div ref={menuRef} className={`hamburger-menu${onDarkBg ? ' hamburger-menu--on-dark' : ''}`}>
      <button
        className="hamburger-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menü öffnen"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>
      {isOpen && (
        <>
          <div
            className="hamburger-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            className={`hamburger-nav ${isClosing ? 'closing' : ''}`}
            onMouseLeave={closeMenu}
          >
            {MENU_ITEMS.map((item, index) => (
              <button
                key={'id' in item ? item.id : `impressum-${index}`}
                className="hamburger-nav-item"
                onClick={() => {
                  if ('action' in item && item.action === 'impressum') {
                    onImpressumClick?.()
                    closeMenu()
                  } else if ('id' in item) {
                    scrollTo(item.id)
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

export default HamburgerMenu
