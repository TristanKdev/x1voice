# X1 Voice SEO, AEO, and GEO Audit Engine

A three-prong audit engine that measures a web property's search presence,
reduces the measurements to a single weighted score, and issues a standardized
report. The three prongs are search performance, technical site crawl, and
answer and generative engine readiness. The report is issued in one fixed
format so that two runs, of two properties or of one property over time, can be
compared line for line.

The scoring standard is stated in full in [docs/METHODOLOGY.md](docs/METHODOLOGY.md).
That document, not this one, is authoritative on how a score is produced.

## What it measures

| Prong | Weight | Sources | Question it answers |
| :-- | --: | :-- | :-- |
| I. Search Performance | 0.50 | Google Search Console, Google Analytics 4 | How does the property actually perform in organic search: rankings, clicks, sessions, conversions. |
| II. Technical Site Crawl | 0.30 | Live crawl of the property | Is the property crawlable, indexable, and structurally sound. |
| III. Answer and Generative Engine Optimization | 0.20 | Crawl output, robots and llms.txt, structured data, an optional answer-engine probe | Can AI answer engines find, trust, extract, and attribute the property's facts. |

The master score is the weighted mean of the three prong scores. A prong that
cannot run is excluded and its weight redistributed across the prongs that did.

## Install

```bash
cd audit
npm install
cp .env.example .env   # then fill in credentials
```

Node 20.11 or later is required.

## Run

```bash
npm run audit                 # all three prongs, writes out/audit-report.md
npm run audit -- --site https://example.com
npm run crawl                 # crawl prong only
npm run search                # search prong only
npm run ai                    # answer-engine prong only (also runs the crawl it depends on)
npm run audit -- --out reports/example.com/2026-Q3.md
```

The report is written to the path given by `--out`, default `out/audit-report.md`.
Progress is written to standard error; the report path and the master score are
printed at the end.

## Credentials

Every credential is optional. The engine runs with whatever is supplied and
reports plainly which prongs it could and could not execute.

- **Search prong.** A Google Cloud service account with read access to the GA4
  property and the Search Console property. See
  [docs/CLAUDE-STEERING.md](docs/CLAUDE-STEERING.md) for setup and for how to
  drive the pulls with Claude Code. Without these, the search prong is marked
  not run and its weight is redistributed.
- **Answer-engine probe.** An `ANTHROPIC_API_KEY`. Without it, the AI prong
  still runs its access, schema, and render checks and omits only the live
  content-coverage probe.
- **Crawl prong.** No credentials. It needs only network access to the property.

Nothing here writes to any connected property. The Google service account is
read only and the crawler only issues GET requests.

## Layout

```
audit/
  src/
    config.ts                 run configuration from the environment
    types.ts                  the shared vocabulary: findings, metrics, scores
    scoring/
      weights.ts              prong weights, severity deductions, grade bands
      score.ts                weighting, redistribution, master score
    prongs/
      search/                 Prong I: GA4 and Search Console
      crawl/                  Prong II: the crawler and its analyzer
      ai/                     Prong III: access and schema probes, answer-engine probe
    report/render.ts          the standardized report renderer
    cli.ts                    orchestrator
  docs/
    METHODOLOGY.md            the authoritative scoring standard
    CLAUDE-STEERING.md        operating the search prong with Claude Code
  reports/                    issued reports, one directory per property
```

## Reading a report

Every report has the same nine sections. Section I states the master score and
the weighted contribution of each prong. Sections III through V present each
prong: its subscore, its measured data, and its schedule of findings, each
finding stated with its evidence and its remedy. Section VI consolidates every
non-conforming finding into one schedule ranked by severity. Section VII gives
the order of remediation. Sections VIII and IX state the limitations and the
basis of the report.

A worked example is committed at
[reports/x1voice.com/](reports/x1voice.com/).
