import { NextResponse } from "next/server"
import { z } from "zod"

const featureRequestSchema = z.object({
  name: z.string().min(2),
  restaurant: z.string().optional(),
  email: z.email(),
  request: z.string().min(10),
})

/**
 * Validates a feature-request payload server-side (mirrors the client zod
 * schema in components/blocks/feature-request-form.tsx) and acknowledges
 * receipt.
 *
 * TODO(x1voice): this only validates and returns { ok: true }. Wire real
 * delivery before launch — e.g. create a GHL contact + note/opportunity via
 * the ONYXX GHL integration, or POST to a product-board (Canny/Productboard).
 * Add spam protection (honeypot / turnstile) at that point too.
 */
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

  const parsed = featureRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid form data.", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  // TODO(x1voice): forward parsed.data to GHL / product board here.
  return NextResponse.json({ ok: true })
}
