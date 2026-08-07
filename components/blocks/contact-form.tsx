"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { track } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  restaurantName: z.string().min(2, "Enter your restaurant's name."),
  message: z.string().min(10, "Tell us a bit more, at least 10 characters."),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Real, client-validated contact form, the old site's /contact page had
 * only mailto/tel links and nothing else, which the pre-rebuild audit
 * flagged on its own. Submits to app/api/contact/route.ts, which validates
 * the payload again server-side but does not send email yet (see that
 * file's TODO for wiring up real delivery before launch).
 */
export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      track("contact_form_submit", { page_path: window.location.pathname })
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-brand/40 bg-brand/5 p-6 text-center">
        <p className="font-medium">Message sent.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We read every message and typically reply within one business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-restaurant">Restaurant name</Label>
        <Input
          id="contact-restaurant"
          autoComplete="organization"
          aria-invalid={!!errors.restaurantName}
          {...register("restaurantName")}
        />
        {errors.restaurantName ? (
          <p className="text-xs text-destructive">
            {errors.restaurantName.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong sending your message. Try again, or reach us
          directly using the details above.
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}
