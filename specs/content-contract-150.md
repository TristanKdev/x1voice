# Content contract — 150-article buildout (2026-08-01)

Goal: content/blog reaches exactly 150 .mdx posts (61 exist, 89 new). Site = x1voice.com,
AI phone agent for restaurants. Deploy = push to main (GH Actions → EC2, health-checked).

## Non-negotiable style rules (match the existing 61 posts — read 3 before writing)
- Frontmatter EXACTLY: title, description, publishedAt ("2026-08-01"), faqs (3-5 q/a pairs).
  FAQ answers must be honest and hedged like the house style — never salesy absolutes.
- 900–1400 words. Answer-first structure (AEO): open with the direct answer/thesis in the
  first two paragraphs, then develop. H2 sections. No H1 in body.
- ZERO fabricated facts: no invented statistics, percentages, customer quotes, case studies,
  competitor pricing, or "studies show". Reasoning and honest qualitative claims only.
  Product capabilities: only what existing posts/site already claim (read them).
- Internal links: 2–4 per article to EXISTING slugs (list below) or same-batch slugs.
  External links: only real, stable authority/community URLs (reddit operator subs, vendor
  official sites) in the pattern the existing posts use. No dead/guessed URLs.
- Tone: the house voice is honest-operator, anti-hype ("not every call converts"). Copy it.
- No em-dash overuse, no "In today's fast-paced world", no AI-slop phrasing.

## Batch assignment (slugs are FINAL — no agent invents or renames slugs)
Batch 1 (23) — cuisine & format verticals: voice-ai-for-sushi-restaurants, voice-ai-for-chinese-takeout, voice-ai-for-indian-restaurants, voice-ai-for-thai-restaurants, voice-ai-for-mexican-restaurants-taquerias, voice-ai-for-bbq-restaurants, voice-ai-for-wing-shops, voice-ai-for-delis-sandwich-shops, voice-ai-for-bakeries, voice-ai-for-ice-cream-shops, voice-ai-for-food-trucks, voice-ai-for-bagel-shops, voice-ai-for-seafood-restaurants, voice-ai-for-steakhouses, voice-ai-for-diners, voice-ai-for-breakfast-brunch-spots, voice-ai-for-juice-bars-smoothie-shops, voice-ai-for-mediterranean-restaurants, voice-ai-for-halal-restaurants, voice-ai-for-bar-and-grill, voice-ai-for-fast-casual-chains, voice-ai-for-fine-dining, voice-ai-for-buffets-hibachi
Batch 2 (22) — operations & problems: restaurant-staffing-shortage-phone-coverage, reduce-host-stand-phone-interruptions, restaurant-phone-etiquette-scripts-vs-ai, improving-phone-order-accuracy, eliminate-restaurant-phone-tree, holiday-rush-phone-ordering-playbook, super-bowl-game-day-phone-orders, valentines-day-mothers-day-reservations-calls, snow-day-delivery-surge-calls, consolidating-third-party-delivery-phone-orders, gift-cards-by-phone-restaurants, handling-refund-complaint-calls, blocking-spam-robocalls-restaurant-line, call-recording-consent-laws-restaurants, restaurant-caller-id-branded-calling, fixing-spam-likely-caller-id-restaurant, phone-number-porting-guide-restaurants, multi-line-hunt-groups-vs-voice-ai, order-throttling-kitchen-capacity-phone, restaurant-phone-analytics-guide, measuring-call-containment-rate, tipping-on-phone-orders
Batch 3 (22) — buyer guides & comparisons: ai-phone-answering-pricing-models, voice-ai-contract-terms-to-avoid, ai-phone-onboarding-checklist-restaurants, designing-a-voice-ai-pilot, voice-ai-security-questionnaire, menu-sync-deep-dive-voice-ai, human-handoff-failover-voice-ai, voice-ai-vs-hiring-another-host, voice-ai-vs-offshore-call-center, voice-ai-vs-diy-chatbot, voice-ai-vs-website-ordering-widget, voice-ai-vs-self-service-kiosk, voice-ai-vs-qr-code-ordering, evaluating-voice-ai-vendors-restaurants, ai-phone-answering-cost-2026, is-ai-phone-answering-worth-it-small-restaurant, voice-ai-demo-what-to-test, switching-voice-ai-vendors, voice-ai-slas-uptime-restaurants, voice-ai-data-ownership-privacy, restaurant-voice-ai-glossary, what-is-call-containment
Batch 4 (22) — features & AEO question-form: sms-order-confirmations-voice-ai, real-time-86ing-menu-sync, delivery-zone-rules-phone-orders, curbside-pickup-phone-flow, phone-payment-tokenization-explained, custom-greetings-brand-voice-ai, holiday-hours-overrides-voice-ai, multi-language-menu-support, catering-lead-qualification-ai, does-ai-phone-answering-sound-robotic, can-callers-tell-its-ai, what-happens-when-voice-ai-fails, how-voice-ai-handles-menu-modifiers, upselling-without-being-pushy-ai, voice-ai-and-loyalty-programs, voice-ai-order-ahead-scheduling, voice-ai-large-catering-orders, voice-ai-answering-faqs-hours-parking, voice-ai-table-management-integration, voice-ai-pos-86-sync-failure-modes, what-is-answer-engine-optimization-restaurants, how-restaurants-show-up-in-ai-search

## done_when (run level)
- ls content/blog/*.mdx | wc -l == 150
- no duplicate slugs; every batch slug present
- npm run build exit 0
- lint exit 0
- sample check: no fabricated-stat patterns ("% of restaurants", "studies show", "according to a study") in NEW posts
