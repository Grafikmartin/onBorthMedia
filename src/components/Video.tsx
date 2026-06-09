import { useState, useEffect, useRef } from 'react'
import './Video.css'
import VideoGrid from './VideoGrid'
import videoSrc from '../assets/mb-kl3.mov'
import { useSectionScrollStack } from '../hooks/useSectionScrollStack'

const VIDEO_SOURCES = [videoSrc]

function Video() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const { scale, isScrolling, isSticky } = useSectionScrollStack(sectionRef)
  const [isVisible, setIsVisible] = useState(false)

  const handleVideoEnded = (index: number) => {
    if (index !== currentVideoIndex) return
    const nextIndex = (currentVideoIndex + 1) % VIDEO_SOURCES.length
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentVideoIndex(nextIndex)
      setIsTransitioning(false)
    }, 1200)
  }

  useEffect(() => {
    if (isTransitioning) {
      const nextIndex = (currentVideoIndex + 1) % VIDEO_SOURCES.length
      const incomingVideo = videoRefs.current[nextIndex]
      if (incomingVideo) {
        incomingVideo.currentTime = 0
        incomingVideo.play().catch(() => {})
      }
    } else {
      const currentVideo = videoRefs.current[currentVideoIndex]
      if (currentVideo && currentVideo.paused) {
        currentVideo.currentTime = 0
        currentVideo.play().catch(() => {})
      }
    }
  }, [currentVideoIndex, isTransitioning])

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 0)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <section ref={sectionRef} className="video-section">
      <div
        className="video-wrapper"
        data-header-bg="dark"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          transform: isSticky 
            ? 'none' 
            : isVisible 
              ? `scale(${scale}) translateY(0)` 
              : `scale(${scale}) translateY(100vh)`,
          transformOrigin: 'top center',
          transition: isScrolling || isSticky ? 'none' : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: isSticky ? 'auto' : 'transform',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          pointerEvents: isVisible ? 'auto' : 'none',
          zIndex: 100,
        }}
      >
        <div className="video-stack">
          {VIDEO_SOURCES.map((src, i) => {
            const nextIdx = (currentVideoIndex + 1) % VIDEO_SOURCES.length
            const isActive = i === currentVideoIndex && !isTransitioning
            const isEntering = isTransitioning && i === nextIdx
            const isExiting = isTransitioning && i === currentVideoIndex
            const show = isActive || isEntering || isExiting
            return (
              <video
                key={i}
                ref={(el) => { videoRefs.current[i] = el }}
                src={src}
                muted
                playsInline
                className={`video-element ${show ? 'visible' : ''} ${isEntering ? 'entering' : ''} ${isExiting ? 'exiting' : ''}`}
                onEnded={() => handleVideoEnded(i)}
              >
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
            )
          })}
        </div>
        <div className="video-vignette" aria-hidden="true" />
        <VideoGrid />
      </div>
    </section>
  )
}

export default Video
