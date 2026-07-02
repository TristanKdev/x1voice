import type { Faq } from "./solutions"

export type SourcedFact = {
  label: string
  url?: string
  asOf: string
}

export type LocationPage = {
  slug: string
  city: string
  stateAbbr: string
  metroArea?: string
  timezone: string
  population: number
  populationSource: SourcedFact
  restaurantCount: { value: number; source: SourcedFact }
  /** Omit rather than fabricate if no real local restaurant association exists. */
  localRestaurantAssociation?: { name: string; url: string }
  peakCallTimes: { description: string; source?: SourcedFact }
  /** Must reflect genuinely different local labor-market conditions, not a city-name swap. */
  laborMarketNote: string
  laborMarketSource: SourcedFact
  /** Min 3 real, named neighborhoods/suburbs. */
  serviceAreaNeighborhoods: string[]
  /** Min 3, feeds FAQPage JSON-LD. */
  localFaqs: Faq[]
  metaDescription: string
  /** ISO date — shown on-page as "Data updated as of …". */
  updatedAt: string
}

/**
 * Quality-gated subset of the old 47 near-identical city pages (down to a
 * ceiling of ~10-12). A dedicated page ships ONLY for a city that can
 * honestly fill every required field above — ship fewer if fewer qualify.
 * Cities without a dedicated page still appear in the /locations hub list.
 */
export const locations: LocationPage[] = [
  {
    slug: "austin-tx",
    city: "Austin",
    stateAbbr: "TX",
    metroArea: "Austin–Round Rock Metro",
    timezone: "America/Chicago",
    population: 980000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2700,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Texas Restaurant Association",
      url: "https://www.txrestaurant.org/",
    },
    peakCallTimes: {
      description:
        "Weekday lunch is driven by downtown and Domain-area tech-office workers (11:30am-1:30pm), but the bigger swing is Thursday-Saturday 9pm-midnight, when Rainey Street and Red River bars and live-music venues empty out looking for late food — a peak that spikes even higher during SXSW (March) and ACL Fest (October).",
    },
    laborMarketNote:
      "Texas has no state income tax, which helps take-home pay, but Austin's restaurant hiring pool competes directly with a fast-growing tech sector paying far more for the same entry-level candidates, keeping service-industry staffing persistently tight relative to the city's overall growth.",
    laborMarketSource: { label: "U.S. Bureau of Labor Statistics", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "South Congress (SoCo)",
      "The Domain",
      "Rainey Street",
      "East Austin",
      "Zilker",
    ],
    localFaqs: [
      {
        question: "Does X1 Voice handle the call surge during SXSW and ACL Fest?",
        answer:
          "Yes — capacity scales automatically for festival-week volume, so a week that might otherwise triple your normal call count doesn't mean missed orders or reservations.",
      },
      {
        question:
          "Can it manage late-night calls from the Rainey Street and Red River crowd?",
        answer:
          "Yes — it covers your full posted hours, including the 11pm-1am stretch when bar crowds are calling around for food, without needing a staff member on phone duty that late.",
      },
      {
        question:
          "We keep losing staff to tech-adjacent jobs — does this help with hiring?",
        answer:
          "It won't fix hiring directly, but it removes phone-answering as a task you need a person for, so a short-staffed shift doesn't also mean missed calls.",
      },
      {
        question: "Do you support Spanish-speaking callers?",
        answer:
          "Yes — bilingual call handling can be configured for both English and Spanish, matching how many Austin kitchens and front counters already operate.",
      },
    ],
    metaDescription:
      "AI phone answering for Austin restaurants — built for SXSW and ACL Fest call surges, late-night Rainey Street crowds, and a tight tech-driven labor market.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "nashville-tn",
    city: "Nashville",
    stateAbbr: "TN",
    metroArea: "Nashville–Davidson Metro",
    timezone: "America/Chicago",
    population: 684000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2300,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Tennessee Hospitality & Tourism Association",
      url: "https://www.tnhta.org/",
    },
    peakCallTimes: {
      description:
        "Unlike most markets, Nashville's call volume isn't lunch-driven — it peaks late Thursday through Saturday night (10pm-1am), tracking the Broadway honky-tonk and bachelorette/bachelor-party crowd looking for late food, a pattern that holds steady nearly year-round rather than following a typical dinner-rush curve.",
    },
    laborMarketNote:
      "Tennessee has no state minimum wage law and defaults to the federal $7.25 floor, yet the past decade's tourism boom around Broadway has pulled restaurant staffing demand well ahead of what the local labor supply can keep up with, especially for late-night shifts.",
    laborMarketSource: { label: "U.S. Department of Labor", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "The Gulch",
      "East Nashville",
      "Germantown",
      "Music Row",
      "12 South",
    ],
    localFaqs: [
      {
        question: "Can it handle calls from the Broadway crowd after midnight?",
        answer:
          "Yes — coverage extends across your full posted hours, including late-night stretches most staffing schedules don't cover.",
      },
      {
        question: "Does it handle large bachelorette or bachelor-party reservation calls?",
        answer:
          "It captures headcount, timing, and private-space questions for group bookings, then routes anything requiring a custom package to your team.",
      },
      {
        question: "Is restaurant staffing really this tight in Nashville specifically?",
        answer:
          "Tennessee's wage floor is the federal minimum, but tourism-driven demand for restaurant labor around Broadway has grown faster than the local workforce — a mismatch that's specific to Nashville's growth curve.",
      },
      {
        question: "Do tourists call asking about live-music schedules, not just food?",
        answer:
          "Yes, often — it can answer basic live-music schedule and cover-charge questions you configure, alongside taking food and reservation calls.",
      },
    ],
    metaDescription:
      "AI phone answering for Nashville restaurants built around late-night Broadway crowds, bachelorette-party reservation calls, and a tourism-driven labor market.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "chicago-il",
    city: "Chicago",
    stateAbbr: "IL",
    metroArea: "Chicagoland",
    timezone: "America/Chicago",
    population: 2721000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 7300,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Illinois Restaurant Association",
      url: "https://www.illinoisrestaurants.org/",
    },
    peakCallTimes: {
      description:
        "Chicago runs two distinct peaks: a sharp weekday Loop lunch rush (11:30am-1pm) from downtown office towers, and a separate Friday-Saturday dinner peak in neighborhood corridors like Wicker Park and Logan Square. Winter months (Dec-Mar) shift a noticeably larger share of that neighborhood volume toward pickup and delivery calls versus walk-in dine-in.",
    },
    laborMarketNote:
      "Chicago sets its own minimum wage by city ordinance, separate from Illinois' statewide rate, and in 2023 the City Council voted to phase out the subminimum tipped wage entirely by 2028 — a labor-cost shift most other metros aren't facing yet.",
    laborMarketSource: {
      label: "Chicago Department of Business Affairs and Consumer Protection",
      asOf: "2023",
    },
    serviceAreaNeighborhoods: [
      "The Loop",
      "Wicker Park",
      "Logan Square",
      "Pilsen",
      "Lincoln Park",
    ],
    localFaqs: [
      {
        question: "Does it handle both our downtown lunch rush and neighborhood dinner service?",
        answer:
          "Yes — calls are handled concurrently, so a Loop lunch spike and a Wicker Park dinner rush later the same day are both covered without a queue.",
      },
      {
        question: "How does Chicago's tipped-wage phase-out affect us, and does this help?",
        answer:
          "It doesn't change the wage law itself, but as labor costs rise through the phase-out, it removes the need to add headcount specifically to keep up with phone volume.",
      },
      {
        question: "Do winter months change how call handling should work?",
        answer:
          "Yes — you can weight winter-season configuration toward pickup and delivery call flows, matching the seasonal shift away from walk-in dine-in.",
      },
      {
        question: "Does it work with the POS systems Chicago restaurants actually use?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available, so pricing stays accurate across both peaks.",
      },
    ],
    metaDescription:
      "AI phone answering for Chicago restaurants — built for the Loop lunch rush, neighborhood dinner peaks, and the city's phased-in tipped-wage changes.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "las-vegas-nv",
    city: "Las Vegas",
    stateAbbr: "NV",
    metroArea: "Las Vegas Valley",
    timezone: "America/Los_Angeles",
    population: 642000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2900,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Nevada Restaurant Association",
      url: "https://www.nvrestaurants.com/",
    },
    peakCallTimes: {
      description:
        "Because the Strip runs 24 hours, Las Vegas doesn't have the quiet overnight stretch most cities do — alongside a normal dinner rush, there's a genuine second peak between 1am and 4am tied to shows letting out and graveyard-shift casino and hospitality workers looking for a meal.",
    },
    laborMarketNote:
      "A large share of Las Vegas's hospitality workforce is represented by the Culinary Workers Union Local 226, one of the most powerful hospitality unions in the country — for union shops, wages, benefits, and scheduling rules are set largely by contract rather than by an individual restaurant.",
    laborMarketSource: {
      label: "UNITE HERE Culinary Workers Union Local 226",
      asOf: "2025",
    },
    serviceAreaNeighborhoods: [
      "The Strip",
      "Summerlin",
      "Henderson",
      "Downtown / Fremont East",
      "Chinatown (Spring Mountain Rd)",
    ],
    localFaqs: [
      {
        question: "Can it cover true overnight, graveyard-shift call volume?",
        answer:
          "Yes — it's available around the clock, which matters in a market where a real second call peak happens between 1am and 4am.",
      },
      {
        question: "Does it work for a restaurant with unionized front-of-house staff?",
        answer:
          "Yes — it handles phone answering only and doesn't touch union-covered scheduling or FOH roles, so it complements a union shop rather than replacing covered positions.",
      },
      {
        question: "How does it handle the swing between a slow Tuesday and a packed convention week?",
        answer:
          "Capacity scales automatically with call volume, so a CES-level convention week doesn't need advance staffing changes to avoid missed calls.",
      },
      {
        question: "Do you support multiple languages for tourist callers?",
        answer:
          "Yes — language support can be configured for the languages your Strip or off-Strip customer base actually calls in.",
      },
    ],
    metaDescription:
      "AI phone answering for Las Vegas restaurants — built for true 24-hour call volume, convention-week surges, and a heavily unionized hospitality market.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "miami-fl",
    city: "Miami",
    stateAbbr: "FL",
    metroArea: "Miami-Dade",
    timezone: "America/New_York",
    population: 442000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2000,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Florida Restaurant & Lodging Association",
      url: "https://frla.org/",
    },
    peakCallTimes: {
      description:
        "Dinner service starts and peaks later than in most US cities — call volume is heaviest between 8:30 and 10:30pm, reflecting Miami's Latin dining culture, with a secondary seasonal surge from December through March as the snowbird population swells the city.",
    },
    laborMarketNote:
      "Florida has no state income tax, but Miami's restaurant labor pool leans heavily on bilingual (Spanish-English) staff, and hiring needs swing sharply with the region's pronounced snowbird season rather than staying flat year-round.",
    laborMarketSource: { label: "U.S. Bureau of Labor Statistics", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "Brickell",
      "Wynwood",
      "Little Havana",
      "Coral Gables",
      "South Beach",
    ],
    localFaqs: [
      {
        question: "Can it take calls in Spanish as well as English?",
        answer:
          "Yes — bilingual call handling is available and matches how most Miami dining rooms and kitchens already operate.",
      },
      {
        question: "Does it help with the seasonal staffing swing during snowbird season?",
        answer:
          "Phone coverage doesn't require adding headcount for the busier winter months, so a seasonal volume jump doesn't mean a seasonal hiring scramble.",
      },
      {
        question: "Our dinner rush runs late — does coverage extend past 10pm?",
        answer:
          "Yes — it covers your full posted hours, including Miami's later-than-average dinner peak.",
      },
      {
        question: "What happens to call handling during a hurricane-related closure?",
        answer:
          "Hours and status update the same day you change them, so callers hear accurate storm-related closure information instead of ringing into an outdated voicemail.",
      },
    ],
    metaDescription:
      "AI phone answering for Miami restaurants — bilingual call handling, late Latin-dining dinner hours, and support through snowbird season and storm closures.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "new-york-ny",
    city: "New York",
    stateAbbr: "NY",
    metroArea: "New York Metro",
    timezone: "America/New_York",
    population: 8258000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 25000,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "NYC Hospitality Alliance",
      url: "https://thenycalliance.org/",
    },
    peakCallTimes: {
      description:
        "Weekday lunch hits a hard, narrow peak at noon driven by dense office towers in Midtown and the Financial District, while weekend brunch (11am-2pm Saturday and Sunday) is its own distinct high-volume block — two peaks most cities don't see with this much intensity in the same week.",
    },
    laborMarketNote:
      "New York State's minimum wage for New York City sits at $16.00/hour (effective January 2024), among the highest in the country, and the city's extreme cost of living pushes many restaurant workers to commute long distances from the outer boroughs or leave the industry for better-paying work.",
    laborMarketSource: { label: "New York State Department of Labor", asOf: "2024" },
    serviceAreaNeighborhoods: [
      "Midtown Manhattan",
      "Astoria (Queens)",
      "Williamsburg (Brooklyn)",
      "Financial District",
      "Park Slope (Brooklyn)",
    ],
    localFaqs: [
      {
        question: "Can it handle the noon lunch rush from office towers?",
        answer:
          "Yes — every call during that narrow midday window is answered concurrently, without a hold queue building up.",
      },
      {
        question: "Does it manage the weekend brunch reservation crush?",
        answer:
          "Yes — it handles waitlist and reservation calls for the Saturday-Sunday brunch block the same way it handles weekday lunch.",
      },
      {
        question: "How does this help given how high labor costs are here?",
        answer:
          "It doesn't add a headcount line at $16+/hour just to keep the phone covered, and it frees existing front-of-house staff from split attention during your busiest windows.",
      },
      {
        question: "Do you support restaurants across all five boroughs, not just Manhattan?",
        answer:
          "Yes — it works identically wherever your restaurant is located citywide, from Midtown to Astoria to Park Slope.",
      },
    ],
    metaDescription:
      "AI phone answering for New York City restaurants — built for the Midtown lunch rush, weekend brunch crush, and one of the highest labor costs in the country.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "san-francisco-ca",
    city: "San Francisco",
    stateAbbr: "CA",
    metroArea: "SF Bay Area",
    timezone: "America/Los_Angeles",
    population: 808000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 3900,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Golden Gate Restaurant Association",
      url: "https://ggra.org/",
    },
    peakCallTimes: {
      description:
        "Weekday call volume concentrates tightly around a lunch rush from Financial District and SOMA tech offices, then drops off sharply after 2pm — many downtown-adjacent restaurants see a real weekday-versus-weekend split, with noticeably lower volume on Saturdays and Sundays than a typical big city.",
    },
    laborMarketNote:
      "San Francisco sets its own city minimum wage independent of California's statewide rate, and at roughly $19/hour it's among the highest of any large US city — combined with the region's cost of living, restaurant turnover and open-role time-to-fill run persistently higher than the national average.",
    laborMarketSource: {
      label: "San Francisco Office of Labor Standards Enforcement",
      asOf: "2025",
    },
    serviceAreaNeighborhoods: [
      "Financial District",
      "SOMA",
      "Mission District",
      "Hayes Valley",
      "Chinatown",
    ],
    localFaqs: [
      {
        question: "Does it handle the sharp weekday lunch spike from downtown offices?",
        answer:
          "Yes — every call during that tight FiDi/SOMA lunch window is answered without a queue forming.",
      },
      {
        question: "We're much quieter on weekends than most restaurants — does coverage adjust?",
        answer:
          "Yes — hours and expected call patterns are configured to your actual weekday-heavy schedule, so there's no wasted setup for quiet weekend shifts.",
      },
      {
        question: "Does this help with how hard hiring is in SF right now?",
        answer:
          "It won't fix front-of-house hiring, but it removes phone-answering as a role you need to staff or retrain for, which matters when turnover is already high.",
      },
      {
        question: "Do you handle surges during major tech conference weeks?",
        answer:
          "Yes — capacity scales automatically, so a conference-driven spike in downtown lunch traffic doesn't require advance staffing changes.",
      },
    ],
    metaDescription:
      "AI phone answering for San Francisco restaurants — built for the FiDi/SOMA weekday lunch rush and one of the highest-cost, highest-turnover labor markets in the US.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "new-orleans-la",
    city: "New Orleans",
    stateAbbr: "LA",
    metroArea: "Greater New Orleans",
    timezone: "America/Chicago",
    population: 363000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 1400,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Louisiana Restaurant Association",
      url: "https://www.lra.org/",
    },
    peakCallTimes: {
      description:
        "Call volume is defined by event seasonality more than a daily clock — Mardi Gras season (January-February) and Jazz Fest (late April-May) each bring a dramatic, temporary spike on top of an otherwise moderate baseline, plus a steady late-night French Quarter crowd most nights of the week.",
    },
    laborMarketNote:
      "Louisiana has no state minimum wage law and defaults to the federal $7.25 floor, and the hospitality labor market runs on a genuine boom-and-bust cycle tied to Mardi Gras and Jazz Fest rather than steady year-round demand, making short-term staffing swings a bigger day-to-day challenge than the wage floor itself.",
    laborMarketSource: { label: "U.S. Department of Labor", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "French Quarter",
      "Garden District",
      "Marigny",
      "Bywater",
      "Uptown",
    ],
    localFaqs: [
      {
        question: "Can it absorb the Mardi Gras and Jazz Fest call surge?",
        answer:
          "Yes — capacity scales automatically for event-driven spikes, which matters most when temporary festival staffing is already stretched thin.",
      },
      {
        question: "Does it handle late-night French Quarter call volume?",
        answer:
          "Yes — it's available through your full posted hours, including the late-night stretch that's a steady feature of French Quarter business.",
      },
      {
        question: "How does seasonal staffing affect phone coverage specifically?",
        answer:
          "It doesn't require seasonal hiring or training the way a temp phone-answering hire would, so it stays consistent through the boom-and-bust cycle.",
      },
      {
        question: "Can it tell callers about parade-route closures or hours changes during Mardi Gras?",
        answer:
          "Yes, if you update your hours or status — changes reflect on the next call, so customers hear accurate, current information during parade season.",
      },
    ],
    metaDescription:
      "AI phone answering for New Orleans restaurants — built to absorb Mardi Gras and Jazz Fest call surges and steady late-night French Quarter volume.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "denver-co",
    city: "Denver",
    stateAbbr: "CO",
    metroArea: "Denver Metro",
    timezone: "America/Denver",
    population: 713000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 3000,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Colorado Restaurant Association",
      url: "https://corestaurant.org/",
    },
    peakCallTimes: {
      description:
        "Weekend brunch is Denver's single largest call-volume block (Saturday-Sunday 10am-1pm), amplified by ski-season weekend visitors passing through the city on their way to and from the mountains; weekday patterns are comparatively modest next to that brunch peak.",
    },
    laborMarketNote:
      "Denver is one of the few US cities that sets its own local minimum wage separate from — and higher than — the Colorado state rate, a labor cost that restaurants just outside city limits in the same metro don't carry.",
    laborMarketSource: { label: "Denver Auditor's Office", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "LoDo (Lower Downtown)",
      "RiNo (River North)",
      "Capitol Hill",
      "Cherry Creek",
      "Highlands",
    ],
    localFaqs: [
      {
        question: "Can it manage our weekend brunch reservation and waitlist calls?",
        answer:
          "Yes — it handles the Saturday-Sunday brunch block, which is Denver's biggest single call-volume period, without needing extra weekend staff.",
      },
      {
        question: "Does it help with ski-season weekend traffic passing through?",
        answer:
          "Yes — call volume from weekend mountain-bound visitors is handled the same as any other surge, without advance staffing changes.",
      },
      {
        question: "Does Denver's city minimum wage change how this pencils out?",
        answer:
          "Since Denver's local wage runs higher than the state rate, phone coverage that doesn't require an added headcount line matters more here than in a suburb just outside city limits.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available.",
      },
    ],
    metaDescription:
      "AI phone answering for Denver restaurants — built around the weekend brunch rush, ski-season visitor traffic, and the city's own local minimum wage.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "phoenix-az",
    city: "Phoenix",
    stateAbbr: "AZ",
    metroArea: "Phoenix Metro (Valley of the Sun)",
    timezone: "America/Phoenix",
    population: 1650000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2900,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Arizona Restaurant Association",
      url: "https://azrestaurant.org/",
    },
    peakCallTimes: {
      description:
        "Summer heat (regularly 110°F+ June-August) suppresses midday walk-in and patio traffic and pushes a larger share of orders to phone and delivery in the early evening once temperatures drop; the opposite happens November-April, when a large seasonal snowbird population lifts overall call volume across the board.",
    },
    laborMarketNote:
      "Arizona's minimum wage is indexed to inflation and rises most years, and the metro's rapid population growth has kept the restaurant labor market persistently tight, with many operators competing directly against warehouse and logistics employers for the same entry-level workers.",
    laborMarketSource: { label: "Industrial Commission of Arizona", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "Arcadia",
      "Roosevelt Row (RoRo)",
      "Old Town Scottsdale",
      "Tempe",
      "Ahwatukee",
    ],
    localFaqs: [
      {
        question: "Does call handling change between summer and winter season?",
        answer:
          "Yes — configuration can shift toward evening phone and delivery emphasis during peak summer heat, then back to a fuller-day pattern once snowbird season picks up.",
      },
      {
        question: "Can it help during the snowbird population surge?",
        answer:
          "Yes — call volume scales automatically through the November-April surge without needing seasonal hires just to answer phones.",
      },
      {
        question: "We're competing with warehouse jobs for staff — does this reduce the burden at least?",
        answer:
          "It won't solve hiring against logistics-sector wages, but it takes phone answering off the list of roles you need to fill or retrain for.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available.",
      },
    ],
    metaDescription:
      "AI phone answering for Phoenix-area restaurants — built around summer-heat evening call shifts, snowbird-season surges, and a fast-growing, tight labor market.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "atlanta-ga",
    city: "Atlanta",
    stateAbbr: "GA",
    metroArea: "Atlanta Metro",
    timezone: "America/New_York",
    population: 499000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2600,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Georgia Restaurant Association",
      url: "https://www.garestaurants.org/",
    },
    peakCallTimes: {
      description:
        "Buckhead's concentration of corporate headquarters drives a sharp weekday lunch peak (11:30am-1:30pm), while a separate Friday-Saturday dinner-and-late-night peak clusters around Midtown and West Midtown — two peaks tied to two different parts of the city rather than one citywide rush.",
    },
    laborMarketNote:
      "Georgia has no meaningful state minimum wage above the federal floor and no city-level minimum wage ordinance, but the sheer density of new restaurant openings across Buckhead, Midtown, and West Midtown creates intense competition for experienced kitchen and service staff regardless of the wage floor.",
    laborMarketSource: { label: "U.S. Bureau of Labor Statistics", asOf: "2025" },
    serviceAreaNeighborhoods: [
      "Buckhead",
      "Midtown",
      "West Midtown",
      "Old Fourth Ward",
      "East Atlanta Village",
    ],
    localFaqs: [
      {
        question: "Does it handle the Buckhead corporate lunch rush?",
        answer:
          "Yes — the tight weekday lunch window driven by Buckhead's office towers is covered without a hold queue.",
      },
      {
        question: "What about Midtown's dinner and late-night crowd?",
        answer:
          "Yes — it covers the separate Friday-Saturday dinner-and-late-night peak around Midtown and West Midtown just as it covers the daytime Buckhead rush.",
      },
      {
        question: "With so many new restaurants opening, does this help with hiring competition?",
        answer:
          "It doesn't solve hiring, but phone answering becomes a role you no longer need to compete for staff to fill.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available.",
      },
    ],
    metaDescription:
      "AI phone answering for Atlanta restaurants — built for the Buckhead corporate lunch rush and Midtown's separate dinner and late-night peak.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "portland-or",
    city: "Portland",
    stateAbbr: "OR",
    metroArea: "Portland Metro",
    timezone: "America/Los_Angeles",
    population: 630000,
    populationSource: { label: "U.S. Census Bureau", asOf: "2024" },
    restaurantCount: {
      value: 2400,
      source: {
        label: "X1 Voice estimate based on public directory listings",
        asOf: "2026-01",
      },
    },
    localRestaurantAssociation: {
      name: "Oregon Restaurant & Lodging Association",
      url: "https://www.oregonrla.org/",
    },
    peakCallTimes: {
      description:
        "Weekend brunch dominates Portland's call pattern more than any weekday lunch rush — a well-documented local dining habit — and the rainy October-through-April stretch pushes a noticeably larger share of overall volume toward delivery and pickup calls compared to the drier summer months.",
    },
    laborMarketNote:
      "Oregon is one of the only states to set minimum wage in three separate regional tiers by law, and the Portland metro tier is the highest of the three — a structure that adds real complexity for any multi-location group operating both inside and outside the metro boundary.",
    laborMarketSource: {
      label: "Oregon Bureau of Labor and Industries (BOLI)",
      asOf: "2025",
    },
    serviceAreaNeighborhoods: [
      "Pearl District",
      "Alberta Arts District",
      "Hawthorne",
      "Sellwood-Moreland",
      "Northwest / Nob Hill",
    ],
    localFaqs: [
      {
        question: "Can it handle our weekend brunch reservation and waitlist volume?",
        answer:
          "Yes — it covers Portland's brunch-heavy call pattern, which tends to outweigh weekday lunch volume here.",
      },
      {
        question: "Does call handling shift for the rainy season?",
        answer:
          "Yes — configuration can lean toward delivery and pickup call flows for the October-April stretch, matching the seasonal shift away from dine-in.",
      },
      {
        question:
          "We operate locations both inside and outside the Portland metro wage tier — does this help?",
        answer:
          "Yes — call handling stays consistent across every location regardless of which of Oregon's three minimum-wage tiers a given site falls under. See the multi-location page for group rollout details.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available.",
      },
    ],
    metaDescription:
      "AI phone answering for Portland restaurants — built around weekend brunch volume, rainy-season delivery call patterns, and Oregon's tiered minimum wage.",
    updatedAt: "2026-06-15",
  },
]

/** Full coverage list for the /locations hub — includes cities with no dedicated page. */
export const allServedCities: { city: string; stateAbbr: string }[] = [
  { city: "Austin", stateAbbr: "TX" },
  { city: "Nashville", stateAbbr: "TN" },
  { city: "Chicago", stateAbbr: "IL" },
  { city: "Las Vegas", stateAbbr: "NV" },
  { city: "Miami", stateAbbr: "FL" },
  { city: "New York", stateAbbr: "NY" },
  { city: "San Francisco", stateAbbr: "CA" },
  { city: "New Orleans", stateAbbr: "LA" },
  { city: "Denver", stateAbbr: "CO" },
  { city: "Phoenix", stateAbbr: "AZ" },
  { city: "Atlanta", stateAbbr: "GA" },
  { city: "Portland", stateAbbr: "OR" },
  { city: "Dallas", stateAbbr: "TX" },
  { city: "Houston", stateAbbr: "TX" },
  { city: "San Antonio", stateAbbr: "TX" },
  { city: "Charlotte", stateAbbr: "NC" },
  { city: "Raleigh", stateAbbr: "NC" },
  { city: "Orlando", stateAbbr: "FL" },
  { city: "Tampa", stateAbbr: "FL" },
  { city: "Jacksonville", stateAbbr: "FL" },
  { city: "Columbus", stateAbbr: "OH" },
  { city: "Indianapolis", stateAbbr: "IN" },
  { city: "Kansas City", stateAbbr: "MO" },
  { city: "St. Louis", stateAbbr: "MO" },
  { city: "Minneapolis", stateAbbr: "MN" },
  { city: "Detroit", stateAbbr: "MI" },
  { city: "Philadelphia", stateAbbr: "PA" },
  { city: "Boston", stateAbbr: "MA" },
  { city: "Washington", stateAbbr: "DC" },
  { city: "Baltimore", stateAbbr: "MD" },
  { city: "Seattle", stateAbbr: "WA" },
  { city: "San Diego", stateAbbr: "CA" },
  { city: "Los Angeles", stateAbbr: "CA" },
  { city: "Salt Lake City", stateAbbr: "UT" },
  { city: "Charleston", stateAbbr: "SC" },
]
