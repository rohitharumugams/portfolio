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
            PRESS START
          </Link>
          <a
            className="pixel-btn cursor-target"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            HIGH SCORES (GH)
          </a>
        </div>
        <p className="hint">
          <span className="blink">▶</span> SELECT A STAGE BELOW
        </p>
      </section>

      <section className="stage-select">
        <div className="panel-label">STAGE SELECT · FEATURED</div>
        <div className="stage-grid">
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
          <div className="panel-label">NOW LOADING · STAGE {meta.stage}</div>
          <div className="preview-body">
            <div>
              <h2>{preview.shortTitle}</h2>
              <p className="preview-boss">BOSS: {meta.boss}</p>
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
            ENTER STAGE
          </Link>
        </section>
      )}
    </div>
  )
}
