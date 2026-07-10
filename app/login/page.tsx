import { buildMetadata } from "@/lib/seo/metadata"
import { LoginCard } from "@/components/blocks/login-card"

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your X1 Voice dashboard.",
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
