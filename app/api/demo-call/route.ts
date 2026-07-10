import { NextResponse } from "next/server"
import { z } from "zod"

/**
 * Webhook stub for inbound demo-line calls.
 *
 * The public demo number (data/site.ts → DEMO_LINE) is answered by the voice
 * agent. Calling it is the consent event: the caller agrees to be recorded
 * and contacted for marketing (disclosed on components/blocks/demo-call.tsx).
 *
 * WIRE (dev): point your telephony provider's inbound-call / status webhook
 * (Twilio, Telnyx, Vapi, etc.) at POST /api/demo-call. This validates a
 * minimal shape and returns { ok: true }. It does NOT yet persist anything.
 *
 * TODO(x1voice): record EVERY calling number + timestamp + consent, then push
 * the lead into GHL (dnc-checked) for follow-up. Do not store beyond what the
 * privacy policy discloses; honor DNC/opt-out.
 */
const demoCallSchema = z.object({
  from: z.string().min(1), // caller's number, provider-formatted
  to: z.string().optional(),
  callId: z.string().optional(),
  status: z.string().optional(),
  startedAt: z.string().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    )
  }

  const parsed = demoCallSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid webhook payload.", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  // TODO(x1voice): log parsed.data.from with consent + push to GHL here.
  return NextResponse.json({ ok: true })
}
