import './ShowcaseSlider.css'
import wetterVideo from '../assets/wetter-copy.mkv'
import pingpongVideo from '../assets/pingpong.mkv'
import radioPulseVideo from '../assets/RadioPulse.mkv'
import spaceVideo from '../assets/space.mkv'

export type ShowcaseItem = {
  id: string
  label: string
  accent?: string
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
              style={!item.video && item.accent ? { backgroundColor: item.accent } : undefined}
            >
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
  { id: 'web-1', label: 'Unternehmensseite', accent: '#f0f0f0' },
  { id: 'web-2', label: 'Portfolio', accent: '#e8e8e8' },
  { id: 'web-3', label: 'Landingpage', accent: '#E62727' },
  { id: 'web-4', label: 'Onepager', accent: '#1a1a1a' },
  { id: 'web-5', label: 'Microsite', accent: '#f5f5f5' },
  { id: 'web-6', label: 'Relaunch', accent: '#ffffff' },
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
