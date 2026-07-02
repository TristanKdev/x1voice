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
    heroHeadline: "Never miss another pizza order. Not even at 7:45 on a Friday.",
    heroSubhead:
      "X1 Voice picks up all through your dinner rush. It prices half-and-half and extra-topping orders correctly, and it remembers what your regulars usually get.",
    painPoints: [
      {
        title: "Half-and-half math slows down the whole line",
        description:
          "Somebody has to stop and price a split pizza with extra toppings mid-order. During a rush, that's time the line doesn't have.",
      },
      {
        title: "Friday and Saturday call volume outruns your staff",
        description:
          "Dinner-rush calls stack up while your crew is heads-down building pies. A ringing phone loses to a hot oven just about every time.",
      },
      {
        title: "\"The usual\" isn't usual for whoever answers",
        description:
          "A regular calls in their standard order and lands on hold while someone hunts through order history, or they end up repeating the whole thing from scratch.",
      },
    ],
    features: [
      {
        title: "Menu-aware topping and pricing logic",
        description:
          "Half-and-half splits, per-topping charges, and specialty pies get priced the way your counter staff would price them. Nobody does math on a notepad.",
      },
      {
        title: "A busy Friday doesn't mean busy signals",
        description:
          "It handles simultaneous calls, so a stacked dinner rush never sends the next customer to hold music or a busy signal.",
      },
      {
        title: "Repeat-caller recognition",
        description:
          "Caller ID pulls up a regular's recent orders, so \"the usual\" means something again and nobody has to go digging for it.",
      },
    ],
    statHighlight: {
      value: "3-to-1",
      label:
        "Roughly how many calls can ring in for each available counter person during a typical Friday dinner rush",
    },
    faqs: [
      {
        question: "Can it handle half-and-half and extra-topping pricing correctly?",
        answer:
          "Yes. It runs on your actual topping and pricing rules, including split pizzas, extra-topping charges, and specialty pies, so orders come out priced the way your counter would price them.",
      },
      {
        question: "What about coupon codes or deals mentioned over the phone?",
        answer:
          "It recognizes and applies the deals you've configured for phone orders. If a coupon is genuinely online-only, it tells the caller that instead of misapplying it.",
      },
      {
        question: "Does it recognize regular customers?",
        answer:
          "It can use caller ID to reference a repeat caller's recent orders, which is what makes \"the usual\" work. You decide exactly what order history it's allowed to touch.",
      },
      {
        question: "Does it work with our POS for topping pricing?",
        answer:
          "Menu and pricing sync straight from your POS. Square and Clover are supported today, with OrderCounter and OrderOut also available. Setup details live at /integrations.",
      },
    ],
    metaDescription:
      "AI phone answering for pizza shops that gets half-and-half toppings, extra-topping pricing, and regulars' usual order right, even during the Friday rush.",
  },
  {
    slug: "chinese-restaurants",
    restaurantType: "Chinese Restaurants",
    heroHeadline: "Combination-plate calls handled without slowing down the wok.",
    heroSubhead:
      "X1 Voice takes detailed Chinese-menu orders and gets them right the first time: protein swaps, spice level, lunch-special timing. It doesn't matter how many calls land at once.",
    painPoints: [
      {
        title: "Modifier-heavy orders slow down the line",
        description:
          "A single family-style order can carry a dozen small customizations: protein swaps, spice level, \"no peanuts,\" sauce on the side. Miss one detail and the wrong dish goes out.",
      },
      {
        title: "Lunch-special rules get misquoted",
        description:
          "Lunch pricing, cutoff times, and what comes with each special (soup, egg roll, rice) all differ from the dinner menu. Whoever grabs the phone near the cutoff doesn't always know today's rules.",
      },
      {
        title: "Fast, mixed-language calls get mis-heard",
        description:
          "Orders come in fast, sometimes switching between English and Chinese, and get compressed into notepad shorthand. Those details don't always survive the walk from the phone to the kitchen.",
      },
    ],
    features: [
      {
        title: "Full modifier capture, per item",
        description:
          "Protein swaps, spice level, allergy notes, and sauce placement get recorded on each dish individually. The kitchen sees exactly what the caller asked for.",
      },
      {
        title: "Time-aware lunch-menu logic",
        description:
          "Lunch pricing and inclusions apply automatically before your cutoff, and dinner rules take over after it. Nobody has to watch the clock.",
      },
      {
        title: "Order read-back before it reaches the kitchen",
        description:
          "It repeats the full order back to the caller before hanging up. A mis-heard item or a swapped protein gets caught before anything hits the wok.",
      },
    ],
    faqs: [
      {
        question: "Can it take orders in multiple languages?",
        answer:
          "Yes. It can be set up for the languages your customers actually call in, so a mixed-language order doesn't fall apart at the register.",
      },
      {
        question: "Does it know our lunch-special cutoff and inclusions?",
        answer:
          "It does. Lunch pricing, the cutoff time, and what each special includes come straight from your menu, and dinner rules kick in automatically after the cutoff.",
      },
      {
        question: "Can it handle large family-style or catering orders?",
        answer:
          "It handles multi-item family-style orders over the phone. Bigger catering requests get written down in full and passed to whoever manages catering, since pricing those is a human call.",
      },
      {
        question: "What happens if a customer asks for something off-menu?",
        answer:
          "If a request falls outside your menu or current specials, it says so, then offers the closest real option or transfers to staff. It won't invent a dish.",
      },
    ],
    metaDescription:
      "AI phone answering for Chinese restaurants that captures protein swaps, spice level, and lunch-special rules correctly, no matter how many calls come in.",
  },
  {
    slug: "mexican-restaurants",
    restaurantType: "Mexican Restaurants",
    heroHeadline: "No shortcuts on build-your-own orders, even when the line is out the door.",
    heroSubhead:
      "X1 Voice walks callers through each branch of a build-your-own order and sends catering and group inquiries to the person who actually handles them, straight through the lunch rush.",
    painPoints: [
      {
        title: "Build-your-own orders have too many branches to rush",
        description:
          "Protein, tortilla type, salsa heat, extras: each one is a real decision. A counter staffer answering the phone mid-line skips steps just to keep moving.",
      },
      {
        title: "Catering and taco-bar calls get treated like a to-go order",
        description:
          "Per-person pricing, headcount, and event pickup time need real answers. If whoever picks up doesn't handle catering, the caller gets a guess instead of a quote.",
      },
      {
        title: "Weekday lunch brings a burst of simple calls all at once",
        description:
          "Nearby offices calling in orders right at noon create a wave of short, fast calls, and those calls compete with the walk-in line for the same two sets of hands.",
      },
    ],
    features: [
      {
        title: "All the build questions, asked in order",
        description:
          "Each taco, burrito, or bowl gets walked through protein, tortilla, and heat level, one choice at a time. The questions don't get skipped when it's busy.",
      },
      {
        title: "Catering calls go to the right person",
        description:
          "It recognizes a group or catering request, quotes the per-person pricing you've set, and writes down headcount, date, and pickup time so your team can follow up.",
      },
      {
        title: "Handles lunch-rush call bursts without a queue",
        description:
          "When the offices nearby all dial in at noon, the calls get answered in parallel rather than one at a time. The walk-in line doesn't slow them down either.",
      },
    ],
    faqs: [
      {
        question: "Can it handle catering and taco-bar quotes?",
        answer:
          "It recognizes catering requests, quotes the per-person pricing you've configured, and captures event details for your team. Large or custom events get handed to staff for the final quote.",
      },
      {
        question: "Can it walk customers through salsa heat and protein choices?",
        answer:
          "Yes. It asks the same branching questions your counter staff would ask, so heat level and protein come from the caller, not from a default.",
      },
      {
        question: "What about group orders from nearby offices?",
        answer:
          "It takes multi-item group orders in one call, itemized the same way a single order would be, and sends everything to your POS as one ticket.",
      },
      {
        question: "Does it work with our POS?",
        answer:
          "It syncs with Square and Clover today. OrderCounter and OrderOut are also available. When you update build-your-own pricing, the phone keeps up.",
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
      "X1 Voice keeps vegan, Jain, and gluten-free substitutions straight across a multi-item order, and it fields buffet-hours questions so your floor staff don't have to.",
    painPoints: [
      {
        title: "Spice level and dietary swaps vary dish by dish",
        description:
          "Vegan, Jain (no onion or garlic), and gluten-free requests apply differently to each dish. One rushed phone order can pin the wrong substitution on the wrong item.",
      },
      {
        title: "Thali and combination orders need confirming, item by item",
        description:
          "A multi-course combination plate means checking what's included and what's optional: bread, rice, sides. That back-and-forth turns into real hold time during the dinner rush.",
      },
      {
        title: "Buffet-hours calls pull staff off the floor",
        description:
          "\"Are you doing lunch buffet today?\" Callers ask constantly, along with per-person pricing, and someone working the floor has to stop and answer every single time.",
      },
    ],
    features: [
      {
        title: "Per-dish spice and dietary logic",
        description:
          "Vegan, Jain, and gluten-free substitutions stay attached to the dishes they belong to, even on a big multi-item order. The whole ticket never gets one blanket note.",
      },
      {
        title: "Thali and combo composition, built in",
        description:
          "It knows what comes with each combination plate and what counts as an add-on, so orders arrive complete the first time.",
      },
      {
        title: "Buffet hours and pricing, answered instantly",
        description:
          "Buffet timing and per-person pricing get answered around the clock. Your floor staff never even hear the question.",
      },
    ],
    faqs: [
      {
        question: "Can it handle Jain and other strict dietary requests?",
        answer:
          "Yes. Dietary rules like Jain (no onion or garlic), vegan, and gluten-free are configured per dish, so each substitution lands on the right item every time.",
      },
      {
        question: "Does it know our buffet hours and pricing?",
        answer:
          "Yes. It answers buffet-timing and per-person pricing questions from your current schedule, and nobody on your staff has to stop what they're doing.",
      },
      {
        question: "Can it handle catering for events?",
        answer:
          "It takes down the event date, headcount, and menu preferences, then routes the inquiry to your team for a final quote. Most catering is custom by event, so a person closes it out.",
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
    heroHeadline: "The counter line keeps moving. The phone gets answered anyway.",
    heroSubhead:
      "X1 Voice takes rush-hour phone orders and fields \"is it ready\" calls on its own, so your assembly line stays fully staffed.",
    painPoints: [
      {
        title: "Phone calls compete with the counter line for the same staff",
        description:
          "During a rush, answering the phone means stepping away from the assembly line. Usually nobody steps away, and that unanswered call was an order.",
      },
      {
        title: "\"Is my order ready\" calls spike right at peak",
        description:
          "Mobile and online pickups set off a wave of status-check calls at the exact moment your staff are busiest making food.",
      },
      {
        title: "Office and group orders need accuracy without slowing the line",
        description:
          "Multi-item, multi-modifier group orders called in ahead of lunch take real care to get right, and care is the first thing a rush strips away.",
      },
    ],
    features: [
      {
        title: "Order-status lookups, no staff needed",
        description:
          "Answers \"is my order ready\" by checking ticket status directly. A status check never pulls someone off the line.",
      },
      {
        title: "Full rush-hour coverage",
        description:
          "During peak, the phone stops being the crew's problem. It rings, it gets picked up, and build-line speed doesn't dip.",
      },
      {
        title: "Group orders captured accurately",
        description:
          "Multi-item office orders come through with every modifier intact and land in your POS as one ticket, ready for a pickup window.",
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
          "Yes. It looks up ticket status and answers \"is my order ready\" calls directly, with no interruption to your staff.",
      },
      {
        question: "Can it handle rush-hour call volume?",
        answer:
          "Calls don't queue. A packed lunch rush just means more lines open at once, and all of them get answered.",
      },
      {
        question: "What about large group or office orders?",
        answer:
          "It takes multi-item orders with modifiers over the phone and sends them to your POS as a single ticket.",
      },
      {
        question: "How does it integrate with our POS?",
        answer:
          "Square and Clover work today, and OrderCounter and OrderOut are also available. The full setup rundown is at /integrations.",
      },
    ],
    metaDescription:
      "AI phone answering for fast-casual restaurants that takes rush-hour orders and answers \"is it ready\" calls without pulling staff off the line.",
  },
  {
    slug: "fine-dining",
    restaurantType: "Fine Dining",
    heroHeadline: "Reservation calls handled with the same care as your dining room.",
    heroSubhead:
      "X1 Voice books large parties, recognizes returning guests, and records special-occasion and dietary notes, in a tone that fits your restaurant rather than a drive-thru.",
    painPoints: [
      {
        title: "Large-party and private-dining calls need real back-and-forth",
        description:
          "Headcount, date, room preference, menu questions: a private-dining call is a real conversation. A host stand mid-service handles it inconsistently or asks the caller to try again later.",
      },
      {
        title: "Regulars and VIPs expect to be recognized, not re-introduced",
        description:
          "A guest who's booked a dozen times expects the host to remember their usual table or dietary note. That context lives in one person's memory, and a new host starts from zero.",
      },
      {
        title: "Special-occasion and dietary notes get lost before the table",
        description:
          "Anniversaries, severe allergies, and kosher or halal requests get taken verbally at the host stand, and they don't reliably reach the kitchen or the table setup.",
      },
    ],
    features: [
      {
        title: "Reservation handling with real capacity awareness",
        description:
          "Headcount, seating preference, and private-room requests get recorded against your real availability, even in the middle of a packed dinner service.",
      },
      {
        title: "Recognition for regulars and VIPs",
        description:
          "Returning guests get greeted like returning guests. Notes from prior visits, from preferred table to dietary restrictions to past occasions, surface for your host stand.",
      },
      {
        title: "Occasion and dietary notes that actually travel",
        description:
          "Anniversary, allergy, and dietary details go into the reservation itself, in structured form, and they ride with it all the way to service.",
      },
    ],
    statHighlight: {
      value: "One missed call",
      label:
        "can mean an eight-top on a Saturday night quietly booking somewhere else",
    },
    faqs: [
      {
        question: "Will it sound appropriate for a fine-dining brand?",
        answer:
          "The voice and script tone get tuned to your restaurant: formal, warm, understated, whatever matches the room. Nobody will mistake it for a fast-food ordering line.",
      },
      {
        question: "Can it handle large parties and private events?",
        answer:
          "It captures headcount, date, room preference, and initial menu questions for private and large-party bookings, then hands your team the details for final confirmation.",
      },
      {
        question: "Does it recognize returning guests?",
        answer:
          "It uses caller ID and your reservation history to recognize regulars and surface prior notes. What it's allowed to reference and say out loud is entirely up to you.",
      },
      {
        question: "What about a waitlist on a walk-in-heavy night?",
        answer:
          "It takes waitlist call-ins and quotes realistic waits based on your current pace. Your host stays on the floor.",
      },
    ],
    metaDescription:
      "AI phone answering for fine-dining restaurants that handles large-party reservations, recognizes regulars, and captures dietary notes with the right tone.",
  },
  {
    slug: "food-trucks",
    restaurantType: "Food Trucks",
    heroHeadline: "The truck moves every day. Callers get today's spot, not last week's.",
    heroSubhead:
      "X1 Voice stays synced to your daily location and hours, so \"where are you today\" gets the right answer while both your hands stay on the grill.",
    painPoints: [
      {
        title: "\"Where are you today?\" is the call, over and over",
        description:
          "Your location changes daily, sometimes hour to hour. Answering live means stopping the grill, and the question comes in all day long.",
      },
      {
        title: "A one- or two-person crew can't spare anyone for the phone",
        description:
          "Whoever's running the window is also cooking. During a lunch rush, a ringing phone either gets ignored or somebody steps off a hot line to grab it.",
      },
      {
        title: "Weather and last-minute changes don't reach callers fast enough",
        description:
          "A canceled stop or a moved location needs to reach callers immediately, or customers show up to an empty parking spot and don't come back.",
      },
    ],
    features: [
      {
        title: "Location and schedule-aware answers",
        description:
          "It reads from your posted schedule, so callers hear today's actual spot even when you changed plans this morning.",
      },
      {
        title: "Zero-crew phone coverage",
        description:
          "The phone gets covered without a single extra body on the truck. The person on the grill stays on the grill.",
      },
      {
        title: "Catering and private-event leads captured",
        description:
          "Event date, headcount, and location get written down for booking inquiries so they don't get lost somewhere between lunch and dinner service.",
      },
    ],
    statHighlight: {
      value: "Daily",
      label:
        "How often a food truck's location and hours can change. Callers always need today's answer.",
    },
    faqs: [
      {
        question: "How do we update our location day to day?",
        answer:
          "Update your schedule the same way you do now. X1 Voice reflects the change on the very next call, and there's no second system to maintain.",
      },
      {
        question: "Can it take pre-orders for a specific stop?",
        answer:
          "Yes. It can take orders tied to your next scheduled stop and pickup window, so customers know exactly when and where to show up.",
      },
      {
        question: "What happens on a rain-out or canceled stop?",
        answer:
          "It answers with your current status, so callers hear \"closed today\" or the updated location before they head your way.",
      },
      {
        question: "Does it handle catering or private-event bookings?",
        answer:
          "It writes down the event date, headcount, and location, then routes everything to you. Most food-truck catering needs a human quote, so it hands off the lead instead of booking blind.",
      },
    ],
    metaDescription:
      "AI phone answering for food trucks that stays synced to your daily location and hours, so \"where are you today\" always gets the right answer.",
  },
  {
    slug: "ghost-kitchens",
    restaurantType: "Ghost Kitchens",
    heroHeadline: "Everyone you employ is in the kitchen, and the phone still gets picked up.",
    heroSubhead:
      "X1 Voice covers phone orders for kitchen-only operations and sends each call to the right virtual brand, even when three brands share one kitchen and one number.",
    painPoints: [
      {
        title: "There's no one whose job is the phone",
        description:
          "The whole team is kitchen crew, buried in tickets. When the phone rings, there isn't a single person whose station is anywhere near it.",
      },
      {
        title: "Multiple virtual brands share one kitchen and one number",
        description:
          "One line might need to answer as three different brands with three different menus. A generic \"kitchen\" greeting confuses callers who ordered from a specific one.",
      },
      {
        title: "No dining room to fall back on when something goes wrong",
        description:
          "With no walk-in traffic, an unanswered call is a lost order or an unresolved delivery-platform issue, and there's no floor staff to smooth things over in person.",
      },
    ],
    features: [
      {
        title: "Fully unstaffed call coverage",
        description:
          "Built for kitchens where nobody stands at a counter. Front-of-house headcount required: zero.",
      },
      {
        title: "Multi-brand routing and greeting",
        description:
          "Each incoming number gets answered as the correct virtual brand, with that brand's name, menu, and voice, even when several brands run out of one kitchen.",
      },
      {
        title: "Delivery-platform-aware call handling",
        description:
          "It can tell when a call is really about a DoorDash or Uber Eats order and routes it accordingly, so nobody ends up with a duplicate phone order.",
      },
    ],
    statHighlight: {
      value: "0 FOH staff",
      label:
        "Typical front-of-house headcount at a ghost kitchen, which has never once stopped a phone from ringing",
    },
    faqs: [
      {
        question: "Can it handle more than one brand on the same phone number?",
        answer:
          "If your brands share a number, it asks which brand the caller wants and routes from there. Separate numbers per brand work even more cleanly.",
      },
      {
        question: "What happens with calls that are actually about a delivery-platform order?",
        answer:
          "It recognizes platform questions, the \"where's my order\" and wrong-item calls, and sends them to the right place instead of starting a brand-new phone order.",
      },
      {
        question: "Do we need any front-of-house staff at all?",
        answer:
          "No, and that's the point. It covers the phones entirely for kitchen-only operations that have never staffed a counter and don't plan to.",
      },
      {
        question: "How does it work with our delivery-platform integrations?",
        answer:
          "Direct phone orders and platform questions run side by side. Menu and pricing sync from your POS, so a phone order matches what's listed on each platform.",
      },
    ],
    metaDescription:
      "AI phone answering built for kitchen-only operations. It covers the phones with zero front-of-house staff and routes multiple virtual brands correctly.",
  },
  {
    slug: "multi-location",
    restaurantType: "Multi-Location",
    heroHeadline: "The phone sounds the same at every store you run.",
    heroSubhead:
      "X1 Voice gives each location the same script and the same menu accuracy, plus one dashboard for call volume, missed calls, and order value across the whole group.",
    painPoints: [
      {
        title: "Call quality depends on who's on shift, store to store",
        description:
          "You can't guarantee how any given location answers the phone. It comes down to whoever happens to pick up that day.",
      },
      {
        title: "No shared view of call performance across locations",
        description:
          "Owners and regional managers can't see call volume, missed-call rate, or order value across the group. Each store stays a black box until someone calls the manager and asks.",
      },
      {
        title: "Menu and pricing updates roll out unevenly",
        description:
          "A new item or price change gets re-taught at each location, one crew at a time. Some stores nail it that week. Some don't.",
      },
    ],
    features: [
      {
        title: "One dashboard across every location",
        description:
          "Call volume, missed-call rate, and order value for the whole group, all in one place. You stop asking each store how the phones went.",
      },
      {
        title: "One consistent script and voice, everywhere",
        description:
          "Whoever calls store #12 hears what they'd hear at store #1: the same brand voice working from the same accurate menu.",
      },
      {
        title: "Push updates to every location at once",
        description:
          "A menu or pricing change reaches every location's agent at the same moment. Nobody re-trains staff site by site.",
      },
    ],
    statHighlight: {
      value: "Store by store",
      label:
        "How most multi-location groups track call performance today: one spreadsheet per site and no shared view",
    },
    faqs: [
      {
        question: "Can each location keep some local customization?",
        answer:
          "Yes. Hours, specials, and location-specific menu items can differ per store, while pricing rules, script tone, and brand voice stay consistent across the group.",
      },
      {
        question: "How granular is the reporting?",
        answer:
          "Roll it up across the whole group or drill down to a single location. Call volume, missed calls, and order value show up at either level.",
      },
      {
        question: "How do we add a new location?",
        answer:
          "New locations get set up from your existing menu and configuration template, so onboarding a store doesn't mean starting over from scratch.",
      },
      {
        question: "Does this work for franchised locations, not just corporate-owned?",
        answer:
          "Yes. Franchise groups can standardize call handling across locations, and each individual owner still sees their own store's numbers.",
      },
    ],
    metaDescription:
      "AI phone answering for multi-location restaurant groups: one consistent voice on the phones and one dashboard for performance across every store.",
  },
  {
    slug: "delis-cafes",
    restaurantType: "Delis & Cafes",
    heroHeadline: "The whole sandwich build, captured right, even at the peak of lunch.",
    heroSubhead:
      "X1 Voice gets each bread, meat, cheese, and topping choice down exactly as ordered, and it takes office catering calls without slowing your counter line.",
    painPoints: [
      {
        title: "Sandwich customization has more branches than most order types",
        description:
          "Bread, protein, cheese, toppings, condiments, size. Each one is a fork in the road, and a phone order rushed through at lunch is where combinations get crossed.",
      },
      {
        title: "The lunch window is short and the phone rings when hands are full",
        description:
          "Call volume spikes right when the person who'd normally answer is elbow-deep in sandwich assembly on the line.",
      },
      {
        title: "Office platter orders get rushed like a single sandwich",
        description:
          "Headcount, delivery time, and lead time all need real attention. A call picked up mid-rush tends to get the same hurried treatment as a two-item order.",
      },
    ],
    features: [
      {
        title: "Full sandwich-build capture",
        description:
          "Bread, protein, cheese, each topping and condiment, recorded to match how your board is set up. What the caller asked for is what the ticket says.",
      },
      {
        title: "Built for the noon call spike",
        description:
          "The noon spike hits and nobody on the line looks up from the cutting board. All of it gets handled.",
      },
      {
        title: "Separate handling for catering and platter orders",
        description:
          "Headcount, delivery time, and required lead time get their own intake, separate from single-sandwich orders. A 20-person platter isn't treated like lunch for one.",
      },
    ],
    statHighlight: {
      value: "12-1pm",
      label:
        "The hour when lunch call-ins spike hardest, which is exactly when counter staff are busiest building sandwiches",
    },
    faqs: [
      {
        question: "Can it handle a fully custom sandwich order?",
        answer:
          "Yes. Each choice on your board, bread through condiments, gets captured on its own, and the ticket reads the way your kitchen builds.",
      },
      {
        question: "Does it know our breakfast-to-lunch menu switch?",
        answer:
          "It does. Menu and pricing follow the time of day, with the same cutoff rules your staff use.",
      },
      {
        question: "Can it take office catering and platter orders?",
        answer:
          "It captures headcount, delivery window, and lead-time requirements for platter and catering orders, then flags them separately from regular phone orders.",
      },
      {
        question: "Does it record allergy or topping-exclusion notes?",
        answer:
          "Yes. \"No onions,\" \"nut-free,\" and notes like them get pinned to the exact line item they apply to.",
      },
    ],
    metaDescription:
      "AI phone answering for delis and cafes that captures full sandwich builds and handles office catering orders without slowing down the lunch rush.",
  },
  {
    slug: "bakeries-coffee-shops",
    restaurantType: "Bakeries & Coffee Shops",
    heroHeadline: "Custom cake orders deserve better than a scribbled note.",
    heroSubhead:
      "X1 Voice captures flavor, size, design notes, and pickup date on each custom-order call, and soaks up the holiday order surge without you adding staff.",
    painPoints: [
      {
        title: "Custom cake details have to survive weeks, not minutes",
        description:
          "Flavor, size, design notes, and pickup date get set weeks before anyone bakes. Drop one detail on that first call and the wrong cake can show up on someone's wedding day.",
      },
      {
        title: "Holiday weeks bring an order surge with zero slack",
        description:
          "Thanksgiving pie orders and Christmas cookie trays flood in on top of a full counter line. The same small crew handles all of it without any extra hands.",
      },
      {
        title: "Stock-check calls send someone away from the register",
        description:
          "Callers want to know if there are croissants left, or a specific muffin flavor. Someone steps away from the counter to go look, then does it again for the next caller.",
      },
    ],
    features: [
      {
        title: "Structured custom-order intake",
        description:
          "Flavor, size, design notes, and a firm pickup date and time get collected on a fixed checklist. The details stop depending on who happened to grab the phone.",
      },
      {
        title: "Holiday order season, covered",
        description:
          "The seasonal flood of special-order calls gets fielded while your crew bakes. You don't add phone-answering headcount in your busiest weeks.",
      },
      {
        title: "Real-time, stock-aware answers",
        description:
          "\"Do you have X today?\" gets answered from what's actually in the case. Nobody leaves the register to go count croissants.",
      },
    ],
    statHighlight: {
      value: "Weeks ahead",
      label:
        "How far out custom cake orders usually get placed, and how long each detail has to survive between that first call and pickup day",
    },
    faqs: [
      {
        question: "Can it take a full custom cake order, including design details?",
        answer:
          "It takes flavor, size, tier count, and written design notes, then confirms a firm pickup date and time. A complicated design request gets flagged so your decorator can call back.",
      },
      {
        question: "Can it collect a deposit over the phone?",
        answer:
          "Deposit and payment collection can be turned on if you take them for custom orders. Where you require a card in person, it explains your policy to the caller.",
      },
      {
        question: "How does it handle holiday order deadlines?",
        answer:
          "Your seasonal cutoff dates apply automatically. Once a holiday window closes, it tells callers so, rather than taking an order you can't fulfill.",
      },
      {
        question: "Does it know about allergies, like a nut-free facility?",
        answer:
          "Yes. The allergy and facility notes you provide get worked into every relevant answer, so customers hear accurate information on the first call.",
      },
    ],
    metaDescription:
      "AI phone answering for bakeries and coffee shops that captures custom cake details accurately and absorbs holiday order surges without extra staff.",
  },
]
