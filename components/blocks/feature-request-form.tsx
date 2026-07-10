"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const featureRequestSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  restaurant: z.string().optional(),
  email: z.email("Enter a valid email address."),
  request: z.string().min(10, "Tell us a bit more — at least 10 characters."),
})

type FeatureRequestValues = z.infer<typeof featureRequestSchema>

/**
 * Client-validated feature-request form. Posts to
 * app/api/feature-request/route.ts, which re-validates server-side and
 * currently only acknowledges receipt (see that file's TODO for wiring real
 * delivery to GHL / a product board before launch).
 */
export function FeatureRequestForm() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatureRequestValues>({
    resolver: zodResolver(featureRequestSchema),
  })

  async function onSubmit(values: FeatureRequestValues) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-lg border border-brand/40 bg-brand/5 p-6 text-center">
        <p className="font-medium">Request received.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks — the team reads every one. If we build it, we&rsquo;ll let you
          know.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fr-name">Your name</Label>
          <Input
            id="fr-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fr-restaurant">Restaurant</Label>
          <Input
            id="fr-restaurant"
            autoComplete="organization"
            {...register("restaurant")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fr-email">Email</Label>
        <Input
          id="fr-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fr-request">What would you like X1 Voice to do?</Label>
        <Textarea
          id="fr-request"
          rows={5}
          aria-invalid={!!errors.request}
          placeholder="Describe the problem and how a feature would solve it…"
          {...register("request")}
        />
        {errors.request ? (
          <p className="text-xs text-destructive">{errors.request.message}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong. Try again, or email us directly.
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Submit request"}
      </Button>
    </form>
  )
}
