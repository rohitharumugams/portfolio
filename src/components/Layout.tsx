import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '../content/site'
import './Layout.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="cabinet">
      <div className="crt" aria-hidden="true">
        <div className="crt-scan" />
        <div className="crt-vignette" />
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>
            {site.marquee} · {site.insertCoin} ·{' '}
          </span>
          <span>
            {site.marquee} · {site.insertCoin} ·{' '}
          </span>
        </div>
      </div>

      <header className="topbar">
        <Link to="/" className="logo cursor-target">
          <span className="logo-tag">{site.playerTag}</span>
          <span className="logo-name">{site.shortName}</span>
        </Link>
        <nav className="menu">
          <NavLink to="/" end className="cursor-target">
            HOME
          </NavLink>
          <NavLink to="/work" className="cursor-target">
            PROJECTS
          </NavLink>
          <NavLink to="/about" className="cursor-target">
            ABOUT
          </NavLink>
          <a className="cursor-target" href={`mailto:${site.email}`}>
            EMAIL
          </a>
        </nav>
      </header>

      <main className="screen">{children}</main>

      <footer className="hud-foot">
        <span>© {site.name}</span>
        <div className="hud-links">
          <a
            className="cursor-target"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GH
          </a>
          <a
            className="cursor-target"
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LI
          </a>
          <a className="cursor-target" href={`mailto:${site.email}`}>
            MAIL
          </a>
        </div>
      </footer>
    </div>
  )
}
