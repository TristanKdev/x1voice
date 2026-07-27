# Steering the Search Prong With Claude Code

The search prong reads the two data sources that hold the outcome of the
property's search presence: Google Search Console for rankings and queries, and
Google Analytics 4 for sessions, engagement, and conversions. This document
explains how to run that prong from your own machine with Claude Code driving
it, and how to extend the default pulls when a specific question comes up.

The design point is that the engine ships a fixed, reproducible set of pulls so
that every audit is comparable, and Claude Code is the operator that supplies
credentials, runs the pulls, reads the results, and asks the follow-up
questions a fixed report cannot anticipate.

## 1. Why this runs on your machine

The audit environment that produced the committed toolkit cannot reach the live
property or the Google APIs. The search prong is built to run where you are: on
a machine with network access and with the Google credentials the APIs require.
Claude Code running locally has both.

## 2. One-time setup

1. Create a Google Cloud service account and download its JSON key.
2. Enable the Google Analytics Data API and the Search Console API on the
   project.
3. Grant the service account Viewer access on the GA4 property, under Admin,
   Property Access Management.
4. Add the service account as a user on the Search Console property, under
   Settings, Users and permissions.
5. Copy `.env.example` to `.env` and fill in `GA4_PROPERTY_ID`,
   `GSC_SITE_URL`, and `GOOGLE_APPLICATION_CREDENTIALS`.

The service account is read only. Nothing in this toolkit writes to the Google
properties.

## 3. Running the prong

```bash
npm install
npm run search        # search prong only
npm run audit         # all three prongs
```

The search prong pulls, for the reporting window:

- From Search Console: the top queries by clicks, the top pages by clicks, and
  the queries ranking in striking distance of the first page, each with clicks,
  impressions, click-through rate, and average position.
- From Analytics: sessions and conversions by default channel group, the
  organic share of traffic, engagement rate, and the top organic landing pages.

These are the pulls that feed the score. They are fixed so that the number the
report produces this quarter can be set beside the number it produced last
quarter.

## 4. Steering beyond the default pulls

The fixed pulls answer the questions the report always asks. A live engagement
raises questions the report cannot anticipate. That is where Claude Code steers.
Typical requests, in plain language, and what Claude does with them:

- "Show me every query where we rank between 8 and 15 and have over 200
  impressions." Claude edits the Search Console query in
  `src/prongs/search/gsc.ts` to filter on position and impressions, runs it,
  and reads back the list. These are the fastest available gains.
- "Which landing pages lost the most organic sessions against the prior 90
  days." Claude adds a second date range to the GA4 report and diffs the two.
- "Break the top queries down by country and by device." Claude adds the
  `country` and `device` dimensions to the Search Console request.
- "Which pages get impressions but no clicks at all." Claude filters the page
  dimension to rows with impressions above a floor and zero clicks, then reads
  the title and description of each so the fix is obvious.

In every case Claude is operating the same authenticated clients the fixed
pulls use. The credentials never leave your machine and the service account
remains read only.

## 5. Keeping runs comparable

When Claude changes a pull to answer a one-off question, that change is
exploratory. The scored pulls that feed the report should stay fixed between
audits. The convention is to keep exploratory queries in a scratch script and
leave the four scored functions in `gsc.ts` and `ga4.ts` unchanged unless the
methodology itself is being revised. A revision to the methodology is a
deliberate act, recorded in `docs/METHODOLOGY.md`, not a side effect of a
single investigation.
