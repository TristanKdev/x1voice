import { buildMetadata } from "@/lib/seo/metadata"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { Resellers } from "@/components/blocks/resellers"

export const metadata = buildMetadata({
  title: "Resellers, ISOs & Partners",
  description:
    "Sell X1 Voice to your restaurants. Partner terms, white-glove onboarding, recurring revenue, and a product that demos itself over the phone.",
  path: "/resellers",
})

export default function ResellersPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Resellers", path: "/resellers" }]} />
      <Resellers />
    </>
  )
}
