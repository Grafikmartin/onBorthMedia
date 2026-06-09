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
}

export function SocialCubeButton({
  href,
  label,
  position,
  children,
  external = true,
  inline = false,
}: SocialCubeButtonProps) {
  const containerClass = inline
    ? 'social-cube-container social-cube-container--inline'
    : `social-cube-container social-cube-container--${position}`

  const tooltipClass = inline
    ? 'social-cube-tooltip social-cube-tooltip--inline'
    : `social-cube-tooltip social-cube-tooltip--${position}`

  return (
    <div className="social-cube-item">
      <div className={containerClass}>
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
