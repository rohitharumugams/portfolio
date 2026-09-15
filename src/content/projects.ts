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
      'A physics-based tool for re-rendering vehicle pass-by audio and generating ML datasets.',
    purpose:
      'I built DopplerSim to take a roadside recording, estimate the underlying sound of the vehicle, and render it again at a different speed, distance, or trajectory. The same pipeline can generate labelled audio in batches for ML experiments.',
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
      'The idea came from a practical problem in our research: we had far fewer real roadside recordings than the combinations of vehicles, speeds, and microphone positions we wanted to study.',
      'Given the original geometry, the simulator works backward from a mono recording to estimate an intrinsic spectrum, then uses retarded-time Doppler physics to synthesize a new pass-by. I later added batch generation so I could export WAVs, spectrograms, labels, and metadata for training.',
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
      'Collecting a balanced roadside-audio dataset is slow and expensive, and simple pitch shifting does not reproduce how Doppler shift and loudness change over a real pass-by. I wanted synthetic data that was useful enough to test on downstream models, not just audio that sounded plausible.',
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
      'The public web app lets people try the simulator without setting up the research code.',
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
      'An object store that adapts replication and erasure coding to how data is actually accessed.',
    purpose:
      'I built ADOS to explore a simple question: why protect every object in exactly the same way? It keeps frequently read objects replicated, moves cold or large objects to Reed–Solomon coding, and includes rack-aware placement, repair, scrub, and migration.',
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
      'This started as an attempt to understand object placement and failure recovery by building them myself. The adaptive policy grew out of noticing how much space fixed triple replication spends on data that is rarely read.',
      'I wrote a benchmark suite alongside the store because the interesting questions were not just PUT and GET speed. I wanted to see what happened during a rack loss, while repair was running, after corruption, and when workloads changed shape.',
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
      'Fixed replication is easy to reason about but can waste a lot of storage, while careless placement can lose every copy in one rack failure. I wanted to measure the trade-off between space, access patterns, and recovery instead of treating durability as a configuration constant.',
    decisions: [
      'I stayed with Python so I could iterate quickly on placement, healing, and coding policies. The trade-off is a single-process gateway that becomes the bottleneck under heavier concurrency.',
      'Metadata commits after durable chunk writes; overwrites bump versions (readers may briefly see the previous version).',
      'I kept a deliberately naive same-rack mode as a baseline for the placement experiments.',
      'The adaptive thresholds live in configuration. A small trend rule can raise replication when GET traffic climbs quickly, but it is not an ML model.',
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
      'The rack-failure experiment showed exactly why failure domains matter: rack-aware placement lost no objects while the naive baseline lost about 40%.',
      'The adaptive policy reduced storage use under skewed workloads without adding a complex prediction model.',
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
      'A small C++ database engine I wrote from disk pages up to SQL.',
    purpose:
      'I wanted to understand what sits beneath a SQL query, so I built the path myself: slotted pages, a buffer pool, catalog, B+ tree indexes, planner and executors, write-ahead logging, recovery, and table-level locking.',
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
      'PlainQL began as a storage-engine exercise and kept growing until I could type a query, inspect its plan, commit a transaction, crash the process, and recover the right rows.',
      'The SQL surface is intentionally small. I would rather keep the storage and transaction code readable than hide an incomplete engine behind a large parser. As a small experiment, the lexer also accepts aliases such as MAKE, ADD TO, and GET.',
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
      'I had used databases for years without having a concrete picture of how a row becomes bytes on disk or how an index, lock, and log interact. This project was my way of closing that gap by owning the whole path.',
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
      'The finished engine connects storage, indexing, planning, transactions, and recovery in one codebase I can explain end to end.',
      'The benchmark shows how the point-lookup gap between a scan and an index grows with the table.',
      'Concurrency uses a documented table-locking and wait-die policy instead of relying on incidental thread behavior.',
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
      'A local HLS testbed for adaptive bitrate control and spatial captions.',
    purpose:
      'I built StreamSpace to experiment with video streaming without needing a production CDN. It packages multi-bitrate HLS, replays bandwidth traces, runs custom ABR controllers, and uses stereo audio plus face detection to place captions near the speaker.',
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
      'The first version focused only on adaptive streaming: an FFmpeg bitrate ladder, an hls.js player, a throttled server, and a Python simulator that mirrors the browser controllers.',
      'I added spatial captions after thinking about information that ordinary subtitles leave out. The caption pipeline combines left/right audio energy with detected faces, avoids covering faces, and includes a small A/B study interface.',
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
      'Throughput-chasing ABR can make poor choices when bandwidth changes quickly. I also wanted to see whether captions could communicate who is speaking and from which direction without pretending that weak stereo evidence is reliable.',
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
      'The scripted dialogue demo verifies the caption pipeline; I keep its results separate from the tests on less controlled clips.',
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
      'A small event-streaming stack with a broker, windows, checkpoints, and a queryable data lake.',
    purpose:
      'I built TELP as a manageable way to learn the moving parts of event streaming: an append-only partitioned log, consumer groups, event-time windows, checkpoints, recent results in SQLite, historical data in Parquet, and reports through DuckDB.',
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
      'TELP is not trying to be Kafka. It uses a small JSON-over-TCP protocol so the log, group coordination, windowing, and recovery code stays easy to inspect and change.',
      'I used purchase events as the running example and added experiments for publish throughput, backlog drain, failover, late events, checkpoint cost, and end-to-end counts in the lake.',
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
      'I wanted a place where I could deliberately delay events, kill a leader, inspect offsets, and change checkpoint logic without the operational weight or hidden internals of a full Kafka setup.',
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
      'In the crash tests, restored revenue totals matched the clean runs across the reported trials.',
      'The late-event policy updates windows that are still open and clearly reports events that arrive too late.',
      'The benchmark scripts and generated reports make the laptop results repeatable.',
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
      'A multi-tenant assistant that answers from company documents and completes business tasks.',
    purpose:
      'I built BotsBox to move beyond a document chatbot. It combines hybrid retrieval with small specialist agents that can place orders, make bookings, create support tickets, and persist those actions for each tenant.',
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
      'The project started as document Q&A. Once I added actions, one agent with every tool became unreliable, so I split the work among focused specialists for documents, menus, bookings, orders, loyalty, and support.',
      'To make the backend tangible, I built Scooply, a fictional ice-cream shop with a storefront, chat dock, order builder, and admin view. It is one example tenant rather than a separate hard-coded app.',
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
      'A useful business assistant needs to do more than quote documents, but giving one model dozens of tools made tool selection worse. I wanted a design that kept retrieval, actions, and tenant data separate and made side effects visible.',
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
      'Payments are mocked by default, and the Stripe integration is only suitable for a local demo.',
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
      'A small-model fine-tuning experiment for structured GitHub issue triage.',
    purpose:
      'I fine-tuned a 3B model on my Mac to classify GitHub issues by category and severity and produce a short JSON summary. The goal was to compare it fairly with the same base model under zero-shot and few-shot prompting.',
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
      'I built the full pipeline around the training run: fetch and clean public issues, create labels, review a gold sample, format the data, train adapters, evaluate failures, fuse the model, and serve a local comparison UI.',
      'The most useful result was not simply that rank 8 improved a little over the base model. A larger rank 16 adapter failed to produce valid JSON on more than half the test set, which changed how I evaluated the model and chose the final checkpoint.',
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
      'Small local models are attractive for private, inexpensive triage, but they are brittle at severity judgement and structured output. I wanted to find out whether a modest local fine-tune could improve both without hiding failures behind a single aggregate score.',
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
      'The failed rank-16 run was useful: a larger adapter did not mean more reliable structured output.',
      'The failure reports showed that severity labels and their rubric are the next part I need to improve.',
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
