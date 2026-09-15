import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { arcadeMeta, stars } from '../content/arcade'
import './StageCard.css'

const colorVar: Record<string, string> = {
  lime: 'var(--lime)',
  pink: 'var(--pink)',
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  violet: 'var(--violet)',
}

export function StageCard({
  project,
  selected = false,
  onFocus,
}: {
  project: Project
  selected?: boolean
  onFocus?: () => void
}) {
  const meta = arcadeMeta[project.slug]
  const accent = colorVar[meta?.color ?? 'lime']

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`stage-card cursor-target ${selected ? 'is-selected' : ''}`}
      style={{ ['--stage-accent' as string]: accent }}
      onMouseEnter={onFocus}
      onFocus={onFocus}
    >
      <div className="stage-card-top">
        <span className="stage-num">PROJECT {meta?.stage ?? '--'}</span>
        <span className="stage-diff" title="Difficulty">
          {stars(meta?.difficulty ?? 3)}
        </span>
      </div>
      <h3>{project.shortTitle}</h3>
      <p className="stage-genre">{meta?.genre}</p>
      <p className="stage-line">{meta?.oneLiner}</p>
      <div className="stage-card-foot">
        <span>READ MORE ▸</span>
        {project.live ? <span className="live-badge">LIVE</span> : null}
      </div>
    </Link>
  )
}
