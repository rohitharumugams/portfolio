import { allProjectsSorted } from '../content/projects'
import { StageCard } from '../components/StageCard'
import './Work.css'

export function Work() {
  const projects = allProjectsSorted()

  return (
    <div className="stages-page">
      <header className="stages-intro">
        <p className="overlabel">SELECTED WORK</p>
        <h1>PROJECTS</h1>
        <p>
          These are projects I built to learn a system by implementing it. Each
          write-up covers the decisions I made, the results I measured, and the
          parts I would improve next.
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
