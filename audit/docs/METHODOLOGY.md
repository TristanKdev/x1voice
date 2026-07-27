# Audit Methodology and Scoring Standard

This document is the authoritative statement of how the audit engine measures a
property and how it converts those measurements into a score. It governs every
run. A reader who disagrees with a score should be able to trace the objection
to a specific rule stated here.

The methodology is deliberately fixed. The instrument does not adapt itself to
the property under audit, because a scoring instrument that changes with its
subject cannot be used to compare one property to another or one point in time
to another. Where judgment is required, the rule embodying that judgment is
written down here rather than exercised at run time.

## 1. Scope

The engine assesses a single web property across three prongs.

1. **Search Performance.** The realized outcome of the property in organic
   search. Source data is Google Search Console and Google Analytics 4.
2. **Technical Site Crawl.** The condition of the property as an automated
   crawler retrieves it.
3. **Answer and Generative Engine Optimization.** The readiness of the property
   to be found, trusted, extracted, and attributed by AI answer engines and
   generative search features.

Each prong produces a subscore on a 0 to 100 scale. The master score is the
weighted mean of the three subscores.

## 2. The Weighting Model

The three prongs do not carry equal weight, because they do not carry equal
consequence. The weights are fixed as follows.

| Prong | Weight | Basis |
| :-- | --: | :-- |
| Search Performance | 0.50 | Realized rankings, clicks, and conversions are the outcome the discipline exists to produce. They are measured against live query data rather than inferred from markup. A property can be technically flawless and rank for nothing; this prong is the only one that detects that condition, which is why it carries the most weight. |
| Technical Site Crawl | 0.30 | Crawlability, indexation, and on-page structure are the controllable inputs that make ranking possible. They are necessary but not sufficient, so they weigh less than the outcome they enable. |
| Answer and Generative Engine Optimization | 0.20 | Presence in AI answers is a real and growing acquisition channel, but at present a secondary one. The weight is set high enough to influence the master score materially and low enough that a strong posture here cannot conceal weak search performance. |

The weights sum to 1.00.

### 2.1 Redistribution for an unexecuted prong

A prong that cannot run, most commonly the search prong when no Search Console
or Analytics credentials are supplied, is excluded from the master score. Its
weight is redistributed across the prongs that did run, in proportion to their
base weights. If the search prong does not run, the crawl and AI prongs are
reweighted to 0.60 and 0.40 respectively.

Redistribution keeps the master score a true weighted mean of the evidence
actually collected. It does not treat missing data as a passing result. Every
report states the effective weights that were applied and identifies any prong
that did not run.

## 3. Scoring Within Each Prong

### 3.1 Search Performance: quantitative scoring

The search prong is scored from measured outcomes, not from defects. Six
components are each normalized to a 0 to 100 scale against a stated target, then
combined by internal weight.

| Component | Internal weight | Target for a score of 100 | Normalization |
| :-- | --: | :-- | :-- |
| Average ranking position | 0.35 | Position 1 | 100 at position 1, less 5 points per position, 0 at position 21 and beyond |
| Organic click-through rate | 0.20 | 5.0% and above | Linear from 0% to 5% |
| Organic share of sessions | 0.15 | 40% and above | Linear from 0% to 40% |
| Engagement rate | 0.10 | 60% and above | Linear from 0% to 60% |
| Organic conversions present | 0.10 | One or more | 100 if any organic conversion is recorded, else 0 |
| Impression volume | 0.10 | 50,000 impressions | Logarithmic to 50,000 |

Ranking position carries the most internal weight because position governs the
click curve: the difference between position 3 and position 8 is the difference
between meaningful traffic and almost none. Components for which no data was
retrieved are excluded and the remaining weights rescaled, so the search
subscore reflects only the signals actually collected.

The targets are calibrated for a business-services marketing property. An
operator auditing a different class of property may recalibrate the targets in
`src/prongs/search/analyze.ts`. The recalibration then applies uniformly to
every run, preserving comparability.

### 3.2 Technical Crawl and Answer Engine: scoring by exception

The crawl and AI prongs are scored by exception. Each begins at 100 and is
reduced by a fixed deduction for every non-conforming finding, according to the
finding's severity. The subscore floors at zero.

| Severity | Deduction | Meaning |
| :-- | --: | :-- |
| Critical | 25 | A condition that suppresses indexation or ranking outright. |
| Major | 12 | A condition that imposes a ceiling on performance. |
| Moderate | 6 | A defect that measurably limits performance against that ceiling. |
| Minor | 2 | A defect with limited individual effect. |
| Conforming | 0 | A check the property passed. Recorded for the record; no deduction. |

Deductions accumulate. A prong with two critical and three major findings scores
100 minus 50 minus 36, that is 14, before any moderate or minor items. This is
intentional: a property with multiple critical defects should score in the
failing band regardless of how many secondary checks it passes.

## 4. Severity Assignment

Severity is assigned by the analyzer for each finding class, not chosen at run
time. The assignments are stated in the analyzer source and summarized here.

- A finding is **critical** when it removes pages from the index or makes them
  unreachable: no HTTPS, server errors on served pages.
- A finding is **major** when it caps performance across the property: broken
  URLs, missing titles, absent mobile viewport, thin organic channel, blocked
  answer-engine crawlers, content that cannot answer common buyer questions,
  or published claims that are not verifiable.
- A finding is **moderate** when it limits performance on the affected pages:
  duplicate or missing descriptions, missing canonicals, thin content, absent
  FAQ or Organization schema, weak entity grounding.
- A finding is **minor** when its individual effect is small: title or
  description length outside the display range, multiple H1 elements, missing
  image alt text below a quarter of images.

## 5. Grade Bands

The master score maps to a letter grade.

| Score | Grade | Condition |
| :-- | :-- | :-- |
| 90 to 100 | A | Market leading |
| 80 to 89 | B | Strong, minor remediation |
| 70 to 79 | C | Adequate, material gaps |
| 60 to 69 | D | Deficient, priority remediation |
| 0 to 59 | F | Failing, remediation required |

The bands are set so that a passing grade requires competence on the measured
prongs rather than an average that conceals one failing area. A property that
scores well on two prongs and fails a third will see that failure pull the
master score down in proportion to the failed prong's weight.

## 6. Data Provenance and Reproducibility

Every prong records the provenance of its data: the source, the window, the
sample size, and any limitation. A finding without recorded evidence is not
admitted to the report. Two auditors running this instrument against the same
property in the same window will produce the same score, because every step
from measurement to grade is fixed by the rules above.

## 7. Limitations

The methodology is honest about what it does not measure.

- The search prong reports only what the connected Google properties recorded.
  It does not model competitor movement, seasonality, or algorithm changes.
- The crawl reads the initial HTML response and response headers. It does not
  execute client-side JavaScript beyond that response, so content injected only
  by later script execution is not counted. This is deliberate: it measures the
  property as a non-rendering crawler sees it, which is the conservative case.
- The answer-engine probe is a controlled proxy. It measures whether the
  property's own content can answer representative questions. It does not query
  live third-party answer engines and is not a guarantee of inclusion in their
  results.

These limitations are restated in every report so that no conclusion is read
beyond its basis.
