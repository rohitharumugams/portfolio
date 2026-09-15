/** Arcade flavor layered on top of project writeups — not resume copy. */
export const arcadeMeta: Record<
  string,
  {
    stage: string
    genre: string
    oneLiner: string
    boss: string
    difficulty: number
    color: 'lime' | 'pink' | 'cyan' | 'amber' | 'violet'
  }
> = {
  dopplersim: {
    stage: '01',
    genre: 'ACOUSTICS · SIGNAL PROCESSING · ML',
    oneLiner: 'I built a physics-based simulator to turn limited roadside recordings into useful training data.',
    boss: 'Recovering a source signal from a moving vehicle recording',
    difficulty: 4,
    color: 'cyan',
  },
  ados: {
    stage: '02',
    genre: 'DISTRIBUTED STORAGE',
    oneLiner: 'An object store that changes how data is protected as its access pattern changes.',
    boss: 'Saving space without weakening rack-failure recovery',
    difficulty: 5,
    color: 'lime',
  },
  plainql: {
    stage: '03',
    genre: 'DATABASE SYSTEMS · C++',
    oneLiner: 'A small relational database I wrote to understand the path from disk pages to SQL execution.',
    boss: 'Owning the full path from storage to transactions',
    difficulty: 5,
    color: 'amber',
  },
  streamspace: {
    stage: '04',
    genre: 'VIDEO STREAMING · ACCESSIBILITY',
    oneLiner: 'A local HLS testbed for adaptive bitrate algorithms and spatial captions.',
    boss: 'Making stable decisions on an unstable connection',
    difficulty: 4,
    color: 'pink',
  },
  telp: {
    stage: '05',
    genre: 'EVENT STREAMING · DATA SYSTEMS',
    oneLiner: 'My from-scratch playground for logs, consumer groups, event-time windows, and recovery.',
    boss: 'Handling late data and recovering consistent results',
    difficulty: 4,
    color: 'violet',
  },
  botsbox: {
    stage: '06',
    genre: 'RAG · TOOL-USING AGENTS',
    oneLiner: 'A multi-tenant assistant that can answer from company documents and carry out real actions.',
    boss: 'Keeping retrieval and tool use accurate as the toolset grows',
    difficulty: 3,
    color: 'pink',
  },
  repotriage: {
    stage: '07',
    genre: 'FINE-TUNING · EVALUATION',
    oneLiner: 'I fine-tuned a small local model to turn GitHub issues into reliable structured triage.',
    boss: 'Improving severity labels without breaking JSON output',
    difficulty: 3,
    color: 'lime',
  },
}

export function stars(n: number) {
  return '▲'.repeat(n) + '△'.repeat(Math.max(0, 5 - n))
}
