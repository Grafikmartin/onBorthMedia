import './SectionDots.css'
import logoSvg from '../assets/Logo-weißerPunkt.svg'

function SectionDots() {
  return (
    <img
      src={logoSvg}
      alt=""
      className="section-logo"
      aria-hidden="true"
    />
  )
}

export default SectionDots
