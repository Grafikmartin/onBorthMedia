import './ShowcaseSlider.css'
import getwizeImage from '../assets/getwize.ai.png'
import mbSoundImage from '../assets/mb-sound.jpg'
import benjaminBorthVideo from '../assets/BildschirmaufnahmeBB.mov'
import architekturMVideo from '../assets/ArchitekturM.mp4'
import portfolioVideo from '../assets/Portfolio.mov'
import wetterVideo from '../assets/wetter-copy.mkv'
import pingpongVideo from '../assets/pingpong.mkv'
import radioPulseVideo from '../assets/RadioPulse.mkv'
import spaceVideo from '../assets/space.mkv'

export type ShowcaseItem = {
  id: string
  label: string
  accent?: string
  image?: string
  video?: string
}

type ShowcaseSliderProps = {
  items: ShowcaseItem[]
  variant?: 'light' | 'dark' | 'muted'
}

function ShowcaseSlider({ items, variant = 'light' }: ShowcaseSliderProps) {
  const trackItems = [...items, ...items]

  return (
    <div className={`showcase-slider showcase-slider--${variant}`} aria-hidden="true">
      <div className="showcase-slider-track">
        {trackItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="showcase-slider-card">
            <div className="showcase-slider-card-chrome">
              <span className="showcase-slider-card-dot" />
              <span className="showcase-slider-card-dot" />
              <span className="showcase-slider-card-dot" />
            </div>
            <div
              className="showcase-slider-card-preview"
              style={!item.video && !item.image && item.accent ? { backgroundColor: item.accent } : undefined}
            >
              {item.image && (
                <img
                  className="showcase-slider-card-image"
                  src={item.image}
                  alt=""
                  loading="lazy"
                />
              )}
              {item.video && (
                <video
                  className="showcase-slider-card-video"
                  src={item.video}
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              )}
              <span className="showcase-slider-card-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const WEBSITE_SHOWCASE: ShowcaseItem[] = [
  { id: 'web-getwize', label: 'getwize.ai', image: getwizeImage },
  { id: 'web-bb', label: 'Benjamin Borth', video: benjaminBorthVideo },
  { id: 'web-mbsound', label: 'mb-sound', image: mbSoundImage },
  { id: 'web-architektur', label: 'Architektur M', video: architekturMVideo },
  { id: 'web-portfolio', label: 'Portfolio', video: portfolioVideo },
]

export const WEBAPP_SHOWCASE: ShowcaseItem[] = [
  { id: 'app-wetter', label: 'Wetter', video: wetterVideo },
  { id: 'app-pingpong', label: 'Ping Pong', video: pingpongVideo },
  { id: 'app-radio', label: 'Radio Pulse', video: radioPulseVideo },
  { id: 'app-space', label: 'Space', video: spaceVideo },
]

export const DESIGN_SHOWCASE: ShowcaseItem[] = [
  { id: 'des-1', label: 'Logo', accent: '#000000' },
  { id: 'des-2', label: 'Corporate Design', accent: '#E62727' },
  { id: 'des-3', label: 'Typografie', accent: '#f0f0f0' },
  { id: 'des-4', label: 'Styleguide', accent: '#ffffff' },
  { id: 'des-5', label: 'Visitenkarte', accent: '#1a1a1a' },
  { id: 'des-6', label: 'Markenauftritt', accent: '#E62727' },
]

export default ShowcaseSlider
