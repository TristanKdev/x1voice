import { NextResponse } from "next/server"
import { z } from "zod"

const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  restaurantName: z.string().min(2),
  message: z.string().min(10),
})

/**
 * Validates the contact form payload server-side (mirrors the client-side
 * zod schema in components/blocks/contact-form.tsx) and acknowledges
 * receipt.
 *
 * TODO(x1voice): this does NOT send an email yet. Wire up real delivery
 * (e.g. via Resend) with an API key configured before launch — right now
 * this only validates the payload and returns { ok: true }.
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

  const parsed = contactPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid form data.", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  return NextResponse.json({ ok: true })
}
