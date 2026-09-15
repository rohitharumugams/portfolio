import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TargetCursor from './components/TargetCursor/TargetCursor'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { ProjectPage } from './pages/ProjectPage'
import { About } from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.2}
        cursorColor="#39ff14"
        cursorColorOnTarget="#00e5ff"
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
