import { allProjectsSorted } from '../content/projects'
import { StageCard } from '../components/StageCard'
import './Work.css'

export function Work() {
  const projects = allProjectsSorted()

  return (
    <div className="stages-page">
      <header className="stages-intro">
        <p className="overlabel">WORLD MAP</p>
        <h1>SELECT STAGE</h1>
        <p>
          Seven builds. Pick one, read the briefing, check the high scores.
          This is not a PDF in a trench coat.
        </p>
      </header>
      <div className="stage-grid">
        {projects.map((project) => (
          <StageCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
