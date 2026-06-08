import { useState, useEffect, useRef } from 'react'
import './VideoGrid.css'

const ROWS = 5
const COLS = 7
const TOTAL_CELLS = ROWS * COLS

const GRID_COLORS = ['#000000', '#E62727', '#ffffff', 'transparent']
const SOLID_COLORS = ['#000000', '#E62727', '#ffffff']

// 4. Spalte von links, 3. Zeile von oben (1-basiert)
const FREE_CELL_INDEX = (3 - 1) * COLS + (4 - 1)
// 3. Spalte von rechts, 3. Zeile von oben (1-basiert)
const PULSE_TRANSPARENT_CELL_INDEX = (3 - 1) * COLS + (COLS - 3)

function getInitialColors(): string[] {
  return Array.from({ length: TOTAL_CELLS }, (_, index) => {
    if (index === FREE_CELL_INDEX) return 'transparent'
    if (index === PULSE_TRANSPARENT_CELL_INDEX) {
      return SOLID_COLORS[Math.floor(Math.random() * SOLID_COLORS.length)]
    }
    return GRID_COLORS[Math.floor(Math.random() * GRID_COLORS.length)]
  })
}

function isFreeCell(index: number): boolean {
  return index === FREE_CELL_INDEX
}

function isPulseTransparentCell(index: number): boolean {
  return index === PULSE_TRANSPARENT_CELL_INDEX
}

function pickNextColor(current: string): string {
  const options = GRID_COLORS.filter((c) => c !== current)
  return options[Math.floor(Math.random() * options.length)]
}

function pickSolidColor(current: string): string {
  const options = SOLID_COLORS.filter((c) => c !== current)
  return options[Math.floor(Math.random() * options.length)]
}

function VideoGrid() {
  const [cellColors, setCellColors] = useState(getInitialColors)
  const pulseChangeCountRef = useRef(0)

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const intervals: ReturnType<typeof setInterval>[] = []

    const changeColor = (index: number) => {
      if (isFreeCell(index)) return

      if (isPulseTransparentCell(index)) {
        pulseChangeCountRef.current += 1
        setCellColors((prev) => {
          const next = [...prev]
          if (pulseChangeCountRef.current % 2 === 0) {
            next[index] = 'transparent'
          } else {
            next[index] = pickSolidColor(prev[index])
          }
          return next
        })
        return
      }

      setCellColors((prev) => {
        const next = [...prev]
        next[index] = pickNextColor(prev[index])
        return next
      })
    }

    for (let index = 0; index < TOTAL_CELLS; index++) {
      if (isFreeCell(index)) continue
      const baseInterval = 1500 + Math.random() * 2500
      const initialDelay = Math.random() * 2000
      const first = setTimeout(() => {
        changeColor(index)
        intervals.push(setInterval(() => changeColor(index), baseInterval))
      }, initialDelay + index * 40)
      timeouts.push(first)
    }

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
      intervals.forEach((i) => clearInterval(i))
    }
  }, [])

  return (
    <div className="video-grid" aria-hidden="true">
      {cellColors.map((color, index) => (
        <div
          key={index}
          className={`video-grid-cell${isFreeCell(index) ? ' video-grid-cell--free' : ''}${isPulseTransparentCell(index) ? ' video-grid-cell--pulse' : ''}`}
          style={{
            backgroundColor: isFreeCell(index) ? 'transparent' : color,
            transition: isFreeCell(index) ? 'none' : 'background-color 1s ease-in-out',
          }}
        />
      ))}
    </div>
  )
}

export default VideoGrid
