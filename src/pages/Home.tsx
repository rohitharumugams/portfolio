import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { featuredProjects } from '../content/projects'
import { arcadeMeta } from '../content/arcade'
import { StageCard } from '../components/StageCard'
import './Home.css'

export function Home() {
  const stages = featuredProjects()
  const [active, setActive] = useState(stages[0]?.slug ?? '')
  const preview = stages.find((s) => s.slug === active) ?? stages[0]
  const meta = preview ? arcadeMeta[preview.slug] : undefined

  return (
    <div className="title-screen">
      <section className="title-hero">
        <p className="coin">{site.insertCoin}</p>
        <p className="cabinet-label">{site.cabinetTitle}</p>
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

      <section className="stage-select">
        <div className="panel-label">FEATURED PROJECTS</div>
        <div className="stage-grid home-project-grid">
          {stages.map((project) => (
            <StageCard
              key={project.slug}
              project={project}
              selected={project.slug === active}
              onFocus={() => setActive(project.slug)}
            />
          ))}
        </div>
      </section>

      {preview && meta && (
        <section className="preview-panel">
          <div className="panel-label">PROJECT {meta.stage}</div>
          <div className="preview-body">
            <div>
              <h2>{preview.shortTitle}</h2>
              <p className="preview-boss">THE CHALLENGE: {meta.boss}</p>
              <p>{meta.oneLiner}</p>
            </div>
            <ul className="mini-scores">
              {preview.results.slice(0, 3).map((r) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <strong>{r.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <Link className="pixel-btn primary cursor-target" to={`/work/${preview.slug}`}>
            READ MORE
          </Link>
        </section>
      )}
    </div>
  )
}
