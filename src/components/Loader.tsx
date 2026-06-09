import './Loader.css'

type LoaderProps = {
  hiding?: boolean
}

function Loader({ hiding = false }: LoaderProps) {
  return (
    <div
      className={`loader-overlay${hiding ? ' loader-overlay--hiding' : ''}`}
      aria-hidden="true"
    >
      <div className="loader-wrapper">
        <div className="loader-circle loader-circle--black" />
        <div className="loader-circle loader-circle--red" />
        <div className="loader-circle loader-circle--white" />
        <div className="loader-shadow" />
        <div className="loader-shadow" />
        <div className="loader-shadow" />
      </div>
    </div>
  )
}

export default Loader
