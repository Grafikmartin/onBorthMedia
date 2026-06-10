import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { SocialCubeButton } from './SocialCubeButton'
import linkedinDefault from '../assets/icons8-linkedin-250.png'
import linkedinHover from '../assets/icons8-linkedin-250-black.png'

type SocialLinksProps = {
  layout?: 'fixed' | 'inline'
}

export function SocialLinks({ layout = 'inline' }: SocialLinksProps) {
  const isInline = layout === 'inline'
  const wrapperClass = isInline ? 'social-links-row' : 'social-links-fixed'

  return (
    <div className={wrapperClass}>
      <SocialCubeButton
        href="mailto:kontakt@onborthmedia.de?subject=Projektanfrage%20OnBorthMedia"
        label="E-Mail"
        position="left"
        external={false}
        inline={isInline}
        accentArrows
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </SocialCubeButton>
      <SocialCubeButton
        href="https://www.linkedin.com/in/martin-borth-800b9737b/"
        label="LinkedIn"
        position="center"
        inline={isInline}
      >
        <img
          src={linkedinDefault}
          alt=""
          className="linkedin-icon linkedin-icon--default"
        />
        <img
          src={linkedinHover}
          alt=""
          className="linkedin-icon linkedin-icon--hover"
          style={{ position: 'absolute' }}
        />
      </SocialCubeButton>
      <SocialCubeButton
        href="https://github.com/Grafikmartin"
        label="GitHub"
        position="right"
        inline={isInline}
      >
        <FontAwesomeIcon icon={faGithub} />
      </SocialCubeButton>
    </div>
  )
}
