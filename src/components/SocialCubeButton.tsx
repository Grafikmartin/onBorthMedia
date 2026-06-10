import type { ReactNode } from 'react'
import './SocialCubeButton.css'

type Position = 'left' | 'center' | 'right'

type SocialCubeButtonProps = {
  href: string
  label: string
  position: Position
  children: ReactNode
  external?: boolean
  inline?: boolean
  accentArrows?: boolean
}

function AccentArrow() {
  return (
    <svg width="42" height="52" viewBox="0 0 12 20" aria-hidden="true">
      <path
        d="M6 1.5V13.5M2.5 10L6 15.5L9.5 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SocialCubeButton({
  href,
  label,
  position,
  children,
  external = true,
  inline = false,
  accentArrows = false,
}: SocialCubeButtonProps) {
  const containerClass = inline
    ? 'social-cube-container social-cube-container--inline'
    : `social-cube-container social-cube-container--${position}`

  const tooltipClass = inline
    ? 'social-cube-tooltip social-cube-tooltip--inline'
    : `social-cube-tooltip social-cube-tooltip--${position}`

  return (
    <div className={`social-cube-item${accentArrows ? ' social-cube-item--accent' : ''}`}>
      <div className={containerClass}>
        {accentArrows && (
          <span className="social-cube-arrow social-cube-arrow--top" aria-hidden="true">
            <AccentArrow />
          </span>
        )}
        <ul className="social-icons">
          <li>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={label}
            >
              <span>{children}</span>
              <span aria-hidden="true">{children}</span>
              <span aria-hidden="true">{children}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={tooltipClass}>{label}</div>
    </div>
  )
}
