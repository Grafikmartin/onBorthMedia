import { useState, useEffect } from 'react'
import './VideoGrid.css'

const DESKTOP_ROWS = 5
const DESKTOP_COLS = 7
const MOBILE_ROWS = 9
const MOBILE_COLS = 5

const GRID_COLORS = ['#000000', '#E62727', '#ffffff', 'transparent']
const SOLID_COLORS = ['#000000', '#E62727', '#ffffff']

function getGridDimensions(width: number) {
  const mobile = width <= 768
  return {
    rows: mobile ? MOBILE_ROWS : DESKTOP_ROWS,
    cols: mobile ? MOBILE_COLS : DESKTOP_COLS,
  }
}

// 4. Spalte von links, 3. Zeile von oben (1-basiert)
function getFreeCellIndex(cols: number): number {
  return (3 - 1) * cols + (4 - 1)
}

// 9 Kästchen: Reihen 3–5 von oben, Spalten 4–6 von links (auf schmalen Grids mittlere 3)
function getPulseCellIndices(rows: number, cols: number): number[] {
  const pulseRows = [3, 4, 5]
  const pulseCols = cols >= 6 ? [4, 5, 6] : [2, 3, 4]

  const indices: number[] = []
  for (const row of pulseRows) {
    if (row > rows) continue
    for (const col of pulseCols) {
      if (col > cols) continue
      indices.push((row - 1) * cols + (col - 1))
    }
  }
  return indices
}

function getInitialColors(rows: number, cols: number): string[] {
  const total = rows * cols
  const freeIndex = getFreeCellIndex(cols)
  const pulseIndices = new Set(getPulseCellIndices(rows, cols))

  return Array.from({ length: total }, (_, index) => {
    if (index === freeIndex) return 'transparent'
    if (pulseIndices.has(index)) {
      return SOLID_COLORS[Math.floor(Math.random() * SOLID_COLORS.length)]
    }
    return GRID_COLORS[Math.floor(Math.random() * GRID_COLORS.length)]
  })
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
  const [gridSize, setGridSize] = useState(() =>
    getGridDimensions(typeof window !== 'undefined' ? window.innerWidth : 1200),
  )
  const [cellColors, setCellColors] = useState(() =>
    getInitialColors(gridSize.rows, gridSize.cols),
  )

  useEffect(() => {
    const updateGridSize = () => {
      setGridSize((prev) => {
        const next = getGridDimensions(window.innerWidth)
        if (prev.rows === next.rows && prev.cols === next.cols) return prev
        return next
      })
    }

    updateGridSize()
    window.addEventListener('resize', updateGridSize)
    return () => window.removeEventListener('resize', updateGridSize)
  }, [])

  useEffect(() => {
    setCellColors(getInitialColors(gridSize.rows, gridSize.cols))
  }, [gridSize.rows, gridSize.cols])

  const freeCellIndex = getFreeCellIndex(gridSize.cols)
  const pulseCellIndices = getPulseCellIndices(gridSize.rows, gridSize.cols)
  const pulseCellSet = new Set(pulseCellIndices)

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const intervals: ReturnType<typeof setInterval>[] = []
    const totalCells = gridSize.rows * gridSize.cols

    const changeColor = (index: number) => {
      if (index === freeCellIndex) return

      if (pulseCellSet.has(index)) {
        setCellColors((prev) => {
          const next = [...prev]
          next[index] =
            prev[index] === 'transparent' ? pickSolidColor(prev[index]) : 'transparent'
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

    for (let index = 0; index < totalCells; index++) {
      if (index === freeCellIndex) continue

      const isPulse = pulseCellSet.has(index)
      const baseInterval = isPulse
        ? 700 + Math.random() * 800
        : 1500 + Math.random() * 2500
      const initialDelay = Math.random() * (isPulse ? 1000 : 2000)
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
  }, [gridSize.rows, gridSize.cols, freeCellIndex, pulseCellIndices.join(',')])

  return (
    <div
      className="video-grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {cellColors.map((color, index) => (
        <div
          key={index}
          className={`video-grid-cell${index === freeCellIndex ? ' video-grid-cell--free' : ''}${pulseCellSet.has(index) ? ' video-grid-cell--pulse' : ''}`}
          style={{
            backgroundColor: index === freeCellIndex ? 'transparent' : color,
            transition: index === freeCellIndex ? 'none' : 'background-color 1s ease-in-out',
          }}
        />
      ))}
    </div>
  )
}

export default VideoGrid
