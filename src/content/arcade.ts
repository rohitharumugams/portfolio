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
    genre: 'PHYSICS / AUDIO RPG',
    oneLiner: 'Rewind a car fly-by. Replay it at any speed. Feed the loot to ML.',
    boss: 'Unknown geometry + scarce roadside audio',
    difficulty: 4,
    color: 'cyan',
  },
  ados: {
    stage: '02',
    genre: 'DUNGEON CRAWLER (STORAGE)',
    oneLiner: 'Hot loot gets clones. Cold loot gets erasure codes. Racks hate packing.',
    boss: 'Rack wipe + fixed RF waste',
    difficulty: 5,
    color: 'lime',
  },
  plainql: {
    stage: '03',
    genre: 'FROM-SCRATCH ENGINE',
    oneLiner: 'No SQLite under the floorboards. Pages, B+ trees, WAL — you built the save system.',
    boss: 'Bytes on disk → EXPLAIN → crash recovery',
    difficulty: 5,
    color: 'amber',
  },
  streamspace: {
    stage: '04',
    genre: 'RACING / SURVIVAL',
    oneLiner: 'Chase bandwidth without wrecking the buffer. Captions know LEFT from RIGHT.',
    boss: 'Volatile network traces',
    difficulty: 4,
    color: 'pink',
  },
  telp: {
    stage: '05',
    genre: 'SIDE-SCROLLER (EVENTS)',
    oneLiner: 'Purchases roll in. Windows slam shut. Lake gets the receipts.',
    boss: 'Late events + mid-run crashes',
    difficulty: 4,
    color: 'violet',
  },
  botsbox: {
    stage: '06',
    genre: 'PARTY / CO-OP AGENTS',
    oneLiner: 'Docs talk back. Specialists place the order. Scooply is the tutorial island.',
    boss: 'Mega-agent tool chaos',
    difficulty: 3,
    color: 'pink',
  },
  repotriage: {
    stage: '07',
    genre: 'TRAINING ARC',
    oneLiner: 'Teach a 3B model to triage issues. Rank 8 wins. Rank 16 rage-quits JSON.',
    boss: 'Severity labels + parse failures',
    difficulty: 3,
    color: 'lime',
  },
}

export function stars(n: number) {
  return '▲'.repeat(n) + '△'.repeat(Math.max(0, 5 - n))
}
