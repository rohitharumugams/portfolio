import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, allProjectsSorted } from '../content/projects'
import { arcadeMeta, stars } from '../content/arcade'
import './ProjectPage.css'

const tabs = [
  { id: 'brief', label: 'OVERVIEW' },
  { id: 'scores', label: 'RESULTS' },
  { id: 'walkthrough', label: 'BUILD NOTES' },
  { id: 'gameover', label: 'LIMITATIONS' },
] as const

type TabId = (typeof tabs)[number]['id']

export function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  const [tab, setTab] = useState<TabId>('brief')

  if (!project) {
    return (
      <div className="level-page">
        <h1>404 — PROJECT NOT FOUND</h1>
        <Link className="cursor-target" to="/work">
          BACK TO PROJECTS
        </Link>
      </div>
    )
  }

  const meta = arcadeMeta[project.slug]
  const related = allProjectsSorted().filter((p) =>
    project.related.includes(p.slug),
  )

  return (
    <article className={`level-page color-${meta?.color ?? 'lime'}`}>
      <header className="level-hero">
        <p className="crumb">
          <Link className="cursor-target" to="/work">
            PROJECTS
          </Link>{' '}
          // {meta?.stage}
        </p>
        <p className="genre">{meta?.genre}</p>
        <h1>{project.shortTitle}</h1>
        <p className="one-liner">{meta?.oneLiner}</p>
        <div className="level-meta">
          <span>COMPLEXITY {stars(meta?.difficulty ?? 3)}</span>
          <span>{project.when}</span>
          <span>{project.statusLabel.toUpperCase()}</span>
        </div>
        <p className="boss">THE CHALLENGE: {meta?.boss}</p>
        <div className="level-actions">
          {project.github && (
            <a
              className="pixel-btn cursor-target"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              CODE
            </a>
          )}
          {project.live && (
            <a
              className="pixel-btn primary cursor-target"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              LIVE DEMO
            </a>
          )}
          <Link className="pixel-btn cursor-target" to="/work">
            ALL PROJECTS
          </Link>
        </div>
      </header>

      <div className="tab-bar" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`cursor-target ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        {tab === 'brief' && (
          <>
            <h2>What I built</h2>
            <p>{project.purpose}</p>
            {project.summary.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <h2>Why I built it</h2>
            <p>{project.problem}</p>
            <h2>Tools</h2>
            <p className="chips">{project.stack.join(' · ')}</p>
          </>
        )}

        {tab === 'scores' && (
          <>
            <h2>Results</h2>
            <div className="scoreboard">
              {project.results.map((r, i) => (
                <div key={r.label} className="score-row">
                  <span className="rank">#{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{r.label}</strong>
                    <p>{r.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <h2>What came out of it</h2>
            <ul>
              {project.outcomes.map((o) => (
                <li key={o.slice(0, 28)}>{o}</li>
              ))}
            </ul>
          </>
        )}

        {tab === 'walkthrough' && (
          <>
            <h2>Decisions I made</h2>
            <ul>
              {project.decisions.map((d) => (
                <li key={d.slice(0, 28)}>{d}</li>
              ))}
            </ul>
            <h2>Architecture</h2>
            <ul>
              {project.implementation.architecture.map((a) => (
                <li key={a.slice(0, 28)}>{a}</li>
              ))}
            </ul>
            <h2>Main components</h2>
            <div className="npc-grid">
              {project.implementation.components.map((c) => (
                <div key={c.name} className="npc">
                  <strong>{c.name}</strong>
                  <p>{c.detail}</p>
                </div>
              ))}
            </div>
            <h2>Running it locally</h2>
            <ul>
              {project.implementation.howItRuns.map((h) => (
                <li key={h.slice(0, 28)}>{h}</li>
              ))}
            </ul>
          </>
        )}

        {tab === 'gameover' && (
          <>
            <h2>Limitations</h2>
            <ul>
              {project.limits.map((l) => (
                <li key={l.slice(0, 28)}>{l}</li>
              ))}
            </ul>
            <h2>Links and artifacts</h2>
            <ul className="loot">
              {project.artifacts.map((a) => (
                <li key={a.label}>
                  {a.href ? (
                    <a
                      className="cursor-target"
                      href={a.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.label}
                    </a>
                  ) : (
                    <strong>{a.label}</strong>
                  )}
                  {a.note ? ` — ${a.note}` : ''}
                </li>
              ))}
            </ul>
            <div className="media-slot">
              <p>PROJECT SCREENSHOTS COMING SOON</p>
            </div>
          </>
        )}
      </div>

      {related.length > 0 && (
        <section className="warps">
          <h2>Related projects</h2>
          <div className="warp-list">
            {related.map((r) => (
              <Link
                key={r.slug}
                className="cursor-target"
                to={`/work/${r.slug}`}
              >
                {arcadeMeta[r.slug]?.stage} · {r.shortTitle}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
