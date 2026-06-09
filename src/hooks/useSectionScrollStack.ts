import { useState, useEffect, type RefObject } from 'react'

export function useSectionScrollStack(sectionRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(0.7)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>

    const updateScale = () => {
      const section = sectionRef.current
      if (!section) return

      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const scaleStart = sectionTop - viewportHeight

      if (scrollY >= sectionTop) {
        setIsSticky(true)
        setScale(1.0)
      } else {
        setIsSticky(false)
        const scrollProgress = Math.min(
          Math.max((scrollY - scaleStart) / viewportHeight, 0),
          1,
        )
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
    window.addEventListener('resize', updateScale)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScale)
      clearTimeout(scrollTimeout)
    }
  }, [sectionRef])

  return { scale, isScrolling, isSticky }
}
