"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, CheckCircle2Icon, LockIcon } from "lucide-react"

/**
 * Customer sign-in card. There is no self-serve auth backend yet, so this does
 * not pretend to authenticate — on submit it shows an honest note that
 * dashboards are activated during onboarding and routes people to the right
 * place. Removes the /login 404 and completes the header flow.
 */
export function LoginCard() {
  const [submitted, setSubmitted] = React.useState(false)
  const [email, setEmail] = React.useState("")

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border bg-card p-8 shadow-[0_20px_60px_-30px_color-mix(in_srgb,var(--color-brand)_45%,transparent)]">
        <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <LockIcon className="size-5" strokeWidth={1.75} />
        </div>
        <h1 className="font-display mt-5 text-2xl font-semibold tracking-tight">
          Sign in to X1 Voice
        </h1>

        {submitted ? (
          <div className="mt-4">
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>
                Dashboards are activated during onboarding. If you&rsquo;re already
                live and can&rsquo;t get in, the team will restore access, usually
                the same day.
              </span>
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/support"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
              >
                Contact support
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-secondary/60 px-6 text-sm font-semibold transition hover:bg-secondary"
              >
                Not a customer yet? Get started
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard opens once your account is set up during onboarding.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Field
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                placeholder="you@restaurant.com"
              />
              <Field
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-brand-foreground transition hover:bg-brand-bright"
              >
                Sign in
                <ArrowRightIcon className="size-4" />
              </button>
            </form>
            <div className="mt-5 flex items-center justify-between text-sm">
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Forgot password?
              </Link>
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Get started
              </Link>
            </div>
          </>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Trouble signing in? <Link href="/support" className="underline underline-offset-2">We&rsquo;ll help</Link>.
      </p>
    </div>
  )
}

function Field({
  label,
  type,
  autoComplete,
  value,
  onChange,
  placeholder,
}: {
  label: string
  type: string
  autoComplete: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  )
}
