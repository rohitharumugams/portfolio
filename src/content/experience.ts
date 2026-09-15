export type Experience = {
  id: string
  title: string
  org: string
  place: string
  when: string
  href?: string
  live?: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    id: 'cmu-doppler',
    title: 'Research Intern',
    org: 'Carnegie Mellon University',
    place: 'Pennsylvania, US',
    when: 'Mar 2025 — Present',
    href: 'https://github.com/rohitharumugams/dopplersim_2.0',
    live: 'https://dopplersim.site/',
    bullets: [
      'Designed DopplerSim, a physics-based simulator that inverts vehicle pass-bys to recover intrinsic spectra and re-renders them under new speed, distance, timing, and free-path trajectories — 78% envelope correlation and 65% spectral overlap on 192 held-out recordings.',
      'Trained models to estimate vehicle speed from roadside audio using mixed real data and DopplerSim synthetic clips, cutting RMSE from 11.25 to 6.84 km/h.',
      'Estimated vehicle length from pass-by acoustics with gradient boosting (319/81 train/test, 13 types), reaching 11 cm mean error (2.5% of true length).',
      'Developed a single-mic traffic separation and counting network, achieving count MAE 0.78 and 42% exact match on 200 scenes with 1–6 vehicles.',
    ],
  },
  {
    id: 'iitkgp',
    title: 'Research Intern',
    org: 'Indian Institute of Technology Kharagpur',
    place: 'West Bengal, India',
    when: 'May 2024 — Jul 2024',
    bullets: [
      'Trained CatBoost multiclass models on survey data to predict shifts in preference and fairness judgments, reaching 96–99% test accuracy.',
      'Created a SHAP explainability pipeline to identify survey features most influencing each predicted preference and fairness shift.',
      'Delivered models and analysis for use by the Ministry of Education, Government of Delhi.',
    ],
  },
]
