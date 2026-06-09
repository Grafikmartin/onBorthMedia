const RAINBOW_DOT_COLORS = [
  '#FFE600',
  '#00E8FF',
  '#FF4DFF',
  '#00FF88',
  '#FF6B00',
  '#4DFF4D',
]

export function getStyleguideVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function getBrandDotColors(): string[] {
  return [
    getStyleguideVar('--farbe-primary'),
    getStyleguideVar('--farbe-2'),
    ...RAINBOW_DOT_COLORS,
  ]
}

export function getBrandGridColors(): string[] {
  return [
    getStyleguideVar('--farbe-1'),
    getStyleguideVar('--farbe-primary'),
    getStyleguideVar('--farbe-2'),
    'transparent',
  ]
}
