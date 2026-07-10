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
  /** ISO date, shown on-page as "Data updated as of …". */
  updatedAt: string
}

/**
 * Quality-gated subset of the old 47 near-identical city pages (down to a
 * ceiling of ~10-12). A dedicated page ships ONLY for a city that can
 * honestly fill every required field above, ship fewer if fewer qualify.
 * Cities without a dedicated page still appear in the /locations hub list.
 */
export const locations: LocationPage[] = [
  {
    slug: "austin-tx",
    city: "Austin",
    stateAbbr: "TX",
    metroArea: "Austin, Round Rock Metro",
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
        "Weekday lunch runs on downtown and Domain-area tech offices, roughly 11:30am to 1:30pm. The bigger swing comes Thursday through Saturday from 9pm to midnight, when the Rainey Street and Red River bars and live-music venues empty out and everyone starts calling around for late food. During SXSW in March and ACL Fest in October, that late peak climbs even higher.",
    },
    laborMarketNote:
      "Texas has no state income tax, which helps take-home pay. The catch is that Austin restaurants recruit from the same entry-level pool as a fast-growing tech sector that pays far more, so service-industry staffing stays tight even as the city keeps growing.",
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
          "Yes. Capacity scales with call volume on its own, so a festival week that might triple your normal count doesn't turn into missed orders or reservations.",
      },
      {
        question:
          "Can it manage late-night calls from the Rainey Street and Red River crowd?",
        answer:
          "Yes. It answers through your full posted hours, including the 11pm to 1am stretch when bar crowds are calling around for food, and nobody on staff has to sit on phone duty that late.",
      },
      {
        question:
          "We keep losing staff to tech-adjacent jobs. Does this help with hiring?",
        answer:
          "It won't fix hiring, but it takes phone answering off the list of things you need a person for. A short-staffed shift stops meaning missed calls on top of everything else.",
      },
      {
        question: "Do you support Spanish-speaking callers?",
        answer:
          "Yes. You can set it up to take calls in English and Spanish both, same as a lot of Austin kitchens and front counters operate day to day.",
      },
    ],
    metaDescription:
      "AI phone answering for Austin restaurants that holds up through SXSW and ACL Fest surges, late-night Rainey Street calls, and a tight tech-driven labor market.",
    updatedAt: "2026-06-15",
  },
  {
    slug: "nashville-tn",
    city: "Nashville",
    stateAbbr: "TN",
    metroArea: "Nashville, Davidson Metro",
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
        "Call volume here isn't lunch-driven. It peaks late, Thursday through Saturday between 10pm and 1am, on the back of the Broadway honky-tonk and bachelorette and bachelor-party crowd hunting for late food. The pattern holds nearly year-round instead of following a normal dinner-rush curve.",
    },
    laborMarketNote:
      "Tennessee has no state minimum wage law, so the federal $7.25 floor applies. Wages aren't the real squeeze, though. A decade of tourism growth around Broadway has pushed restaurant staffing demand well past what the local labor supply can cover, and late-night shifts are the hardest to fill.",
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
          "Yes. Coverage follows whatever hours you post, including the after-midnight window most staffing schedules never reach.",
      },
      {
        question: "Does it handle large bachelorette or bachelor-party reservation calls?",
        answer:
          "It collects headcount, timing, and private-space questions for group bookings, then passes anything that needs a custom package to your team.",
      },
      {
        question: "Is restaurant staffing really this tight in Nashville specifically?",
        answer:
          "Tennessee's wage floor is the federal minimum, but tourism demand for restaurant labor around Broadway has outgrown the local workforce. That mismatch is particular to Nashville's growth curve.",
      },
      {
        question: "Do tourists call asking about live-music schedules, not just food?",
        answer:
          "All the time. You can load basic live-music schedule and cover-charge answers into its configuration, and it handles those alongside food and reservation calls.",
      },
    ],
    metaDescription:
      "AI phone answering built for Nashville restaurants: late-night Broadway crowds, bachelorette-party reservation calls, and a tourism-stretched labor market.",
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
        "Chicago runs two separate peaks: a sharp weekday Loop lunch rush from 11:30am to 1pm out of the downtown office towers, and a Friday-Saturday dinner peak in neighborhood corridors like Wicker Park and Logan Square. From December through March, a noticeably larger share of that neighborhood volume shifts to pickup and delivery calls instead of walk-in dine-in.",
    },
    laborMarketNote:
      "Chicago sets its own minimum wage by city ordinance, separate from the Illinois statewide rate. On top of that, the City Council voted in 2023 to phase out the subminimum tipped wage entirely by 2028, a labor-cost shift most other metros aren't facing yet.",
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
          "Yes. Calls are handled concurrently, so a Loop lunch spike and a Wicker Park dinner rush later the same day both get answered with no queue.",
      },
      {
        question: "How does Chicago's tipped-wage phase-out affect us, and does this help?",
        answer:
          "It doesn't change the wage law. What it does is keep phone volume covered as labor costs rise through the phase-out, without adding headcount just for the phones.",
      },
      {
        question: "Do winter months change how call handling should work?",
        answer:
          "Yes. You can weight your winter configuration toward pickup and delivery call flows, which is where the season pushes volume anyway.",
      },
      {
        question: "Does it work with the POS systems Chicago restaurants actually use?",
        answer:
          "It syncs with Square and Clover today, and OrderCounter and OrderOut are also available, so pricing stays accurate across both peaks.",
      },
    ],
    metaDescription:
      "AI phone answering for Chicago restaurants, from the Loop lunch rush to neighborhood dinner peaks, with the tipped-wage phase-out on the horizon.",
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
        "The Strip runs 24 hours, so Las Vegas never gets the quiet overnight stretch most cities do. On top of a normal dinner rush there's a genuine second peak between 1am and 4am, tied to shows letting out and graveyard-shift casino and hospitality workers looking for a meal.",
    },
    laborMarketNote:
      "A large share of the Las Vegas hospitality workforce is represented by Culinary Workers Union Local 226, one of the most powerful hospitality unions in the country. In a union shop, wages, benefits, and scheduling rules are set largely by contract rather than by the individual restaurant.",
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
          "Yes. It runs around the clock, which matters in a market where the day's second call peak lands between 1am and 4am.",
      },
      {
        question: "Does it work for a restaurant with unionized front-of-house staff?",
        answer:
          "Yes. It answers phones and nothing else. Union-covered scheduling and front-of-house roles stay untouched, so it fits alongside a union shop rather than replacing covered positions.",
      },
      {
        question: "How does it handle the swing between a slow Tuesday and a packed convention week?",
        answer:
          "You don't have to plan for it. Capacity follows call volume, so a CES-scale convention week doesn't need staffing changes ahead of time to avoid missed calls.",
      },
      {
        question: "Do you support multiple languages for tourist callers?",
        answer:
          "Yes. Language support is configurable, so you can match whatever languages your Strip or off-Strip callers actually use.",
      },
    ],
    metaDescription:
      "AI phone answering for Las Vegas restaurants that handles true 24-hour call volume, convention-week surges, and union-shop realities on and off the Strip.",
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
        "Dinner starts late here. Call volume is heaviest between 8:30 and 10:30pm, in line with Miami's Latin dining culture, and a secondary seasonal surge runs December through March while the snowbird population swells the city.",
    },
    laborMarketNote:
      "Florida has no state income tax, but the Miami restaurant labor pool leans hard on bilingual Spanish-English staff, and hiring needs swing with the region's pronounced snowbird season instead of holding flat through the year.",
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
          "Yes. It takes calls in Spanish and English, which matches how most Miami dining rooms and kitchens already run.",
      },
      {
        question: "Does it help with the seasonal staffing swing during snowbird season?",
        answer:
          "The winter volume jump doesn't come with a hiring scramble. Phone coverage stays the same whether it's August or February, with no seasonal headcount attached.",
      },
      {
        question: "Our dinner rush runs late. Does coverage extend past 10pm?",
        answer:
          "Yes. It stays on for all your posted hours, and Miami's later-than-average dinner peak falls well inside them.",
      },
      {
        question: "What happens to call handling during a hurricane-related closure?",
        answer:
          "Update your hours or status and callers hear it the same day. During a storm closure they get accurate information instead of ringing into a stale voicemail.",
      },
    ],
    metaDescription:
      "AI phone answering for Miami restaurants: Spanish and English call handling, late Latin-dining dinner hours, snowbird season, and storm closures.",
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
        "Weekday lunch hits a hard, narrow peak at noon, packed in by the dense office towers of Midtown and the Financial District. Weekend brunch, 11am to 2pm on Saturday and Sunday, is its own high-volume block. Few cities see both peaks at this intensity in the same week.",
    },
    laborMarketNote:
      "New York State's minimum wage for New York City is $16.00 an hour as of January 2024, among the highest in the country. The city's extreme cost of living pushes many restaurant workers into long commutes from the outer boroughs, and plenty leave the industry for better-paying work altogether.",
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
          "Yes. Every call in that narrow midday window is picked up concurrently, so no hold queue builds while the counter is slammed.",
      },
      {
        question: "Does it manage the weekend brunch reservation crush?",
        answer:
          "Yes. Waitlist and reservation calls through the Saturday and Sunday brunch block get the same treatment as weekday lunch.",
      },
      {
        question: "How does this help given how high labor costs are here?",
        answer:
          "You skip adding a headcount line at $16-plus an hour just to keep the phone covered, and existing front-of-house staff stop splitting attention during your busiest windows.",
      },
      {
        question: "Do you support restaurants across all five boroughs, not just Manhattan?",
        answer:
          "Yes. It works the same from Midtown to Astoria to Park Slope, anywhere in the city.",
      },
    ],
    metaDescription:
      "AI phone answering for NYC restaurants facing the Midtown noon rush, the weekend brunch crush, and some of the highest labor costs in the country.",
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
        "Weekday volume bunches tightly around a lunch rush from Financial District and SOMA tech offices, then drops off sharply after 2pm. Many downtown-adjacent restaurants see a real weekday-versus-weekend split, with Saturdays and Sundays noticeably quieter than in a typical big city.",
    },
    laborMarketNote:
      "San Francisco sets its own city minimum wage independent of California's statewide rate, and at roughly $19 an hour it's among the highest of any large US city. Between that and the region's cost of living, restaurant turnover and open-role time-to-fill run persistently above the national average.",
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
          "Yes. The tight FiDi and SOMA lunch window is answered call for call, with no queue forming.",
      },
      {
        question: "We're much quieter on weekends than most restaurants. Does coverage adjust?",
        answer:
          "Yes. Hours and expected call patterns are set to your actual weekday-heavy schedule, so quiet weekend shifts don't carry configuration they don't need.",
      },
      {
        question: "Does this help with how hard hiring is in SF right now?",
        answer:
          "It won't fill front-of-house openings. What it removes is phone answering as a role you have to staff and retrain, which counts when turnover is already high.",
      },
      {
        question: "Do you handle surges during major tech conference weeks?",
        answer:
          "Yes. A conference week that spikes downtown lunch traffic is handled as it comes, no advance staffing moves needed.",
      },
    ],
    metaDescription:
      "AI phone answering for San Francisco restaurants built around the FiDi and SOMA weekday lunch spike and a high-cost, high-turnover restaurant labor market.",
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
        "The calendar matters more than the clock here. Mardi Gras season in January and February and Jazz Fest from late April into May each drop a dramatic, temporary spike on top of an otherwise moderate baseline, and the French Quarter keeps a steady late-night crowd most nights of the week.",
    },
    laborMarketNote:
      "Louisiana has no state minimum wage law, so the federal $7.25 floor applies. The bigger operational problem is that hospitality labor here runs on a genuine boom-and-bust cycle around Mardi Gras and Jazz Fest, which makes short-term staffing swings a tougher day-to-day challenge than the wage floor itself.",
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
          "Yes. It absorbs event spikes as they arrive, which matters most when temporary festival staffing is already stretched thin.",
      },
      {
        question: "Does it handle late-night French Quarter call volume?",
        answer:
          "Yes. It runs through your full posted hours, and the late-night stretch is a steady feature of French Quarter business anyway.",
      },
      {
        question: "How does seasonal staffing affect phone coverage specifically?",
        answer:
          "A temp phone hire needs recruiting and training every season. This doesn't, so coverage holds steady through the whole boom-and-bust cycle.",
      },
      {
        question: "Can it tell callers about parade-route closures or hours changes during Mardi Gras?",
        answer:
          "Yes, as long as you update your hours or status. Changes take effect on the next call, so customers get current information all through parade season.",
      },
    ],
    metaDescription:
      "AI phone answering for New Orleans restaurants that absorbs Mardi Gras and Jazz Fest call surges plus steady late-night French Quarter volume.",
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
        "Weekend brunch is Denver's single largest call-volume block, Saturday and Sunday from 10am to 1pm, and ski-season weekend visitors passing through on their way to and from the mountains push it higher still. Weekday patterns look modest next to that brunch peak.",
    },
    laborMarketNote:
      "Denver is one of the few US cities that sets its own local minimum wage, higher than the Colorado state rate. Restaurants inside city limits carry a labor cost that competitors in the same metro just outside the line don't.",
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
          "Yes. The Saturday and Sunday brunch block is Denver's biggest single call-volume period, and it's covered without putting extra staff on weekend phones.",
      },
      {
        question: "Does it help with ski-season weekend traffic passing through?",
        answer:
          "Yes. Weekend mountain-bound traffic is just more calls, and it gets picked up like any other busy stretch.",
      },
      {
        question: "Does Denver's city minimum wage change how this pencils out?",
        answer:
          "It changes the math. With a local wage above the state rate, phone coverage that doesn't add a headcount line is worth more inside city limits than it is one suburb over.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Square and Clover sync today. OrderCounter and OrderOut are available too.",
      },
    ],
    metaDescription:
      "AI phone answering for Denver restaurants: the weekend brunch rush, ski-season visitor traffic, and a city minimum wage set above the Colorado state rate.",
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
        "Summer heat, regularly 110°F and up from June through August, suppresses midday walk-in and patio traffic and pushes a bigger share of orders to phone and delivery in the early evening once temperatures drop. From November through April the pattern flips, with a large seasonal snowbird population lifting call volume across the board.",
    },
    laborMarketNote:
      "Arizona's minimum wage is indexed to inflation and rises most years, and the metro's rapid population growth keeps the restaurant labor market persistently tight. Many operators here are bidding against warehouse and logistics employers for the same entry-level workers.",
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
          "Yes. You can tilt the configuration toward evening phone and delivery traffic during peak summer heat, then back to a fuller-day pattern once snowbird season picks up.",
      },
      {
        question: "Can it help during the snowbird population surge?",
        answer:
          "Yes. Call volume can climb through the November-to-April stretch without you hiring seasonal help just to cover phones.",
      },
      {
        question: "We're competing with warehouse jobs for staff. Does this at least reduce the burden?",
        answer:
          "It won't win a wage fight with the logistics sector. It just means phone answering is no longer one of the jobs you're trying to fill.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "If you run Square or Clover, yes, those sync today. OrderCounter and OrderOut are also options.",
      },
    ],
    metaDescription:
      "AI phone answering for Phoenix-area restaurants through summer-heat evening call shifts, snowbird-season surges, and a tight, fast-growing labor market.",
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
        "Buckhead's concentration of corporate headquarters drives a sharp weekday lunch peak from 11:30am to 1:30pm, while a separate Friday-Saturday dinner-and-late-night peak clusters around Midtown and West Midtown. Two peaks, two different parts of the city, not one citywide rush.",
    },
    laborMarketNote:
      "Georgia has no meaningful state minimum wage above the federal floor and no city-level minimum wage ordinance. The pressure comes from density instead: so many new restaurants keep opening across Buckhead, Midtown, and West Midtown that competition for experienced kitchen and service staff is intense regardless of the wage floor.",
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
          "Yes. The tight weekday lunch window off Buckhead's office towers is answered without a hold queue.",
      },
      {
        question: "What about Midtown's dinner and late-night crowd?",
        answer:
          "Covered too. The Friday-Saturday dinner-and-late-night peak around Midtown and West Midtown gets the same handling as the daytime Buckhead rush.",
      },
      {
        question: "With so many new restaurants opening, does this help with hiring competition?",
        answer:
          "It doesn't solve hiring. It does make phone answering one role you no longer have to outbid other restaurants to fill.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Most likely. Square and Clover sync today, and OrderCounter and OrderOut are supported as well.",
      },
    ],
    metaDescription:
      "AI phone answering for Atlanta restaurants covering the Buckhead corporate lunch rush and Midtown's separate dinner and late-night peak, with no hold queue.",
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
        "Weekend brunch dominates Portland's call pattern more than any weekday lunch rush, a well-documented local dining habit. The rainy October-through-April stretch also moves a noticeably larger share of overall volume to delivery and pickup calls compared with the drier summer months.",
    },
    laborMarketNote:
      "Oregon is one of the only states that sets minimum wage in three separate regional tiers by law, and the Portland metro tier is the highest of the three. For a multi-location group operating on both sides of the metro boundary, that structure adds real complexity.",
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
          "Yes. Brunch is where Portland's call volume actually concentrates, more than weekday lunch, and it's fully covered.",
      },
      {
        question: "Does call handling shift for the rainy season?",
        answer:
          "Yes. For the October-to-April stretch you can lean the setup toward delivery and pickup call flows, matching the seasonal move away from dine-in.",
      },
      {
        question:
          "We run locations both inside and outside the Portland metro wage tier. Does this help?",
        answer:
          "Yes. Call handling works the same at every location, whichever of Oregon's three minimum-wage tiers a site falls under. The multi-location page covers group rollouts.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Square and Clover are the direct syncs today; OrderCounter and OrderOut work too.",
      },
    ],
    metaDescription:
      "AI phone answering for Portland restaurants: weekend brunch volume, rainy-season delivery and pickup calls, and Oregon's three-tier minimum wage.",
    updatedAt: "2026-06-15",
  },
]

/** Full coverage list for the /locations hub, includes cities with no dedicated page. */
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
