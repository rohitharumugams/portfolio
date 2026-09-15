import { site } from '../content/site'
import { experience } from '../content/experience'
import './About.css'

export function About() {
  return (
    <div className="player-page">
      <header>
        <p className="overlabel">CHARACTER SHEET</p>
        <h1>{site.playerTag}</h1>
        <p className="player-name">{site.name}</p>
      </header>

      <section className="stat-block">
        {site.bio.map((line) => (
          <p key={line.slice(0, 20)}>{line}</p>
        ))}
      </section>

      <section>
        <h2>SAVE POINTS · EDUCATION</h2>
        <div className="save-grid">
          {site.education.map((ed) => (
            <div key={ed.school} className="save-card">
              <span>{ed.when}</span>
              <strong>{ed.school}</strong>
              <p>
                {ed.degree}
                <br />
                {ed.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>SIDE QUESTS · EXPERIENCE</h2>
        {experience.map((job) => (
          <div key={job.id} className="quest">
            <div className="quest-top">
              <strong>
                {job.title} @ {job.org}
              </strong>
              <span>{job.when}</span>
            </div>
            <p className="place">{job.place}</p>
            <ul>
              {job.bullets.map((b) => (
                <li key={b.slice(0, 40)}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>INVENTORY · LOADOUT</h2>
        <div className="inventory">
          {site.loadout.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>ACHIEVEMENTS UNLOCKED</h2>
        <ul className="achievements">
          {site.unlocks.map((u) => (
            <li key={u.slice(0, 30)}>
              <span>★</span> {u}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>CONTINUE?</h2>
        <p>
          <a className="cursor-target" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <div className="continue-row">
          <a
            className="pixel-btn cursor-target"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a
            className="pixel-btn cursor-target"
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>
          <a className="pixel-btn primary cursor-target" href={`mailto:${site.email}`}>
            SEND PING
          </a>
        </div>
      </section>
    </div>
  )
}
