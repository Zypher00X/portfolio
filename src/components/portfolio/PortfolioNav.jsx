import './PortfolioNav.css'

const links = [['Home', 'home'], ['Tech Stack', 'portfolio-details'], ['Project', 'projects']]

export default function PortfolioNav() {
  function navigate(event, id) {
    const section = document.getElementById(id)
    if (!section) return
    event.preventDefault()
    section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  return <nav className="portfolio-nav" aria-label="Portfolio navigation">
    {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={event => navigate(event, id)}>{label}</a>)}
  </nav>
}
