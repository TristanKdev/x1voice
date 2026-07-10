/**
 * POS systems X1 Voice can send orders to.
 *
 * Two sources of truth, kept distinct on purpose:
 *  - Direct integrations (Square, Clover, OrderCounter, OrderOut) have
 *    dedicated pages under /integrations — see data/integrations.ts.
 *  - The wider list is reachable via our Deliverect connection.
 *
 * Presentation rule (do not violate): these are systems we INTEGRATE WITH,
 * never "customers" or "companies that use X1 Voice". Headings that render
 * this list must say works-with/integrates. Wordmarks are rendered as
 * styled text — no fabricated or hotlinked logo assets.
 */

export type PosSystem = {
  name: string
  /** Slug of a dedicated /integrations/[slug] page, when one exists. */
  slug?: string
  /** Featured in the highlight grid on the homepage. */
  highlighted?: boolean
}

export const POS_VIA = "Deliverect"

export const POS_SYSTEMS: PosSystem[] = [
  // ── Highlighted (recognizable brands; some have dedicated pages) ──
  { name: "Square", slug: "square", highlighted: true },
  { name: "Toast", highlighted: true },
  { name: "Clover", slug: "clover", highlighted: true },
  { name: "Lightspeed", highlighted: true },
  { name: "TouchBistro", highlighted: true },
  { name: "SpotOn", highlighted: true },
  { name: "Aloha Cloud", highlighted: true },
  { name: "Micros Simphony", highlighted: true },
  { name: "Revel Systems", highlighted: true },
  { name: "Epos Now", highlighted: true },
  { name: "PAR Brink", highlighted: true },
  { name: "Zonal", highlighted: true },
  { name: "Snackpass", highlighted: true },
  { name: "Givex", highlighted: true },

  // ── Direct integrations without a marquee brand card ──
  { name: "OrderCounter", slug: "ordercounter" },
  { name: "OrderOut", slug: "orderout" },

  // ── Reachable via Deliverect ──
  { name: "Flooid" },
  { name: "PAR Pixel Point" },
  { name: "4Soft" },
  { name: "RockSpoon" },
  { name: "Caviar POS" },
  { name: "Shiji Group" },
  { name: "Genius" },
  { name: "SuperSonic POS" },
  { name: "LS Central" },
  { name: "Micros RES 3700" },
  { name: "Blink" },
  { name: "ArmPOS" },
  { name: "DizLog" },
  { name: "Visual Touch" },
  { name: "Restroworks" },
  { name: "TASK" },
  { name: "iMenu360" },
  { name: "Limerr" },
  { name: "Thrive POS" },
  { name: "ABCPOS" },
  { name: "Profitek" },
  { name: "ChowBus POS" },
  { name: "NCC" },
  { name: "Grubbrr" },
  { name: "Nōwn" },
  { name: "SwypePOS" },
  { name: "QuickPOS" },
  { name: "SmilePOS" },
  { name: "Weebo" },
  { name: "Silverware POS" },
  { name: "TWEE" },
  { name: "Supermenu POS" },
  { name: "Easy POS" },
  { name: "Auphan" },
  { name: "Ranger" },
  { name: "Hippos" },
  { name: "MobiPOS" },
  { name: "Pro Dukaan" },
  { name: "Minitable Tech" },
  { name: "OVVI" },
  { name: "Plento" },
  { name: "Starrtec Solutions" },
  { name: "MenuSifu" },
  { name: "Smart Volution" },
  { name: "Aptsys" },
  { name: "Front" },
  { name: "Xenial Cloud" },
  { name: "Andromeda" },
  { name: "Curbngo" },
  { name: "Honor POS" },
  { name: "Linga POS" },
  { name: "NCR BSP" },
  { name: "ChanceTop" },
  { name: "Comtech" },
  { name: "DebittechPOS" },
  { name: "FocusPOS" },
  { name: "KwickPOS" },
  { name: "Tiger Touch POS" },
  { name: "AdolunaPOS" },
  { name: "Apptology" },
  { name: "Cashdrop" },
  { name: "ChaChaPOS" },
  { name: "Dripos" },
  { name: "EdgeServ POS" },
  { name: "HantePay" },
  { name: "NextGenKitchens" },
  { name: "Smarttab" },
  { name: "TastyFuture" },
  { name: "Ordering360" },
  { name: "LineSkip" },
  { name: "Oolio" },
]

export const HIGHLIGHTED_POS = POS_SYSTEMS.filter((p) => p.highlighted)

/**
 * Systems reachable via Deliverect only — everything without a dedicated
 * direct-integration page. Surfaces that credit Deliverect (the marquee
 * caption, the FAQ) must draw from this list, not from "everything else",
 * so direct integrations are never misattributed to Deliverect.
 */
export const DELIVERECT_POS = POS_SYSTEMS.filter(
  (p) => !p.slug && !p.highlighted
)

/** Count of systems connected through Deliverect (non-direct). */
export const POS_VIA_DELIVERECT_COUNT = POS_SYSTEMS.filter(
  (p) => p.slug === undefined
).length

export const POS_TOTAL = POS_SYSTEMS.length

export const POS_COUNT_LABEL = `${POS_TOTAL} POS systems`
