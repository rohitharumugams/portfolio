export type ProjectStatus = 'active' | 'released' | 'research'

export type Project = {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  purpose: string
  type: string
  role: string
  status: ProjectStatus
  statusLabel: string
  when: string
  featured: boolean
  featuredOrder: number
  stack: string[]
  github?: string
  live?: string
  topics: string[]
  summary: string[]
  results: { label: string; value: string }[]
  problem: string
  decisions: string[]
  implementation: {
    architecture: string[]
    components: { name: string; detail: string }[]
    howItRuns: string[]
  }
  outcomes: string[]
  limits: string[]
  artifacts: { label: string; href?: string; note?: string }[]
  related: string[]
}

export const projects: Project[] = [
  {
    slug: 'dopplersim',
    title: 'DopplerSim',
    shortTitle: 'DopplerSim',
    tagline:
      'Physics-based vehicle pass-by audio re-rendering and ML dataset generation.',
    purpose:
      'Invert a recorded roadside pass-by, recover intrinsic emitter spectra, and synthesize a new pass-by under different speed, distance, and timing — then batch that pipeline into ML-ready datasets.',
    type: 'Research tool / web app',
    role: 'Sole builder (CMU research internship)',
    status: 'research',
    statusLabel: 'Active research',
    when: 'Mar 2025 — Present',
    featured: true,
    featuredOrder: 1,
    stack: [
      'Python',
      'Flask',
      'NumPy',
      'SciPy',
      'librosa',
      'PyWavelets',
      'matplotlib',
    ],
    github: 'https://github.com/rohitharumugams/dopplersim_2.0',
    live: 'https://dopplersim.site/',
    topics: ['acoustics', 'signal processing', 'dataset generation', 'ML'],
    summary: [
      'DopplerSim treats a mono pass-by recording as an observation of moving emitters. Given original geometry (speed, CPA distance, time of closest approach), it undoes spreading and Doppler per STFT frame, averages to an intrinsic PSD per emitter, then re-synthesizes under target geometry with retarded-time physics.',
      'A Batch Generation tab sweeps vehicles and speeds through the same backend to export WAVs, spectrogram arrays, labels, and metadata for training.',
    ],
    results: [
      {
        label: 'Envelope correlation',
        value: '78% on 192 held-out recordings',
      },
      {
        label: 'Spectral overlap',
        value: '65% on the same held-out set',
      },
      {
        label: 'Speed estimation RMSE',
        value: '11.25 → 6.84 km/h with synthetic + real data',
      },
      {
        label: 'Length estimation',
        value: '11 cm mean error (2.5% of true length)',
      },
      {
        label: 'Traffic counting',
        value: 'MAE 0.78; 42% exact match on 200 scenes',
      },
    ],
    problem:
      'Real roadside audio is scarce for every combination of vehicle, speed, and microphone geometry. Collecting that variety in the field is expensive; naive pitch-shifting does not respect retarded-time Doppler or range-dependent envelopes.',
    decisions: [
      'Shared one physics backend (`render_pass_by`) for single-clip and batch modes so dataset exports match the interactive simulator.',
      'Sidecar `.txt` files override filename speed and supply source t_CPA so catalogued clips stay reproducible.',
      'Batch sampling is seed-controlled and resumable (skip folders that already contain a WAV) for long ML dataset jobs.',
      'Reassignment / Wigner–Ville views stay diagnostic-only — they never alter synthesis.',
    ],
    implementation: {
      architecture: [
        'Flask app (`app.py`) with five tabs: Batch Generation, Pass-By Simulator, Spectrogram Explorer, Audio Comparison, Experimental TF.',
        'Core package `doppler_sim/`: application routes + physics, batch planner/runner/pipeline/features, spectrogram explorer, time-frequency analysis.',
        'Geometry model: x(t) = v(t − t_CPA) + x₀, range R = √(x² + h²); retarded time solves c(t − t_r) = R(t_r).',
        'Analysis undoes spreading (×R) and Doppler (f_src = f/α) per STFT frame; synthesis colors noise from the PSD, warps the recorded envelope, and sums N emitters.',
      ],
      components: [
        {
          name: 'Pass-By Simulator',
          detail:
            'Upload mono WAV; set original and render geometry; optional vehicle length L and emitter count N; download WAV + plots.',
        },
        {
          name: 'Batch Generation',
          detail:
            'Process-pool workers, progress/ETA/resume, export modes from simple (WAV + npy labels) to full metadata + trajectory plots + multi-type spectrograms.',
        },
        {
          name: 'Spectrogram Explorer',
          detail:
            'STFT, mel, CQT, reassigned, CWT, SSQ, chroma and related views for inspection and batch export.',
        },
        {
          name: 'Deploy',
          detail:
            'gunicorn-ready; `deploy/` includes systemd example for GCP/Ubuntu. Live site: dopplersim.site.',
        },
      ],
      howItRuns: [
        'Install deps → place source WAVs (+ optional sidecars) in `static/inputs/` → `python app.py` on port 5003.',
        'Batch jobs should keep the Flask reloader off so workers are not killed mid-run.',
      ],
    },
    outcomes: [
      'Simulator quality validated on held-out recordings with envelope and spectral metrics.',
      'Downstream models for speed, length, and multi-vehicle counting improved when trained with mixed real + synthetic clips.',
      'Public web UI makes the research artifact inspectable without reading the physics code first.',
    ],
    limits: [
      'Best suited to subsonic pass-bys with approximately known geometry; supersonic cases are not modeled correctly.',
      'Render amplitude follows envelope warping, not explicit 1/R — absolute levels may differ from the original.',
      'Multiple emitters smear the Doppler ridge; each synthesis draws new random noise.',
      'Batch planner supports straight-line trajectories only.',
    ],
    artifacts: [
      { label: 'Live site', href: 'https://dopplersim.site/' },
      {
        label: 'GitHub',
        href: 'https://github.com/rohitharumugams/dopplersim_2.0',
      },
      {
        label: 'Screenshots',
        note: 'Pending — UI and spectrogram panels to be captured next.',
      },
    ],
    related: ['streamspace', 'repotriage'],
  },
  {
    slug: 'ados',
    title: 'ADOS — Adaptive Distributed Object Store',
    shortTitle: 'ADOS',
    tagline:
      'Object store that adapts replication and erasure coding to hot/cold access instead of a fixed RF.',
    purpose:
      'Store objects with chunked PUT/GET, rack-aware placement, repair/scrub, and an adaptive policy that gives hot objects more replicas (and optional gateway cache) while cold/large objects move to Reed–Solomon.',
    type: 'Distributed systems',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Mar 2026 — Jul 2026',
    featured: true,
    featuredOrder: 2,
    stack: ['Python', 'FastAPI', 'Reed–Solomon', 'SQLite', 'Docker', 'pytest'],
    github: 'https://github.com/rohitharumugams/ADOS',
    topics: ['storage', 'replication', 'erasure coding', 'placement', 'bench'],
    summary: [
      'Most object stores pick a fixed replication factor. ADOS classifies objects from recent access stats (hot / very-hot / cold-large / default), migrates encoding when policy changes, and keeps replicas on different racks.',
      'A bench suite exercises Zipf/uniform/skewed/bursty loads, rack kill, repair-under-load, scrub, decommission, and concurrency — not only PUT/GET microbenchmarks.',
    ],
    results: [
      {
        label: 'Rack wipe (RF=3)',
        value: 'Rack-aware: 0 objects lost; naive same-rack: ~40% lost',
      },
      {
        label: 'Adaptive vs static RF=3',
        value: '~25–35% less storage across access distributions',
      },
      {
        label: 'Repair under load',
        value: '~16 chunks repaired in ~24 ms; 0% client errors',
      },
      {
        label: 'Concurrency',
        value: 'Peak ~293 ops/s @ 4 clients (embedded); 0% errors after locking',
      },
      {
        label: 'Scrub',
        value: 'Up to ~48 corrupt replicas found/fixed in ~58 ms',
      },
    ],
    problem:
      'Fixed triple replication wastes disk on cold data; packing replicas into one failure domain loses data when a rack dies. Healing and policy need to be measurable under load, not only in happy-path PUTs.',
    decisions: [
      'Python on purpose — ship placement, healing, and adaptive coding experiments faster than a C++ rewrite, accepting a single-process gateway bottleneck under high concurrency.',
      'Metadata commits after durable chunk writes; overwrites bump versions (readers may briefly see the previous version).',
      'Deliberate “naive same-rack” mode exists only for ablation honesty.',
      'Adaptive thresholds live in config; the predictive nudge only raises RF when GET rate is climbing fast — not an ML model.',
    ],
    implementation: {
      architecture: [
        'Gateway handles chunked PUT/GET/DELETE/LIST/HEAD, LRU/LFU cache, and client API.',
        'Placement: consistent hash ring with rack anti-affinity.',
        'Storage nodes keep chunk files; metadata via embedded SQLite or HTTP metadata service.',
        'Heal loop: heartbeat failure detection → repair → scrub; plus capacity rebalance, decommission, chaos hooks.',
        'Layouts under `src/ados/` for gateway, placement, metadata, storage, policy, heal, cluster, bench, chaos, CLI.',
      ],
      components: [
        {
          name: 'Adaptive policy + migrator',
          detail:
            'Re-encodes existing objects when hot/cold classification changes.',
        },
        {
          name: 'Bench harness',
          detail:
            '`ados bench run` scenarios: adaptive_vs_static, rack_failure, concurrency, object_sizes, adaptive_workloads, phase_change, scrubbing, repair_under_load, decommission.',
        },
        {
          name: 'Deploy modes',
          detail:
            'Embedded single process for tests/benches; multi-process local cluster via Make; Docker Compose cluster.',
        },
      ],
      howItRuns: [
        '`make install-dev` → `ados serve gateway --config ... --embedded` or `make run-cluster`.',
        'CLI: put/get/list/delete/head, status, repair, scrub, rebalance, migrate, decommission, chaos, bench.',
      ],
    },
    outcomes: [
      'Rack-aware placement ablation makes failure-domain cost concrete.',
      'Adaptive coding shows measurable storage savings under skew without inventing a research ML policy.',
      'Repair/scrub paths are exercised under load with client-error reporting.',
    ],
    limits: [
      'Gateway is the concurrency bottleneck in embedded mode.',
      'Consistency model is intentionally simple for v1 — not full linearizability across all races.',
      'Public demo would need a thin web console; current interface is CLI + HTTP APIs.',
    ],
    artifacts: [
      { label: 'GitHub', href: 'https://github.com/rohitharumugams/ADOS' },
      {
        label: 'Docs',
        note: 'architecture.md, adaptive_policy.md, consistency.md, ADRs in repo.',
      },
      {
        label: 'Screenshots',
        note: 'Pending — status/bench output and Compose topology.',
      },
    ],
    related: ['telp', 'plainql', 'streamspace'],
  },
  {
    slug: 'plainql',
    title: 'PlainQL / MiniDB',
    shortTitle: 'PlainQL',
    tagline:
      'C++20 database engine from scratch — pages, buffer pool, B+ tree, SQL, WAL, locks.',
    purpose:
      'Implement a readable teaching/production-shaped engine on raw `pread`/`pwrite`: slotted pages, LRU buffer pool, catalog, B+ tree indexes, planner/optimizer, volcano executors, WAL recovery, and table-level strict 2PL.',
    type: 'Database systems',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Jan 2026 — Mar 2026',
    featured: true,
    featuredOrder: 3,
    stack: ['C++20', 'CMake', 'SQL'],
    github: 'https://github.com/rohitharumugams/PlainQL',
    topics: ['database', 'storage', 'indexing', 'transactions', 'SQL'],
    summary: [
      'No SQLite or Rocks underneath — storage and transactions are owned end to end. The lexer also accepts plain-English aliases (MAKE, ADD TO, GET, …) mapped onto the same SQL tokens.',
      'Schema/SQL coverage is deliberately small so the storage and txn guts stay inspectable: INT/BIGINT indexes, inner equi-joins, BEGIN/COMMIT/ROLLBACK, EXPLAIN.',
    ],
    results: [
      {
        label: 'Index vs scan',
        value: '~1,000–14,000× faster point lookups on 10K–1M rows (Release)',
      },
      {
        label: 'Recovery',
        value: 'Crash test: uncommitted INSERT disappears after reopen',
      },
      {
        label: 'Concurrency',
        value: 'Wait-die table locks; reader/writer stress tests with retry',
      },
    ],
    problem:
      'Using an embedded library hides the interesting parts of a database. The goal was a complete, readable path from bytes on disk to EXPLAIN plans and crash recovery.',
    decisions: [
      '4 KB slotted pages; catalog on page 0 with magic MDB1.',
      'Volcano pull executors; hash join for equality; predicate pushdown + index selection in the optimizer.',
      'WAL is length-prefixed Begin/Commit/Abort/Insert — no UPDATE/DELETE logging because those statements are out of scope.',
      'Commit forces WAL, flushes buffer pool, saves catalog, releases locks (simpler than full ARIES).',
      'English aliases are a lexer trick, not NLP.',
    ],
    implementation: {
      architecture: [
        'Pipeline: lexer → parser → (txn control) → binder → planner → optimizer → locks → execution engine.',
        'Storage: DiskManager, Page, BufferPool (LRU), TableHeap, RowEncoder.',
        'Index: B+ tree with duplicate keys, range iterators, split on insert; remove for undo.',
        'Txn: thread-local active txn, undo list, LockManager with wait-die deadlock avoidance.',
      ],
      components: [
        {
          name: 'minidb_cli',
          detail: 'REPL with help/tables/flush/quit plus SQL or alias dialect.',
        },
        {
          name: 'bench',
          detail: 'Scan vs index timing; `--large` up to 10M rows.',
        },
        {
          name: 'Tests',
          detail:
            'storage, index, sql, optimizer, txn, concurrency via ctest.',
        },
      ],
      howItRuns: [
        '`cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build -j && ctest --test-dir build`.',
        '`./build/minidb_cli ./data/demo.db` then CREATE/INSERT/SELECT or MAKE/ADD TO/GET.',
      ],
    },
    outcomes: [
      'End-to-end engine demonstrates storage, indexing, planning, and recovery without outsourcing the hard parts.',
      'Bench curve makes the index win obvious across growing N.',
      'Concurrency model is explicit (table locks, wait-die) rather than accidental.',
    ],
    limits: [
      'No UPDATE/DELETE, NULLs, outer joins, subqueries, or multi-column indexes.',
      'One secondary index per table; catalog must fit on one page.',
      'Deleted slot space is not compacted; buffer pool is globally mutexed.',
      'Public demo would need a web SQL REPL; current interface is CLI.',
    ],
    artifacts: [
      { label: 'GitHub', href: 'https://github.com/rohitharumugams/PlainQL' },
      {
        label: 'Screenshots',
        note: 'Pending — CLI session + EXPLAIN plan + bench output.',
      },
    ],
    related: ['ados', 'telp'],
  },
  {
    slug: 'streamspace',
    title: 'StreamSpace — Adaptive Video Streaming',
    shortTitle: 'StreamSpace',
    tagline:
      'Local HLS player with trace-driven throttle, ABR controllers, and spatial captions.',
    purpose:
      'Package multi-bitrate HLS, serve it through a bandwidth-throttled FastAPI server, run custom ABR (including risk-aware), and place speaker/direction-aware captions via stereo + vision fusion.',
    type: 'Streaming systems + accessibility',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Jun 2026 — Aug 2026',
    featured: true,
    featuredOrder: 4,
    stack: ['Python', 'FastAPI', 'FFmpeg', 'hls.js', 'OpenCV', 'NumPy'],
    github: 'https://github.com/rohitharumugams/StreamSpace',
    topics: ['ABR', 'HLS', 'captions', 'accessibility', 'evaluation'],
    summary: [
      'Started as an ABR systems project: FFmpeg ladder, hls.js player with manual level control, server-side Mbps traces, and a Python offline simulator that mirrors the browser controllers.',
      'Captions came second: stereo L/R energy, YuNet faces, AV fusion, placement that avoids faces, plus an A/B study UI.',
    ],
    results: [
      {
        label: 'Risk ABR vs chase-throughput',
        value: '54% less bandwidth on unstable traces; no playback interruptions (resume claim)',
      },
      {
        label: 'Spatial captions',
        value: '85.4% direction accuracy across 10 stress clips (resume)',
      },
      {
        label: 'dialogue_demo pipeline check',
        value:
          'Near-perfect direction/speaker on scripted demo; smart placement overlap ~0.002 vs ~0.600 naive',
      },
    ],
    problem:
      'Default ABR can overshoot on volatile networks. Separately, standard captions ignore where speech comes from — useful signal for hard-of-hearing viewers when stereo and faces agree.',
    decisions: [
      'Throttle media segments only; leave playlists unthrottled so `.m3u8` fetches do not false-stall the player.',
      'Implement ABR twice (JS + Python) so offline experiments match live decisions.',
      'Risk ABR uses conservative throughput (mean − z·std) plus underrun risk and a hold counter to avoid bounce.',
      'Refuse to invent LEFT/RIGHT from near-mono mixes; widen deadzone when channel correlation says the soundtrack is not spatial.',
    ],
    implementation: {
      architecture: [
        '`package_hls.py` builds 360p/480p/720p/(1080p) fMP4 HLS + manifest.json.',
        'FastAPI serves player, playlists, throttled segments, captions, study APIs.',
        'Caption pipeline: stereo windows → vision frames → fuse → place → `captions.json`.',
        'Offline `eval/` simulator walks segment downloads against 1 Hz traces.',
      ],
      components: [
        {
          name: 'ABR set',
          detail:
            'throughput, buffer, hybrid, risk, fixed, hls — same logic in player and Python eval.',
        },
        {
          name: 'Caption modes',
          detail: 'off / standard / speaker / spatial / full accessibility.',
        },
        {
          name: 'Study UI',
          detail: '`/study` paired trials for speaker/side guesses; results persisted.',
        },
      ],
      howItRuns: [
        'FFmpeg on PATH; `pip install -r requirements.txt`; demo script or package + captions.build + uvicorn :8080.',
        'Inbox ingest supports srt/vtt/cues.json or optional Whisper ASR.',
      ],
    },
    outcomes: [
      'Risk-aware controller sits lower than pure throughput under volatile/spike traces while protecting buffer.',
      'Caption stack is honest about demo vs real video — scripted dialogue_demo is a pipeline check, not a movie claim.',
      'End-to-end local service is demoable in a browser without a CDN.',
    ],
    limits: [
      'No full speaker diarization or lip-reading; sound-effect captions are demo-scripted.',
      'Throttle models goodput only — not latency, loss, or CDN quirks.',
      'Risk parameters tuned to included traces and ladder; retune for other segmentations.',
    ],
    artifacts: [
      {
        label: 'GitHub',
        href: 'https://github.com/rohitharumugams/StreamSpace',
      },
      {
        label: 'Screenshots',
        note: 'Pending — player, ABR telemetry, spatial captions, study UI.',
      },
    ],
    related: ['telp', 'ados', 'dopplersim'],
  },
  {
    slug: 'telp',
    title: 'TELP — TCP Event Log Processor',
    shortTitle: 'TELP',
    tagline:
      'Broker + windowed worker: purchases in, region revenue out, Parquet lake + DuckDB.',
    purpose:
      'Build a Kafka-shaped learning stack on asyncio: append-only partitioned log, consumer groups, event-time windows, checkpoints, SQLite recent windows, Parquet lake, DuckDB reports, dashboard and Prometheus metrics.',
    type: 'Streaming / data systems',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Apr 2026 — Jun 2026',
    featured: true,
    featuredOrder: 5,
    stack: ['Python', 'asyncio', 'Parquet', 'DuckDB', 'SQLite', 'Docker'],
    github: 'https://github.com/rohitharumugams/TELP',
    topics: ['event log', 'windowing', 'checkpoints', 'lakehouse-lite'],
    summary: [
      'Single-request JSON protocol over TCP — not Kafka wire format — but the operator story is familiar: produce, consume in a group, window, checkpoint, query.',
      'Bench suite (experiments A–H+) measures publish throughput, lag drain, failover redirect, late events, checkpoint cost, and end-to-end lake counts.',
    ],
    results: [
      {
        label: 'Ingest (resume)',
        value: '~7.1k events/sec after warm-up over 20 trials',
      },
      {
        label: 'End-to-end (resume)',
        value: '~4.3k events/sec through windows → Parquet → DuckDB',
      },
      {
        label: 'Crash restore (resume)',
        value: '0 revenue difference vs clean run over 20 trials',
      },
      {
        label: 'Publish scaling (bench)',
        value: '~9.5–10k evt/s median across 1–8 partitions @ 5k events',
      },
      {
        label: 'Lag drain',
        value: '5k backlog to lag=0 in ~123.5 ms in bench C',
      },
    ],
    problem:
      'Need a controllable playground for windowing, late data, checkpoints, and failover without operating a full Kafka cluster for every experiment (optional Kafka comparison exists as experiment H).',
    decisions: [
      'At-least-once delivery; duplicate event_ids skipped.',
      'SQLite commits window rows + checkpoint blob together, then broker offsets — not Kafka transactions.',
      'Leader kill can drop an unacked tail; failover tests redirect, not zero loss — documented honestly.',
      'Operator graph is filter/map/key-by in front of existing window code.',
    ],
    implementation: {
      architecture: [
        '`src/telp/`: broker (TCP server, log, groups, replicas), processor (windows, watermarks, checkpoints), sink (SQLite + Parquet), query (DuckDB), dashboard, bench, schema, metrics.',
        'CLI: broker, gen, process, query, dashboard, meta, group, autoscale, bench, schema.',
      ],
      components: [
        {
          name: 'Dashboard',
          detail: 'Small HTML UI on :8080 plus `/metrics` Prometheus text.',
        },
        {
          name: 'Compose',
          detail: '`docker compose up --build` for a packaged demo stack.',
        },
        {
          name: 'Bench',
          detail: '`make bench` / `make bench-full` → BENCHMARK.md / ANALYSIS.md.',
        },
      ],
      howItRuns: [
        'Start broker → generate purchases → process with tumbling windows → query revenue-by-region → open dashboard.',
        'Smoke targets under Make exercise main paths.',
      ],
    },
    outcomes: [
      'Checkpoint/crash story is measurable: restored totals match clean runs in reported trials.',
      'Late-event policy updates open windows without pretending dropped-late data still counts.',
      'Bench markdown makes laptop numbers reproducible for portfolio review.',
    ],
    limits: [
      'Not Kafka protocol compatible; experiment H needs a local Kafka or skips.',
      'Spans stay in-process — nothing exported to a collector.',
      'Failover is detection/redirect, not zero-loss durability.',
    ],
    artifacts: [
      { label: 'GitHub', href: 'https://github.com/rohitharumugams/TELP' },
      {
        label: 'Screenshots',
        note: 'Pending — dashboard, metrics, query output.',
      },
    ],
    related: ['ados', 'streamspace', 'plainql'],
  },
  {
    slug: 'botsbox',
    title: 'BotsBox — Multi-tenant RAG + Actions',
    shortTitle: 'BotsBox',
    tagline:
      'Chat API that answers from company docs and takes real actions — orders, bookings, tickets.',
    purpose:
      'Multi-tenant chatbot backend with hybrid RAG, specialist tool-calling agents, durable ops store, and a Scooply ice-cream demo storefront + admin.',
    type: 'Applied LLM / backend',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Jan 2026 — Feb 2026',
    featured: true,
    featuredOrder: 6,
    stack: [
      'Python',
      'FastAPI',
      'LangChain',
      'Chroma',
      'Ollama / Gemini',
      'SQLite',
      'Flask demo',
    ],
    github: 'https://github.com/rohitharumugams/BotsBox',
    topics: ['RAG', 'agents', 'tools', 'multi-tenant', 'eval'],
    summary: [
      'Started as document Q&A; grew into domain specialists (docs, concierge, menu, booking, orders, loyalty, support) because FAQ search alone could not place orders or book appointments.',
      'Scooply under `demo/` is one tenant (`icecream_shop`) with a marketing site, chat dock, order builder UI, and admin snapshot.',
    ],
    results: [
      {
        label: 'Hybrid retrieval (resume)',
        value: '92.4% vs 87.6% hit@1 on 105 questions / 8 docs',
      },
      {
        label: 'Agent design',
        value: 'Heuristic router + small tool sets; max 4 tool steps',
      },
      {
        label: 'Ops durability',
        value: 'SQLite ops_store survives uvicorn restarts',
      },
    ],
    problem:
      'One mega-agent with 30+ tools called the wrong tools. Pure RAG could not mutate business state. Demos needed interactive order UI without inventing forms in prose.',
    decisions: [
      'Split specialists by domain; heuristic router by default to save LLM quota (optional LLM router with fallback).',
      'Structured CLIENT_PROFILES for menu/hours/slots; Chroma only for uploaded docs.',
      'Short-circuit “start an order” into `ui: order_builder` for button-driven POST /orders.',
      'RAG ablations: multi-query, BM25 hybrid, RRF, approximate late interaction, cross-encoder rerank — all toggleable in eval.',
    ],
    implementation: {
      architecture: [
        'Browser → demo Flask proxy → FastAPI (`/chat`, docs, orders, admin).',
        'Tenant isolation primarily via `client_id` across Chroma, logs, and ops rows.',
        'Provider switch in code: Ollama (qwen2.5:3b + nomic-embed) or Gemini.',
      ],
      components: [
        {
          name: 'agent_utils',
          detail: 'Profiles, tools, router, specialist tool loop, ACTION_TOOLS activity log.',
        },
        {
          name: 'rag_utils + chroma_utils',
          detail: 'Chunk/index/retrieve pipeline with hybrid fusion and rerank.',
        },
        {
          name: 'security',
          detail: 'Request IDs, optional API key, allowlist, rate limit, PII redaction on logs.',
        },
        {
          name: 'eval_rag.py',
          detail: 'Scooply eval set with ablation flags and optional LLM judge.',
        },
      ],
      howItRuns: [
        'uvicorn api.main:app --port 8000; python demo/server.py → :5600 and /admin.',
        'Seed Scooply docs with `python api/seed_scooply.py --force`.',
      ],
    },
    outcomes: [
      'Same API serves different businesses by swapping docs + client_id (+ optional profile).',
      'Hybrid retrieval beat embedding-only on the reported Scooply eval.',
      'Admin snapshot makes side effects (orders, tickets) visible for demos.',
    ],
    limits: [
      'Without API key the API is open — local-demo grade, not public-internet grade.',
      'Payments default to mock; Stripe wiring is demo-grade.',
      'Profiles are still code constants rather than external config.',
    ],
    artifacts: [
      { label: 'GitHub', href: 'https://github.com/rohitharumugams/BotsBox' },
      {
        label: 'Screenshots',
        note: 'Pending — Scooply chat, order builder, admin snapshot.',
      },
    ],
    related: ['repotriage', 'telp'],
  },
  {
    slug: 'repotriage',
    title: 'RepoTriage — LoRA Issue Triage',
    shortTitle: 'RepoTriage',
    tagline:
      'Fine-tune a small LLM to map GitHub issues into structured category, severity, and summary JSON.',
    purpose:
      'Beat zero-shot / few-shot prompting of the same 3B base on a reviewed gold test set using QLoRA on Apple MLX, with honest failure analysis and a local compare UI.',
    type: 'ML systems / fine-tuning',
    role: 'Sole builder',
    status: 'released',
    statusLabel: 'Released',
    when: 'Jul 2026 — Aug 2026',
    featured: false,
    featuredOrder: 7,
    stack: ['Python', 'MLX', 'QLoRA', 'Ollama', 'FastAPI'],
    github: 'https://github.com/rohitharumugams/RepoTriage',
    topics: ['LoRA', 'evaluation', 'structured generation', 'Apple Silicon'],
    summary: [
      'Pipeline: fetch public issues → clean → silver-label → gold sample → format → train → eval → judge → fuse → serve.',
      'Folder on disk is `FineTuning/`; public repo name is RepoTriage.',
    ],
    results: [
      {
        label: 'QLoRA r=8 (winner)',
        value: 'Category 91.5%; severity 54.0%; 0% parse fail; ~3.7s latency',
      },
      {
        label: 'Base zero-shot',
        value: 'Category 89.5%; severity 53.0%; ROUGE-L 0.488',
      },
      {
        label: 'r=16 ablation',
        value: '54.5% parse fail — more capacity hurt reliability',
      },
      {
        label: 'Few-shot base',
        value: 'Hurt the 3B model (context overload)',
      },
    ],
    problem:
      'Unstructured issue text is slow to route. Prompting a tiny local model is brittle on severity and JSON; cloud fine-tunes were not the first option on an M4 laptop.',
    decisions: [
      'MLX instead of Unsloth on Apple Silicon; safe trainer skips NaN checkpoints and stops after consecutive NaNs.',
      'Primary metrics: category/severity accuracy and parse fail — not ROUGE alone.',
      'Document that the 3B LLM-as-judge saturates (~4.7–4.8) and calibrate against human spot checks before trusting it in interviews.',
      'Keep r=8 for production after r=16 collapsed JSON validity.',
    ],
    implementation: {
      architecture: [
        'Data scripts: fetch_data, clean_data, silver_label, prepare_splits, format_dataset.',
        'Train: train_mlx_safe.py (rank/iters/lr); NVIDIA fallback train_unsloth.py.',
        'Eval: eval_baseline, eval_finetuned, failure_analysis, judge_summaries, score.',
        'Serve: serve.py loads fused model or base+adapter; `/triage` and `/compare` UI.',
      ],
      components: [
        {
          name: 'schema.json',
          detail: 'Source of truth for category/severity/summary structure.',
        },
        {
          name: 'Gold test',
          detail: 'n=200; Claude-assisted corrections + schema validation (not fully human-authored).',
        },
        {
          name: 'LORA.md',
          detail: 'Rank/scale rationale and training notes.',
        },
      ],
      howItRuns: [
        'Ollama llama3.2:3b for baselines/judge; train adapters locally; `./fuse_r8.sh`; `python serve.py`.',
      ],
    },
    outcomes: [
      'r=8 beats zero-shot on category (+2.0pp) and severity (+1.0pp) with faster latency and perfect parse rate on gold.',
      'Negative result on r=16 is portfolio-useful: capacity ≠ better structured output.',
      'Failure reports make severity confusion the clear next rubric/data problem.',
    ],
    limits: [
      'Severity remains the hard head; class balance and rubric need work.',
      'Judge metric is weak without a stronger judge or more human labels.',
      'Training wall-clock on M4 is slow (~0.05 it/s).',
    ],
    artifacts: [
      {
        label: 'GitHub',
        href: 'https://github.com/rohitharumugams/RepoTriage',
      },
      {
        label: 'Screenshots',
        note: 'Pending — compare UI and metrics table.',
      },
    ],
    related: ['botsbox', 'dopplersim'],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function featuredProjects() {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
}

export function allProjectsSorted() {
  return [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder)
}
