import { HeroVideo } from "@/components/blocks/hero-video"
import { DeviceReveal } from "@/components/blocks/device-reveal"
import { DemoCall } from "@/components/blocks/demo-call"
import { StatMolten } from "@/components/blocks/stat-molten"
import { RoiCalculator } from "@/components/blocks/roi-calculator"
import { HowItWorks } from "@/components/blocks/how-it-works"
import { BentoFeatures } from "@/components/blocks/bento-features"
import { DeliverectFlow } from "@/components/blocks/deliverect-flow"
import { PosGrid } from "@/components/blocks/pos-grid"
import { VoiceComparison } from "@/components/blocks/voice-comparison"
import { TestimonialsColumns } from "@/components/blocks/testimonials-columns"
import { PlansSection } from "@/components/blocks/plans-section"
import { Resellers } from "@/components/blocks/resellers"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { HOME_FAQS } from "@/data/site"

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DeviceReveal />
      <DemoCall />
      <StatMolten />
      <RoiCalculator />
      <HowItWorks />
      <BentoFeatures />
      <DeliverectFlow />
      <PosGrid />
      <VoiceComparison limit={8} />
      <TestimonialsColumns />
      <PlansSection />
      <Resellers />

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
