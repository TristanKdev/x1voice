import { HeroVideo } from "@/components/blocks/hero-video"
import { DemoCall } from "@/components/blocks/demo-call"
import { StatMolten } from "@/components/blocks/stat-molten"
import { HowItWorks } from "@/components/blocks/how-it-works"
import { Benefits } from "@/components/blocks/benefits"
import { ProductDashboard } from "@/components/blocks/product-dashboard"
import { DeliverectFlow } from "@/components/blocks/deliverect-flow"
import { PosGrid } from "@/components/blocks/pos-grid"
import { VoiceComparison } from "@/components/blocks/voice-comparison"
import { TestimonialMarquee } from "@/components/blocks/testimonial-marquee"
import { PlansSection } from "@/components/blocks/plans-section"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { HOME_FAQS } from "@/data/site"

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DemoCall />
      <StatMolten />
      <HowItWorks />
      <Benefits />
      <ProductDashboard />
      <DeliverectFlow />
      <PosGrid />
      <VoiceComparison limit={7} />
      <TestimonialMarquee />
      <PlansSection />

      <section className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <JsonLd data={buildFaqJsonLd(HOME_FAQS)} />
          <h2 className="font-display text-center text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={HOME_FAQS} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
