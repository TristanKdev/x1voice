import type { Faq } from "./solutions"

export type IntegrationPage = {
  slug: string
  partnerName: string
  partnerUrl: string
  heroHeadline: string
  summary: string
  /** Concrete, verifiable capabilities — what data actually flows and which direction. */
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
    heroHeadline: "Phone orders land in your Square POS automatically.",
    summary:
      "X1 Voice connects to your Square account and pulls your live menu — items, modifiers, and prices — so every phone order it takes is priced the way your register already prices it, and every completed order shows up as a normal ticket in Square.",
    capabilities: [
      {
        title: "Menu pulled directly from Square",
        description:
          "Item names, prices, modifiers, and 86'd items sync from your Square catalog, so the AI is always quoting what you're actually selling.",
      },
      {
        title: "Orders sync in real time",
        description:
          "A completed phone call becomes a ticket in Square within moments, routed the same way an in-person or online order would be.",
      },
      {
        title: "No manual re-entry",
        description:
          "Nobody has to write down a phone order and key it into the register — it arrives in Square already itemized and priced.",
      },
      {
        title: "Payment collected on the call, reconciled in Square",
        description:
          "When a caller pays by phone, that payment is reflected in your Square reporting alongside your other tender types.",
      },
    ],
    setupSteps: [
      "Connect your Square account from the X1 Voice dashboard.",
      "Confirm your menu items, modifiers, and pricing pulled in correctly.",
      "Set hours, 86'd items, and any phone-only rules (e.g. minimum order for delivery).",
      "Test with a live call to confirm the order lands correctly in Square.",
      "Go live — new phone orders now flow into Square automatically.",
    ],
    faqs: [
      {
        question: "Do I need a specific Square plan for this to work?",
        answer:
          "X1 Voice connects through Square's standard restaurant/POS catalog and order APIs. If you're unsure whether your current Square plan supports the integration, our onboarding team can confirm before you sign up.",
      },
      {
        question: "What happens if I update my menu in Square?",
        answer:
          "Menu and pricing changes made in Square sync back to X1 Voice, so you don't have to update your menu in two places.",
      },
      {
        question: "Does this work with Square for Restaurants specifically?",
        answer:
          "Yes — the integration is built around Square's restaurant-focused catalog and order tools, including modifiers and item-level customization.",
      },
    ],
    metaDescription:
      "How X1 Voice integrates with Square: real-time menu sync, automatic order injection, and phone payment reconciliation — setup steps included.",
  },
  {
    slug: "clover",
    partnerName: "Clover",
    partnerUrl: "https://www.clover.com/",
    heroHeadline: "Every phone order shows up in Clover, no re-typing required.",
    summary:
      "X1 Voice reads your live Clover menu and inventory so it prices phone orders correctly, then sends each completed order into Clover as a normal ticket — the same flow your kitchen already uses for in-person and online orders.",
    capabilities: [
      {
        title: "Menu pulled directly from your Clover catalog",
        description:
          "Items, modifiers, and current pricing come straight from Clover, so phone orders match what's actually on the menu today.",
      },
      {
        title: "Orders sync in real time",
        description:
          "Completed calls appear as tickets in Clover within moments — no separate order queue for staff to check.",
      },
      {
        title: "No manual re-entry",
        description:
          "Phone orders don't need to be handwritten or keyed in afterward; they arrive itemized and priced in Clover directly.",
      },
      {
        title: "86'd items respected automatically",
        description:
          "If an item is marked unavailable in Clover, the AI won't offer or sell it on a call until it's turned back on.",
      },
    ],
    setupSteps: [
      "Connect your Clover account from the X1 Voice dashboard.",
      "Confirm menu items, modifiers, and pricing pulled in correctly.",
      "Set hours, 86'd items, and any phone-order-specific rules.",
      "Test with a live call to confirm the order lands correctly in Clover.",
      "Go live — new phone orders now flow into Clover automatically.",
    ],
    faqs: [
      {
        question: "Which Clover devices does this work with?",
        answer:
          "The integration works at the account/catalog level, so orders show up regardless of which Clover hardware (Station, Mini, Flex) your team uses to view and fulfill tickets.",
      },
      {
        question: "Can I keep using Clover's own online ordering alongside X1 Voice?",
        answer:
          "Yes — phone orders from X1 Voice and orders from other channels both land in Clover as regular tickets, so your kitchen workflow doesn't change.",
      },
      {
        question: "What if my Clover menu changes frequently?",
        answer:
          "Menu and price updates in Clover sync back to X1 Voice, so you only maintain your menu in one place.",
      },
    ],
    metaDescription:
      "How X1 Voice integrates with Clover POS: live menu sync, automatic order injection, and 86'd-item handling — with a step-by-step setup guide.",
  },
  {
    slug: "ordercounter",
    partnerName: "OrderCounter",
    partnerUrl: "https://www.ordercounter.com/",
    heroHeadline: "X1 Voice orders flow straight into your OrderCounter POS.",
    summary:
      "For restaurants running OrderCounter's hybrid POS, X1 Voice syncs your menu and sends completed phone orders in as regular tickets, fitting into the same order-management flow OrderCounter already uses for in-person, delivery, and online orders.",
    capabilities: [
      {
        title: "Menu pulled directly from your POS catalog",
        description:
          "Items, modifiers, and pricing sync from OrderCounter, so phone orders are quoted using your actual, current menu.",
      },
      {
        title: "Orders sync in real time",
        description:
          "Completed phone calls are sent into OrderCounter as tickets, alongside your delivery and online order channels.",
      },
      {
        title: "No manual re-entry",
        description:
          "Staff don't have to hand-key phone orders into the POS afterward — the ticket is already itemized and priced.",
      },
    ],
    setupSteps: [
      "Contact X1 Voice onboarding to confirm your OrderCounter setup and connection details.",
      "Connect your OrderCounter account and pull in your menu, modifiers, and pricing.",
      "Confirm hours, 86'd items, and any phone-order-specific rules.",
      "Test with a live call to confirm the order lands correctly in OrderCounter.",
      "Go live — new phone orders now flow into OrderCounter automatically.",
    ],
    faqs: [
      {
        question: "Does this work with OrderCounter's hybrid (server + cloud) setup?",
        answer:
          "Yes — the integration is built to work with OrderCounter's standard order and catalog data, whether your location runs primarily on the local server or the cloud-connected side of the platform.",
      },
      {
        question: "Do I need to change how my kitchen receives tickets?",
        answer:
          "No — orders from X1 Voice arrive in OrderCounter the same way any other order channel does, so your kitchen display and ticket workflow stay the same.",
      },
      {
        question: "What if OrderCounter isn't fully set up yet at my location?",
        answer:
          "Talk to our onboarding team first — since OrderCounter setups vary by location, we'll confirm your specific configuration supports the integration before you go live.",
      },
    ],
    metaDescription:
      "How X1 Voice integrates with OrderCounter POS: live menu sync, automatic order injection into your existing ticket flow, and setup steps to go live.",
  },
  {
    slug: "orderout",
    partnerName: "OrderOut",
    partnerUrl: "https://www.orderout.co/",
    heroHeadline: "Phone orders join the same queue as your delivery-app orders.",
    summary:
      "OrderOut routes orders from delivery marketplaces like Uber Eats, DoorDash, and Grubhub into your POS so they don't have to be re-typed by staff. For restaurants already using OrderOut with Square or Clover, X1 Voice's phone orders can flow into that same consolidated queue instead of arriving through a separate channel.",
    capabilities: [
      {
        title: "One order queue, not two",
        description:
          "Phone orders taken by X1 Voice land alongside your delivery-marketplace orders that OrderOut already routes into your POS, instead of showing up in a separate system.",
      },
      {
        title: "No manual re-entry",
        description:
          "Staff don't need to retype a phone order or a delivery-app order — both arrive as normal POS tickets.",
      },
      {
        title: "Works with your existing Square or Clover setup",
        description:
          "Since OrderOut already integrates natively with Square and Clover, this fits on top of a POS you're likely already running.",
      },
    ],
    setupSteps: [
      "Confirm you have OrderOut connected to your Square or Clover POS.",
      "Connect your X1 Voice account so completed phone orders route through the same order pipeline.",
      "Confirm menu items and modifiers match across your POS, OrderOut, and X1 Voice.",
      "Test with a live call to confirm the order lands in your POS the same way a delivery-app order does.",
    ],
    faqs: [
      {
        question: "Do I need OrderOut to use X1 Voice?",
        answer:
          "No — X1 Voice connects directly to Square, Clover, and OrderCounter on its own. This integration is specifically for restaurants who already use OrderOut to consolidate delivery-marketplace orders and want phone orders in that same queue.",
      },
      {
        question: "Which POS systems does this work with?",
        answer:
          "OrderOut's native POS support currently covers Square and Clover, so this combined setup is built around restaurants running one of those two.",
      },
      {
        question: "Does this change how DoorDash, Uber Eats, or Grubhub orders are handled?",
        answer:
          "No — OrderOut continues to route those marketplace orders the way it already does. This integration just adds X1 Voice's phone orders into that same consolidated flow.",
      },
    ],
    metaDescription:
      "How X1 Voice works alongside OrderOut: phone orders join the same consolidated queue as your delivery-marketplace orders on Square or Clover.",
  },
]
