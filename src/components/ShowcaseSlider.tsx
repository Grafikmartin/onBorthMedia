import './ShowcaseSlider.css'
import getwizeImage from '../assets/getwize.ai.png'
import rundblickImage from '../assets/Rundblick.png'
import mbSoundImage from '../assets/mb-sound.jpg'
import benjaminBorthVideo from '../assets/BildschirmaufnahmeBB-kl.mov'
import architekturMVideo from '../assets/ArchitekturM.mp4'
import portfolioVideo from '../assets/Portfolio.mov'
import qbVideo from '../assets/QB-hintergrund.mp4'
import qbteil1Video from '../assets/QBteil1.mp4'
import wetterVideo from '../assets/wetter-copy.mkv'
import pingpongVideo from '../assets/pingpong.mkv'
import radioPulseVideo from '../assets/RadioPulse-kl.mov'
import soundpulseImage from '../assets/soundpulse.png'
import spaceVideo from '../assets/space.mp4'
import tiereTeilenImage from '../assets/TiereTeilen.png'
import vettierioAppImage from '../assets/Vettierio-app.png'

export type ShowcaseItem = {
  id: string
  label: string
  accent?: string
  image?: string
  video?: string
  frame?: 'phone'
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
          <div
            key={`${item.id}-${index}`}
            className={`showcase-slider-card${item.frame === 'phone' ? ' showcase-slider-card--phone' : ''}`}
          >
            {item.frame !== 'phone' && (
              <div className="showcase-slider-card-chrome">
                <span className="showcase-slider-card-dot" />
                <span className="showcase-slider-card-dot" />
                <span className="showcase-slider-card-dot" />
              </div>
            )}
            <div
              className={`showcase-slider-card-preview${item.frame === 'phone' ? ' showcase-slider-card-preview--phone' : ''}`}
              style={!item.video && !item.image && item.accent ? { backgroundColor: item.accent } : undefined}
            >
              {item.frame === 'phone' && (item.image || item.video) ? (
                <div className="showcase-phone-frame">
                  <div className="showcase-phone-screen">
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
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const WEBSITE_SHOWCASE: ShowcaseItem[] = [
  { id: 'web-getwize', label: 'getwize.ai', image: getwizeImage },
  { id: 'web-rundblick', label: 'Rundblick', image: rundblickImage },
  { id: 'web-bb', label: 'Benjamin Borth', video: benjaminBorthVideo },
  { id: 'web-mbsound', label: 'mb-sound', image: mbSoundImage },
  { id: 'web-architektur', label: 'Architektur M', video: architekturMVideo },
  { id: 'web-portfolio', label: 'Portfolio', video: portfolioVideo },
]

export const WEBAPP_SHOWCASE: ShowcaseItem[] = [
  { id: 'app-wetter', label: 'Wetter', video: wetterVideo },
  { id: 'app-pingpong', label: 'Ping Pong', video: pingpongVideo },
  { id: 'app-qb', label: 'QB', video: qbVideo },
  { id: 'app-qb-app', label: 'QB App', video: qbteil1Video, frame: 'phone' },
  { id: 'app-soundpulse', label: 'SoundPulse', image: soundpulseImage, frame: 'phone' },
  { id: 'app-radio', label: 'Radio Pulse', video: radioPulseVideo },
  { id: 'app-space', label: 'Space', video: spaceVideo },
  { id: 'app-tiere-teilen', label: 'Tiere teilen', image: tiereTeilenImage },
  { id: 'app-vettierio', label: 'Vettierio', image: vettierioAppImage, frame: 'phone' },
]

export default ShowcaseSlider
