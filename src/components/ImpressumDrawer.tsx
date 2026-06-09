import { useState, useEffect } from 'react'
import './ImpressumDrawer.css'

const IMPRESSUM_CONTENT = (
  <>
    <p><strong>Angaben gemäß § 5 TMG</strong></p>
    <p>OnBorthMedia<br />Batensen 4<br />29562 Suhlendorf</p>
    <p><strong>Kontakt</strong><br />E-Mail: kontakt@onborthmedia.de</p>
    <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong><br />[Name], [Adresse]</p>
    <p>Platzhaltertext – bitte durch rechtlich korrekte Angaben ersetzen.</p>
  </>
)

type ImpressumDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

function ImpressumDrawer({ isOpen, onClose }: ImpressumDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(id)
    }
    setIsVisible(false)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`impressum-drawer-overlay ${isVisible ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="impressum-drawer-title"
    >
      <div className="impressum-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="impressum-drawer-panel">
        <h2 id="impressum-drawer-title">Impressum</h2>
        <div className="impressum-drawer-body">
          {IMPRESSUM_CONTENT}
        </div>
        <button type="button" className="impressum-drawer-close" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  )
}

export default ImpressumDrawer
