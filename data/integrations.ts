import type { Faq } from "./solutions"

export type IntegrationPage = {
  slug: string
  partnerName: string
  partnerUrl: string
  /** How the order actually reaches this POS. */
  connection: "native" | "deliverect"
  heroHeadline: string
  summary: string
  /** Concrete, verifiable capabilities, what data actually flows and which direction. */
  capabilities: { title: string; description: string }[]
  setupSteps: string[]
  faqs: Faq[]
  metaDescription: string
}

export const integrations: IntegrationPage[] = [
  {
    slug: "square",
    partnerName: "Square",
    partnerUrl: "https://squareup.com/",
    connection: "native",
    heroHeadline: "Phone orders land in your Square POS automatically.",
    summary:
      "X1 Voice connects to your Square account and reads your live menu, including items, modifiers, and prices. Every phone order it takes is priced the way your register already prices it, and every finished call shows up in Square as a normal ticket.",
    capabilities: [
      {
        title: "Reads your Square catalog",
        description:
          "Item names, prices, modifiers, and 86'd items all come from Square, so the AI only quotes what you're actually selling today.",
      },
      {
        title: "Calls become Square tickets",
        description:
          "When a caller finishes ordering, the ticket appears in Square within moments and routes the same way an in-person or online order would.",
      },
      {
        title: "Nothing to key in afterward",
        description:
          "Nobody writes down a phone order and punches it into the register. It lands in Square already itemized and priced.",
      },
      {
        title: "Payment collected on the call, reconciled in Square",
        description:
          "When a caller pays by phone, that payment shows up in your Square reporting next to your other tender types.",
      },
    ],
    setupSteps: [
      "Connect your Square account from the X1 Voice dashboard.",
      "Confirm your menu items, modifiers, and pricing pulled in correctly.",
      "Set hours, 86'd items, and any phone-only rules (e.g. minimum order for delivery).",
      "Test with a live call to confirm the order lands correctly in Square.",
      "Go live. New phone orders start flowing into Square on their own.",
    ],
    faqs: [
      {
        question: "Do I need a specific Square plan for this to work?",
        answer:
          "X1 Voice connects through Square's standard restaurant/POS catalog and order APIs. If you're not sure whether your current Square plan supports the integration, our onboarding team can check before you sign up.",
      },
      {
        question: "What happens if I update my menu in Square?",
        answer:
          "Changes you make in Square carry over to X1 Voice, so you're not maintaining the menu in two places.",
      },
      {
        question: "Does this work with Square for Restaurants specifically?",
        answer:
          "Yes. It's built on Square's restaurant-focused catalog and order tools, modifiers and item-level customization included.",
      },
    ],
    metaDescription:
      "How X1 Voice connects to Square: live menu sync, phone orders that land as normal tickets, and call payments reconciled in your reporting.",
  },
  {
    slug: "clover",
    partnerName: "Clover",
    partnerUrl: "https://www.clover.com/",
    connection: "deliverect",
    heroHeadline: "Every phone order shows up in Clover, no re-typing required.",
    summary:
      "X1 Voice reads your live Clover menu and inventory, prices phone orders against it, and drops each completed order into Clover as a normal ticket. Your kitchen handles it the same way it handles an in-person or online order.",
    capabilities: [
      {
        title: "Your Clover menu is the source of truth",
        description:
          "Items, modifiers, and current pricing come straight out of Clover, so a phone order never quotes yesterday's menu.",
      },
      {
        title: "Tickets, not a side queue",
        description:
          "A finished call turns into a Clover ticket within moments. There's no separate order screen for staff to remember to check.",
      },
      {
        title: "Zero re-typing",
        description:
          "Phone orders arrive in Clover itemized and priced. Nobody transcribes them from a notepad after the call.",
      },
      {
        title: "86'd items respected automatically",
        description:
          "Mark an item unavailable in Clover and the AI stops offering it on calls until you turn it back on.",
      },
    ],
    setupSteps: [
      "Connect your Clover account from the X1 Voice dashboard.",
      "Confirm menu items, modifiers, and pricing pulled in correctly.",
      "Set hours, 86'd items, and any phone-order-specific rules.",
      "Test with a live call to confirm the order lands correctly in Clover.",
      "Go live. From there, phone orders flow into Clover without any extra steps.",
    ],
    faqs: [
      {
        question: "Which Clover devices does this work with?",
        answer:
          "It connects at the account and catalog level, so tickets show up whether your team views and fulfills them on a Station, Mini, or Flex.",
      },
      {
        question: "Can I keep using Clover's own online ordering alongside X1 Voice?",
        answer:
          "Yes. Both land in Clover as regular tickets, so you can keep Clover's online ordering running and your kitchen workflow stays put.",
      },
      {
        question: "What if my Clover menu changes frequently?",
        answer:
          "That's fine. Menu and price updates made in Clover carry over to X1 Voice, so the menu only lives in one place.",
      },
    ],
    metaDescription:
      "How X1 Voice connects to Clover POS: live menu and price sync, phone orders arriving as regular tickets, 86'd items respected, and setup steps.",
  },
  {
    slug: "ordercounter",
    partnerName: "OrderCounter",
    partnerUrl: "https://www.ordercounter.com/",
    connection: "native",
    heroHeadline: "X1 Voice orders flow straight into your OrderCounter POS.",
    summary:
      "For restaurants on OrderCounter's hybrid POS, X1 Voice pulls the menu from your catalog and sends each completed phone call back in as a regular ticket. Phone orders ride the same order-management flow OrderCounter already runs for your in-person, delivery, and online business.",
    capabilities: [
      {
        title: "Menu comes from OrderCounter",
        description:
          "X1 Voice quotes items, modifiers, and prices from your OrderCounter catalog, so callers hear the menu you're actually running.",
      },
      {
        title: "Calls end as POS tickets",
        description:
          "A completed phone call goes into OrderCounter next to your delivery and online orders. Same screen, same flow.",
      },
      {
        title: "Nobody re-keys anything",
        description:
          "The ticket arrives already itemized and priced. Staff never have to copy a phone order into the POS by hand.",
      },
    ],
    setupSteps: [
      "Contact X1 Voice onboarding to confirm your OrderCounter setup and connection details.",
      "Connect your OrderCounter account and pull in your menu, modifiers, and pricing.",
      "Confirm hours, 86'd items, and any phone-order-specific rules.",
      "Test with a live call to confirm the order lands correctly in OrderCounter.",
      "Go live. Phone orders start showing up in OrderCounter automatically.",
    ],
    faqs: [
      {
        question: "Does this work with OrderCounter's hybrid (server + cloud) setup?",
        answer:
          "Yes. It works off OrderCounter's standard order and catalog data, whether your location leans on the local server or the cloud-connected side of the platform.",
      },
      {
        question: "Do I need to change how my kitchen receives tickets?",
        answer:
          "No. X1 Voice orders come in like any other channel, so your kitchen display and ticket routine don't change.",
      },
      {
        question: "What if OrderCounter isn't fully set up yet at my location?",
        answer:
          "Start with our onboarding team. OrderCounter setups vary by location, and we'll check that your specific configuration supports the integration before anything goes live.",
      },
    ],
    metaDescription:
      "How X1 Voice connects to OrderCounter POS: menu sync, phone orders dropped into your existing ticket flow, and the setup steps to get live.",
  },
]
