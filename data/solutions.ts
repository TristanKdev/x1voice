export type PainPoint = {
  title: string
  description: string
}

export type Faq = {
  question: string
  answer: string
}

export type SolutionPage = {
  slug: string
  restaurantType: string
  heroHeadline: string
  heroSubhead: string
  /** Min 3 — must reflect the actual operational reality of this restaurant type, not boilerplate. */
  painPoints: PainPoint[]
  /** Concrete, type-specific capabilities (e.g. half-and-half pizza logic, VIP recognition for fine dining). */
  features: PainPoint[]
  statHighlight?: { value: string; label: string }
  /** Min 3, feeds FAQPage JSON-LD. */
  faqs: Faq[]
  metaDescription: string
}

/**
 * 11 restaurant-type solution pages. Each entry must be genuinely
 * differentiated — the pre-rebuild audit found this page family was the one
 * bright spot on the old site (real per-type pain points), so the bar here
 * is to preserve and extend that, not template it out.
 */
export const solutions: SolutionPage[] = [
  {
    slug: "pizza-restaurants",
    restaurantType: "Pizza Restaurants",
    heroHeadline: "Never miss another pizza order — even at 7:45 on a Friday.",
    heroSubhead:
      "X1 Voice answers every call during your dinner rush, prices half-and-half and extra-topping orders correctly, and remembers what your regulars usually get.",
    painPoints: [
      {
        title: "Half-and-half math slows down the whole line",
        description:
          "Split pizzas and extra-topping pricing require someone to stop and do the math mid-order, and during a rush that's time the line doesn't have.",
      },
      {
        title: "Friday and Saturday call volume outruns your staff",
        description:
          "Dinner-rush calls stack up while your crew is heads-down building pies — every ring competing with a hot oven for attention.",
      },
      {
        title: "\"The usual\" isn't usual for whoever answers",
        description:
          "Regulars calling in their standard order get put on hold while someone hunts for order history or asks them to repeat it from scratch.",
      },
    ],
    features: [
      {
        title: "Menu-aware topping and pricing logic",
        description:
          "Handles half-and-half splits, per-topping charges, and specialty pies the same way your counter staff would — no manual math required.",
      },
      {
        title: "Every call answered during the rush",
        description:
          "Calls are handled concurrently, so a full dinner rush doesn't mean hold music or a busy signal for the next customer.",
      },
      {
        title: "Repeat-caller recognition",
        description:
          "Pulls up a regular's recent order by caller ID, so \"the usual\" actually works without a staff member digging for it.",
      },
    ],
    statHighlight: {
      value: "3-to-1",
      label:
        "A rough sense of how many calls can ring in against available counter staff during a typical Friday dinner rush",
    },
    faqs: [
      {
        question: "Can it handle half-and-half and extra-topping pricing correctly?",
        answer:
          "Yes — it's set up with your actual topping and pricing rules, including split pizzas, extra-topping charges, and specialty pies, so it prices orders the way your counter would.",
      },
      {
        question: "What about coupon codes or deals mentioned over the phone?",
        answer:
          "It can recognize and apply deals you've configured for phone orders. Anything that's genuinely online-only gets explained as such instead of applied incorrectly.",
      },
      {
        question: "Does it recognize regular customers?",
        answer:
          "Using caller ID, it can reference a repeat caller's recent orders so \"the usual\" works — you control exactly what order history it's allowed to use.",
      },
      {
        question: "Does it work with our POS for topping pricing?",
        answer:
          "Yes — menu and pricing sync from your POS. Square and Clover today, with OrderCounter and OrderOut also available. See /integrations for setup details.",
      },
    ],
    metaDescription:
      "AI phone answering for pizza shops that gets half-and-half toppings, extra-topping pricing, and regulars' usual order right, even during the Friday rush.",
  },
  {
    slug: "chinese-restaurants",
    restaurantType: "Chinese Restaurants",
    heroHeadline: "Handle every combination-plate call without slowing down the wok.",
    heroSubhead:
      "X1 Voice takes detailed Chinese-menu orders — protein swaps, spice level, lunch-special timing — and gets them right the first time, no matter how many calls come in at once.",
    painPoints: [
      {
        title: "Modifier-heavy orders slow down the line",
        description:
          "Protein swaps, spice level, \"no peanuts,\" sauce on the side — a single family-style order can carry a dozen small customizations, and one missed detail sends the wrong dish out.",
      },
      {
        title: "Lunch-special rules get misquoted",
        description:
          "Lunch pricing, cutoff times, and what's included (soup, egg roll, rice) differ from the dinner menu, and whoever answers the phone doesn't always know today's rules near the cutoff.",
      },
      {
        title: "Fast, mixed-language calls get mis-heard",
        description:
          "Orders taken quickly, sometimes across English and Chinese, get compressed into notepad shorthand — details that don't survive the walk from the phone to the kitchen.",
      },
    ],
    features: [
      {
        title: "Full modifier capture, per item",
        description:
          "Protein swaps, spice level, allergy notes, and sauce placement are recorded against each dish individually, not summarized into a guess.",
      },
      {
        title: "Time-aware lunch-menu logic",
        description:
          "Applies lunch pricing and inclusions automatically before your cutoff and switches to dinner rules after — no one has to check the clock.",
      },
      {
        title: "Order read-back before it reaches the kitchen",
        description:
          "Repeats the full order back to the caller before ending the call, catching a mis-heard item or swapped protein before it's fired.",
      },
    ],
    faqs: [
      {
        question: "Can it take orders in multiple languages?",
        answer:
          "Yes — it can be configured for the languages your customers actually call in, so a mixed-language order doesn't get lost at the register.",
      },
      {
        question: "Does it know our lunch-special cutoff and inclusions?",
        answer:
          "Yes — lunch pricing, cutoff time, and what each special includes are set up from your actual menu, and it switches to dinner rules automatically after the cutoff.",
      },
      {
        question: "Can it handle large family-style or catering orders?",
        answer:
          "It takes multi-item family-style orders over the phone. For larger catering requests, it captures the details and routes them to whoever manages catering rather than guessing at pricing.",
      },
      {
        question: "What happens if a customer asks for something off-menu?",
        answer:
          "If a request falls outside your menu or current specials, it says so and offers the closest real option or transfers to staff — it won't invent a dish.",
      },
    ],
    metaDescription:
      "AI phone answering for Chinese restaurants that captures protein swaps, spice level, and lunch-special rules correctly, no matter how many calls come in.",
  },
  {
    slug: "mexican-restaurants",
    restaurantType: "Mexican Restaurants",
    heroHeadline: "Every taco, burrito, and catering call answered — no shortcuts.",
    heroSubhead:
      "X1 Voice walks callers through build-your-own orders correctly and routes catering and group inquiries to the right person, even during your busiest lunch rush.",
    painPoints: [
      {
        title: "Build-your-own orders have too many branches to rush",
        description:
          "Protein, tortilla type, salsa heat, and extras each require a real decision, and a busy counter staffer answering the phone mid-line skips steps just to keep moving.",
      },
      {
        title: "Catering and taco-bar calls get treated like a to-go order",
        description:
          "Per-person pricing, headcount, and event pickup time need real answers, but if whoever picks up doesn't handle catering, the caller gets a guess instead of a quote.",
      },
      {
        title: "Weekday lunch brings a burst of simple calls all at once",
        description:
          "Nearby offices calling in orders right at noon create a wave of short, fast calls that compete directly with the walk-in line for the same one or two people.",
      },
    ],
    features: [
      {
        title: "Branching build logic, every time",
        description:
          "Walks every taco, burrito, or bowl order through protein, tortilla, and heat-level choices consistently — the same way, call after call.",
      },
      {
        title: "Catering inquiries routed, not guessed",
        description:
          "Recognizes group and catering requests, gives the per-person pricing you've set, and captures headcount, date, and pickup time for staff follow-up.",
      },
      {
        title: "Handles lunch-rush call bursts without a queue",
        description:
          "Every call during the noon rush gets answered immediately — office orders don't wait behind each other, and they don't wait behind the counter line either.",
      },
    ],
    faqs: [
      {
        question: "Can it handle catering and taco-bar quotes?",
        answer:
          "It recognizes catering requests, provides per-person pricing you've configured, and captures event details for your team. For large or custom events, it hands off to staff rather than finalizing a quote itself.",
      },
      {
        question: "Can it walk customers through salsa heat and protein choices?",
        answer:
          "Yes — build-your-own items are handled with the same branching questions your counter staff would ask, so nothing gets defaulted incorrectly.",
      },
      {
        question: "What about group orders from nearby offices?",
        answer:
          "It can take multi-item group orders in one call, itemized the same way a single order would be, and sent to your POS as one ticket.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "Yes — it syncs with Square and Clover today, with OrderCounter and OrderOut also available, so build-your-own pricing stays accurate as you update it.",
      },
    ],
    metaDescription:
      "AI phone answering for Mexican restaurants that handles build-your-own orders and catering inquiries correctly, even during the weekday lunch rush.",
  },
  {
    slug: "indian-restaurants",
    restaurantType: "Indian Restaurants",
    heroHeadline: "Get spice level, dietary swaps, and thali orders right on the first call.",
    heroSubhead:
      "X1 Voice tracks vegan, Jain, and gluten-free substitutions across multi-item orders, and answers buffet-hours questions without pulling staff off the floor.",
    painPoints: [
      {
        title: "Spice level and dietary swaps vary dish by dish",
        description:
          "Vegan, Jain (no onion or garlic), and gluten-free requests apply differently to each dish, and a rushed phone order can easily attach the wrong substitution to the wrong item.",
      },
      {
        title: "Thali and combination orders need confirming, item by item",
        description:
          "Multi-course combination plates require checking what's included versus optional — bread, rice, sides — and that back-and-forth adds real hold time during dinner rush.",
      },
      {
        title: "Buffet-hours calls pull staff off the floor",
        description:
          "\"Are you doing lunch buffet today\" and per-person pricing questions come in constantly and interrupt whoever's working the floor just to answer basic scheduling information.",
      },
    ],
    features: [
      {
        title: "Per-dish spice and dietary logic",
        description:
          "Tracks vegan, Jain, and gluten-free substitutions correctly across a multi-item order, instead of applying one blanket note to the whole ticket.",
      },
      {
        title: "Thali and combo composition, built in",
        description:
          "Knows what's included versus add-on for each combination plate, so orders arrive complete without a follow-up call to confirm.",
      },
      {
        title: "Buffet hours and pricing, answered instantly",
        description:
          "Handles routine buffet-timing and per-person pricing questions around the clock, without pulling anyone off the floor during service.",
      },
    ],
    faqs: [
      {
        question: "Can it handle Jain and other strict dietary requests?",
        answer:
          "Yes — dietary rules like Jain (no onion or garlic), vegan, or gluten-free are configured per dish, so substitutions attach to the right item every time.",
      },
      {
        question: "Does it know our buffet hours and pricing?",
        answer:
          "Yes — it answers lunch-buffet timing and per-person pricing questions directly from your current schedule, without needing a staff member.",
      },
      {
        question: "Can it handle catering for events?",
        answer:
          "It captures catering inquiries — event date, headcount, menu preferences — and routes them to your team for a final quote, since most catering is custom by event.",
      },
      {
        question: "What about spice-level requests across a large order?",
        answer:
          "Each dish's spice level is tracked individually, so a mild curry and an extra-hot vindaloo on the same ticket don't get mixed up.",
      },
    ],
    metaDescription:
      "AI phone answering for Indian restaurants that tracks spice level, vegan and Jain substitutions, and thali orders correctly on every single call.",
  },
  {
    slug: "fast-casual",
    restaurantType: "Fast Casual",
    heroHeadline: "Keep the counter line moving and the phone answered — at the same time.",
    heroSubhead:
      "X1 Voice takes rush-hour phone orders and answers \"is it ready\" calls without pulling anyone off the assembly line.",
    painPoints: [
      {
        title: "Phone calls compete with the counter line for the same staff",
        description:
          "During rush, someone has to step away from the assembly line to answer the phone — or it just doesn't get answered, and that's a lost order every time.",
      },
      {
        title: "\"Is my order ready\" calls spike right at peak",
        description:
          "Mobile and online pickup orders generate a wave of status-check calls exactly when staff are busiest actually making food.",
      },
      {
        title: "Office and group orders need accuracy without slowing the line",
        description:
          "Multi-item, multi-modifier group orders called in ahead of lunch take real time to get right — time that's hard to find during a rush.",
      },
    ],
    features: [
      {
        title: "Order-status lookups, no staff needed",
        description:
          "Answers \"is my order ready\" by checking ticket status directly, so a status check never pulls someone off the line.",
      },
      {
        title: "Full rush-hour coverage",
        description:
          "Every call during peak gets answered immediately and completely off the counter staff's plate — build-line speed doesn't drop when the phone rings.",
      },
      {
        title: "Group orders captured accurately",
        description:
          "Takes multi-item office orders with every modifier, sent to your POS as one ticket ready for a pickup window.",
      },
    ],
    statHighlight: {
      value: "Rush hour",
      label:
        "When phone orders and the counter line compete hardest for the same one or two staff on shift",
    },
    faqs: [
      {
        question: "Does it check order status for mobile or app orders?",
        answer:
          "Yes — it can look up ticket status and answer \"is my order ready\" calls directly, without interrupting staff.",
      },
      {
        question: "Can it handle rush-hour call volume?",
        answer:
          "Every call is answered simultaneously — there's no queue, so a busy lunch rush doesn't mean unanswered calls.",
      },
      {
        question: "What about large group or office orders?",
        answer:
          "It takes multi-item orders with modifiers over the phone and sends them to your POS as a single ticket.",
      },
      {
        question: "How does it integrate with our POS?",
        answer:
          "It syncs with Square and Clover today, with OrderCounter and OrderOut also available. See /integrations for setup details.",
      },
    ],
    metaDescription:
      "AI phone answering for fast-casual restaurants that takes rush-hour orders and answers \"is it ready\" calls without pulling staff off the line.",
  },
  {
    slug: "fine-dining",
    restaurantType: "Fine Dining",
    heroHeadline: "Answer every reservation call the way your dining room deserves.",
    heroSubhead:
      "X1 Voice handles large-party bookings, recognizes returning guests, and captures special-occasion and dietary notes — in a tone that matches your restaurant, not a drive-thru.",
    painPoints: [
      {
        title: "Large-party and private-dining calls need real back-and-forth",
        description:
          "Headcount, date, room preference, and menu questions require actual conversation, and a host stand mid-service handles that inconsistently or asks the caller to try again later.",
      },
      {
        title: "Regulars and VIPs expect to be recognized, not re-introduced",
        description:
          "A guest who's booked a dozen times expects the host to remember their usual table or dietary note, but that context lives in someone's memory, not anywhere a new host can see it.",
      },
      {
        title: "Special-occasion and dietary notes get lost before the table",
        description:
          "Anniversaries, severe allergies, and kosher or halal requests are taken verbally at the host stand and don't reliably make it to the kitchen or the table setup.",
      },
    ],
    features: [
      {
        title: "Reservation handling with real capacity awareness",
        description:
          "Headcount, seating preference, and private-room requests are captured accurately against your actual availability — not guessed at during a busy dinner service.",
      },
      {
        title: "Recognition for regulars and VIPs",
        description:
          "Returning guests are greeted appropriately, and prior visit notes — preferred table, dietary restrictions, past occasions — surface for your host stand.",
      },
      {
        title: "Occasion and dietary notes that actually travel",
        description:
          "Anniversary, allergy, and dietary details are captured in structured form and attached to the reservation, not lost in a note at the host stand.",
      },
    ],
    statHighlight: {
      value: "One missed call",
      label:
        "can mean a lost eight-top reservation on a Saturday night — not just a missed order",
    },
    faqs: [
      {
        question: "Will it sound appropriate for a fine-dining brand?",
        answer:
          "Voice and script tone are configured to match your restaurant — formal, warm, understated — not the default chirpy tone people associate with fast-food ordering lines.",
      },
      {
        question: "Can it handle large parties and private events?",
        answer:
          "It captures headcount, date, room preference, and initial menu questions for private and large-party bookings, then hands off the details your team needs for final confirmation.",
      },
      {
        question: "Does it recognize returning guests?",
        answer:
          "Using caller ID and your reservation history, it can recognize regulars and surface prior notes — you control exactly what it's allowed to reference and say.",
      },
      {
        question: "What about a waitlist on a walk-in-heavy night?",
        answer:
          "It can take waitlist call-ins and give realistic wait estimates based on your current pace, freeing your host to manage the floor instead of the phone.",
      },
    ],
    metaDescription:
      "AI phone answering for fine-dining restaurants that handles large-party reservations, recognizes regulars, and captures dietary notes with the right tone.",
  },
  {
    slug: "food-trucks",
    restaurantType: "Food Trucks",
    heroHeadline: "Never let a call go unanswered just because you're not parked at the counter.",
    heroSubhead:
      "X1 Voice stays synced to your daily location and hours, so every \"where are you today\" call gets the right answer — without pulling anyone off the grill.",
    painPoints: [
      {
        title: "\"Where are you today?\" is the call, over and over",
        description:
          "Location changes daily, sometimes hour to hour, and answering it live means stopping the grill every time someone calls to ask.",
      },
      {
        title: "A one- or two-person crew has no capacity to answer the phone",
        description:
          "Whoever's running the window is also cooking — every ring during a lunch rush is either ignored or means stepping away from a hot line.",
      },
      {
        title: "Weather and last-minute changes don't reach callers fast enough",
        description:
          "A canceled stop or a moved location needs to be reflected immediately, or customers show up to an empty parking spot and don't come back.",
      },
    ],
    features: [
      {
        title: "Location and schedule-aware answers",
        description:
          "Synced to your posted schedule, so \"where are you today\" gets the right answer even when you change plans same-day.",
      },
      {
        title: "Zero-crew phone coverage",
        description:
          "Every call gets answered without pulling anyone off the truck — the person on the grill stays on the grill.",
      },
      {
        title: "Catering and private-event leads captured",
        description:
          "Takes down event date, headcount, and location for booking inquiries so they don't get lost between lunch and dinner service.",
      },
    ],
    statHighlight: {
      value: "Daily",
      label:
        "How often a food truck's location and hours can change — every call needs today's answer, not yesterday's",
    },
    faqs: [
      {
        question: "How do we update our location day to day?",
        answer:
          "You update your schedule the same way you do now, and X1 Voice reflects it on the next call — no separate system to maintain.",
      },
      {
        question: "Can it take pre-orders for a specific stop?",
        answer:
          "Yes — it can take orders tied to your next scheduled stop and pickup window, so customers know exactly when and where to show up.",
      },
      {
        question: "What happens on a rain-out or canceled stop?",
        answer:
          "It answers with your current status, so callers hear \"closed today\" or the updated location instead of showing up to nothing.",
      },
      {
        question: "Does it handle catering or private-event bookings?",
        answer:
          "It captures event date, headcount, and location details and routes them to you — most food-truck catering needs a human quote, so it hands off rather than booking blind.",
      },
    ],
    metaDescription:
      "AI phone answering for food trucks that stays synced to your daily location and hours, so \"where are you today\" always gets the right answer.",
  },
  {
    slug: "ghost-kitchens",
    restaurantType: "Ghost Kitchens",
    heroHeadline: "Answer every call with zero front-of-house staff.",
    heroSubhead:
      "X1 Voice covers phone orders for kitchen-only operations, routing each call to the right virtual brand — even when three brands share one kitchen and one number.",
    painPoints: [
      {
        title: "Zero front-of-house staff means zero phone coverage",
        description:
          "There's no one stationed to answer a ringing phone — the whole team is kitchen crew, heads-down on tickets, with no job description that includes \"answer the phone.\"",
      },
      {
        title: "Multiple virtual brands share one kitchen and one number",
        description:
          "A single line might need to answer as three different brands with three different menus, and a generic \"kitchen\" greeting confuses callers who ordered a specific one.",
      },
      {
        title: "No dining room to fall back on when something goes wrong",
        description:
          "With no walk-in traffic, every call is either a lost order or a delivery-platform question — there's no floor staff to smooth things over in person.",
      },
    ],
    features: [
      {
        title: "Fully unstaffed call coverage",
        description:
          "Answers every call with zero front-of-house headcount required — built for kitchens where nobody is stationed at a counter.",
      },
      {
        title: "Multi-brand routing and greeting",
        description:
          "Answers each incoming number as the correct virtual brand — right menu, right name, right voice — even when several brands run out of one kitchen.",
      },
      {
        title: "Delivery-platform-aware call handling",
        description:
          "Recognizes when a call is actually about a DoorDash or Uber Eats order and routes it appropriately, instead of taking a duplicate phone order.",
      },
    ],
    statHighlight: {
      value: "0 FOH staff",
      label:
        "Typical front-of-house headcount at a ghost kitchen — yet the phone still rings and still needs answering",
    },
    faqs: [
      {
        question: "Can it handle more than one brand on the same phone number?",
        answer:
          "If your brands share a number, it can ask which brand the caller means and route accordingly. Separate numbers per brand work even more cleanly.",
      },
      {
        question: "What happens with calls that are actually about a delivery-platform order?",
        answer:
          "It recognizes platform-related questions — where's my order, wrong item — and routes them to the right place instead of trying to take a new phone order.",
      },
      {
        question: "Do we need any front-of-house staff at all?",
        answer:
          "No — that's the point. It's built to cover call answering completely for kitchen-only operations with no one stationed at a counter.",
      },
      {
        question: "How does it work with our delivery-platform integrations?",
        answer:
          "It handles direct phone orders and platform-related questions side by side; menu and pricing sync from your POS so phone orders match what's listed on each platform.",
      },
    ],
    metaDescription:
      "AI phone answering built for kitchen-only operations — covers every call with zero front-of-house staff and routes multiple virtual brands correctly.",
  },
  {
    slug: "multi-location",
    restaurantType: "Multi-Location",
    heroHeadline: "One consistent phone experience across every location you run.",
    heroSubhead:
      "X1 Voice answers calls the same way at every store and gives you one dashboard to see call volume, missed calls, and order value across your whole group.",
    painPoints: [
      {
        title: "Call quality depends on who's on shift, store to store",
        description:
          "There's no way to guarantee every location answers the phone the same way — it depends entirely on whoever happens to pick up that day.",
      },
      {
        title: "No shared view of call performance across locations",
        description:
          "Owners and regional managers can't see call volume, missed-call rate, or order value across the group — each store is its own black box unless someone calls to ask.",
      },
      {
        title: "Menu and pricing updates roll out unevenly",
        description:
          "A new item or price change has to be re-taught to every location's staff individually, and it never lands at the same time or with the same accuracy everywhere.",
      },
    ],
    features: [
      {
        title: "One dashboard across every location",
        description:
          "Call volume, missed-call rate, and order value are visible across your whole group in one place, not fragmented store by store.",
      },
      {
        title: "One consistent script and voice, everywhere",
        description:
          "Every location answers with the same brand voice and menu accuracy — a caller to store #12 gets the same experience as store #1.",
      },
      {
        title: "Push updates to every location at once",
        description:
          "A menu or pricing change goes out to every location's AI agent simultaneously — no re-training staff site by site.",
      },
    ],
    statHighlight: {
      value: "Store by store",
      label:
        "How most multi-location groups track call performance today — one spreadsheet per site, no shared view",
    },
    faqs: [
      {
        question: "Can each location keep some local customization?",
        answer:
          "Yes — hours, specials, and location-specific menu items can differ per store while pricing rules, script tone, and brand voice stay consistent.",
      },
      {
        question: "How granular is the reporting?",
        answer:
          "You can see performance rolled up across the whole group or drilled down to a single location — call volume, missed calls, and order value at either level.",
      },
      {
        question: "How do we add a new location?",
        answer:
          "New locations are set up from your existing menu and configuration template, so onboarding a store doesn't mean starting from scratch.",
      },
      {
        question: "Does this work for franchised locations, not just corporate-owned?",
        answer:
          "Yes — franchise groups can standardize call handling across locations while still giving individual owners visibility into their own store's numbers.",
      },
    ],
    metaDescription:
      "AI phone answering for multi-location restaurant groups — one consistent voice per call and one dashboard for performance across every store.",
  },
  {
    slug: "delis-cafes",
    restaurantType: "Delis & Cafes",
    heroHeadline: "Get every sandwich build right, even in the middle of the lunch rush.",
    heroSubhead:
      "X1 Voice captures every bread, meat, cheese, and topping choice correctly, and handles office catering orders without disrupting the counter line.",
    painPoints: [
      {
        title: "Sandwich customization has more branches than most order types",
        description:
          "Bread, protein, cheese, toppings, condiments, size — every choice is a decision point, and phone orders taken fast during lunch rush are where combinations get mixed up.",
      },
      {
        title: "The lunch window is short and the phone rings when hands are full",
        description:
          "Call volume spikes right when the person who'd normally answer is also building sandwiches on the line.",
      },
      {
        title: "Office platter orders get rushed like a single sandwich",
        description:
          "Headcount, delivery time, and lead time need real handling, but a call taken mid-rush often gets the same rushed treatment as a two-item order.",
      },
    ],
    features: [
      {
        title: "Full sandwich-build capture",
        description:
          "Bread, protein, cheese, every topping and condiment recorded the way your board is actually set up, not summarized into a guess.",
      },
      {
        title: "Absorbs the entire lunch-rush call spike",
        description:
          "Every call during your busiest window gets answered without pulling anyone off sandwich assembly.",
      },
      {
        title: "Separate handling for catering and platter orders",
        description:
          "Captures headcount, delivery time, and required lead time distinctly from single-sandwich orders, so a 20-person platter isn't treated like lunch for one.",
      },
    ],
    statHighlight: {
      value: "12-1pm",
      label:
        "The hour when lunch call-ins tend to spike hardest — right when counter staff are busiest building sandwiches",
    },
    faqs: [
      {
        question: "Can it handle a fully custom sandwich order?",
        answer:
          "Yes — every choice on your board, from bread to condiments, is captured individually, matching how your kitchen actually builds it.",
      },
      {
        question: "Does it know our breakfast-to-lunch menu switch?",
        answer:
          "Yes — it applies the correct menu and pricing based on time of day, the same cutoff rules your staff would use.",
      },
      {
        question: "Can it take office catering and platter orders?",
        answer:
          "It captures headcount, delivery window, and lead-time requirements for platter and catering orders, and flags them separately from regular phone orders.",
      },
      {
        question: "Does it record allergy or topping-exclusion notes?",
        answer:
          "Yes — \"no onions,\" \"nut-free,\" and similar notes are attached to the specific line item, not lost in a general comment.",
      },
    ],
    metaDescription:
      "AI phone answering for delis and cafes that captures full sandwich builds and handles office catering orders without slowing down the lunch rush.",
  },
  {
    slug: "bakeries-coffee-shops",
    restaurantType: "Bakeries & Coffee Shops",
    heroHeadline: "Never lose a custom cake order to a scribbled note.",
    heroSubhead:
      "X1 Voice captures flavor, size, design notes, and pickup date on every custom order call, and absorbs your holiday order surge without adding staff.",
    painPoints: [
      {
        title: "Custom cake details have to survive weeks, not minutes",
        description:
          "Flavor, size, design notes, and pickup date are usually captured weeks before pickup — one dropped detail on that first call can mean the wrong cake shows up on someone's wedding day.",
      },
      {
        title: "Holiday weeks bring an order surge with zero slack",
        description:
          "Thanksgiving pie orders and Christmas cookie trays flood in on top of a full counter line, handled by the same small crew with no extra hands.",
      },
      {
        title: "\"Do you have X left today\" calls pull staff off the register",
        description:
          "Constant stock-check calls — croissants, a specific muffin flavor — mean stepping away from the counter just to go look, over and over.",
      },
    ],
    features: [
      {
        title: "Structured custom-order intake",
        description:
          "Flavor, size, design notes, and a firm pickup date and time are captured the same way every call, so no detail depends on who happened to answer.",
      },
      {
        title: "Absorbs holiday order surges",
        description:
          "Handles the seasonal spike in special orders without adding phone-answering headcount during your busiest baking weeks.",
      },
      {
        title: "Real-time, stock-aware answers",
        description:
          "Answers \"do you have X today\" questions based on what's actually available, without pulling anyone off the register to check.",
      },
    ],
    statHighlight: {
      value: "Weeks ahead",
      label:
        "How far out custom cake orders are typically placed — and how much detail has to survive from that first call to pickup day",
    },
    faqs: [
      {
        question: "Can it take a full custom cake order, including design details?",
        answer:
          "It captures flavor, size, tier count, and written design notes, then confirms a firm pickup date and time — complex design requests get flagged for a callback from your decorator if needed.",
      },
      {
        question: "Can it collect a deposit over the phone?",
        answer:
          "Deposit and payment collection can be configured if you take them for custom orders; where you require a card in person, it explains that instead of guessing.",
      },
      {
        question: "How does it handle holiday order deadlines?",
        answer:
          "It applies your seasonal cutoff dates automatically — once a holiday order window closes, it tells callers rather than taking an order you can't fulfill.",
      },
      {
        question: "Does it know about allergies, like a nut-free facility?",
        answer:
          "Yes — allergy and facility notes you provide are included in every relevant answer, so customers get accurate information on the first call.",
      },
    ],
    metaDescription:
      "AI phone answering for bakeries and coffee shops that captures custom cake details accurately and absorbs holiday order surges without extra staff.",
  },
]
