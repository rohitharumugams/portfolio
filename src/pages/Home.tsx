import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { featuredProjects } from '../content/projects'
import { arcadeMeta } from '../content/arcade'
import { StageCard } from '../components/StageCard'
import './Home.css'

export function Home() {
  const projects = featuredProjects()
  const featured = projects.find((project) => project.slug === 'dopplersim')
  const remaining = projects.filter((project) => project.slug !== 'dopplersim')

  return (
    <div className="title-screen">
      <section className="title-hero">
        <p className="coin">{site.insertCoin}</p>
        <h1>
          {site.shortName}
          <span className="cursor" aria-hidden="true">
            _
          </span>
        </h1>
        <p className="tagline">{site.tagline}</p>
        <div className="title-actions">
          <Link className="pixel-btn primary cursor-target" to="/work">
            VIEW PROJECTS
          </Link>
          <a
            className="pixel-btn cursor-target"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
        </div>
        <p className="hint">
          <span className="blink">▶</span> A FEW THINGS I HAVE BUILT
        </p>
      </section>

      {featured && (
        <section className="preview-panel">
          <div className="panel-label">FEATURED PROJECT</div>
          <div className="preview-body">
            <div>
              <h2>{featured.shortTitle}</h2>
              <p className="preview-boss">
                THE CHALLENGE: {arcadeMeta[featured.slug]?.boss}
              </p>
              <p>{arcadeMeta[featured.slug]?.oneLiner}</p>
            </div>
            <ul className="mini-scores">
              {featured.results.slice(0, 3).map((r) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <strong>{r.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <Link className="pixel-btn primary cursor-target" to={`/work/${featured.slug}`}>
            READ MORE
          </Link>
        </section>
      )}

      <section className="stage-select">
        <div className="panel-label">MORE PROJECTS</div>
        <div className="stage-grid home-project-grid">
          {remaining.map((project) => (
            <StageCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
