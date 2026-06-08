import { useState, useEffect } from 'react'
import './Footer.css'

const LEGAL_IMPRESSUM = {
  title: 'Impressum',
  content: (
    <>
      <p><strong>Angaben gemäß § 5 TMG</strong></p>
      <p>OnBorthMedia<br />[Adresse]<br />[PLZ Ort]</p>
      <p><strong>Kontakt</strong><br />E-Mail: kontakt@onborthmedia.de</p>
      <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong><br />[Name], [Adresse]</p>
      <p>Platzhaltertext – bitte durch rechtlich korrekte Angaben ersetzen.</p>
    </>
  ),
}

const LEGAL_DATENSCHUTZ = {
  title: 'Datenschutz',
  content: (
    <>
      <p><strong>1. Verantwortliche Stelle</strong></p>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist OnBorthMedia. Kontaktmöglichkeiten finden Sie im Impressum.</p>
      <p><strong>2. Erhebung und Speicherung personenbezogener Daten</strong></p>
      <p>Beim Besuch dieser Website werden durch den Browser automatisch Informationen an den Server übermittelt. Diese umfassen unter anderem Datum und Uhrzeit des Abrufs, Browsertyp und -version sowie die zuvor aufgerufene Seite.</p>
      <p><strong>3. Ihre Rechte</strong></p>
      <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Bei Fragen wenden Sie sich bitte an die im Impressum genannte Kontaktadresse.</p>
    </>
  ),
}

const LEGAL_COOKIE = {
  title: 'Cookie-Richtlinie',
  content: (
    <>
      <p>Diese Website setzt selbst keine Cookies.</p>
      <p>Bei der Nutzung externer Dienste (z. B. eingebettete Inhalte) können Drittanbieter Cookies setzen. Informationen dazu finden Sie in den jeweiligen Datenschutzhinweisen der Anbieter.</p>
    </>
  ),
}

function Footer() {
  const [isSticky, setIsSticky] = useState(false)
  const [legalOpen, setLegalOpen] = useState<null | 'impressum' | 'datenschutz' | 'cookie'>(null)

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>
    const viewportHeight = window.innerHeight
    const stickyPoint = viewportHeight * 6

    const update = () => {
      setIsSticky(window.scrollY >= stickyPoint)
    }

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      update()
      scrollTimeout = setTimeout(update, 150)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <footer className="footer-section">
      <div
        className="footer"
        style={{
          position: isSticky ? 'fixed' : 'relative',
          bottom: isSticky ? 0 : undefined,
          left: isSticky ? 0 : undefined,
          width: isSticky ? '100%' : undefined,
          zIndex: isSticky ? 380 : 2001,
        }}
      >
        <p className="footer-legal">
          <button type="button" className="footer-legal-link" onClick={() => setLegalOpen('impressum')}>Impressum</button>
          {' | '}
          <button type="button" className="footer-legal-link" onClick={() => setLegalOpen('datenschutz')}>Datenschutz</button>
          {' | '}
          <button type="button" className="footer-legal-link" onClick={() => setLegalOpen('cookie')}>Cookie-Richtlinie</button>
        </p>
        <p className="footer-text">OnBorthMedia – gemeinsam auf Kurs.</p>
      </div>

      {legalOpen && (
        <div
          className="footer-legal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-legal-title"
        >
          <div className="footer-legal-backdrop" onClick={() => setLegalOpen(null)} aria-hidden="true" />
          <div className="footer-legal-panel">
            <h2 id="footer-legal-title" className="footer-legal-panel-title">
              {legalOpen === 'impressum' && LEGAL_IMPRESSUM.title}
              {legalOpen === 'datenschutz' && LEGAL_DATENSCHUTZ.title}
              {legalOpen === 'cookie' && LEGAL_COOKIE.title}
            </h2>
            <div className="footer-legal-panel-body">
              {legalOpen === 'impressum' && LEGAL_IMPRESSUM.content}
              {legalOpen === 'datenschutz' && LEGAL_DATENSCHUTZ.content}
              {legalOpen === 'cookie' && LEGAL_COOKIE.content}
            </div>
            <button type="button" className="footer-legal-close" onClick={() => setLegalOpen(null)}>Schließen</button>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
