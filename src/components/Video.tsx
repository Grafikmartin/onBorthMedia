import { useState, useEffect, useRef } from 'react'
import './Video.css'
import VideoGrid from './VideoGrid'
import videoSrc from '../assets/mb.mp4'

const VIDEO_SOURCES = [videoSrc]

function Video() {
  const [scale, setScale] = useState(0.7)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

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
    let scrollTimeout: ReturnType<typeof setTimeout>
    const viewportHeight = window.innerHeight
    const stickyPoint = viewportHeight

    const updateScale = () => {
      const scrollY = window.scrollY
      const visible = scrollY > 0
      setIsVisible(visible)
      if (scrollY >= stickyPoint) {
        setIsSticky(true)
        setScale(1.0)
      } else {
        setIsSticky(false)
        const scrollProgress = Math.min(scrollY / stickyPoint, 1)
        setScale(0.7 + scrollProgress * 0.3)
      }
    }

    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      updateScale()
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        updateScale()
      }, 150)
    }

    updateScale()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <section className="video-section">
      <div
        className="video-wrapper"
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
