import { buildMetadata } from "@/lib/seo/metadata"
import { LoginCard } from "@/components/blocks/login-card"

export const metadata = buildMetadata({
  title: "Sign in to your dashboard",
  description: "Sign in to the X1 Voice dashboard to review calls, update your menu, change hours, and see order and call reporting for every location you run.",
  path: "/login",
  noIndex: true,
})

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 py-16">
      <LoginCard />
    </section>
  )
}
