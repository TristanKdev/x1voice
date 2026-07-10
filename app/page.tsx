import Link from "next/link"

import { HeroVideo } from "@/components/blocks/hero-video"
import { DeviceReveal } from "@/components/blocks/device-reveal"
import { StatMolten } from "@/components/blocks/stat-molten"
import { RoiCalculator } from "@/components/blocks/roi-calculator"
import { HowItWorks } from "@/components/blocks/how-it-works"
import { BentoFeatures } from "@/components/blocks/bento-features"
import { DeliverectFlow } from "@/components/blocks/deliverect-flow"
import { PosGrid } from "@/components/blocks/pos-grid"
import { VoiceComparison } from "@/components/blocks/voice-comparison"
import { TestimonialsColumns } from "@/components/blocks/testimonials-columns"
import { PlansSection } from "@/components/blocks/plans-section"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { DemoCall } from "@/components/blocks/demo-call"
import { Reveal } from "@/components/blocks/reveal"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { HOME_FAQS } from "@/data/site"

export default function Home() {
  return (
    <>
      <HeroVideo />
      <DeviceReveal />

      <Reveal>
        <StatMolten />
      </Reveal>
      <Reveal>
        <RoiCalculator />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <BentoFeatures />
      </Reveal>
      <Reveal>
        <DeliverectFlow />
      </Reveal>
      <Reveal>
        <PosGrid />
      </Reveal>
      <Reveal>
        <VoiceComparison limit={8} />
      </Reveal>
      <Reveal>
        <TestimonialsColumns />
      </Reveal>
      <Reveal>
        <PlansSection />
      </Reveal>

      <Reveal>
        <section id="faq" className="scroll-mt-20 border-t">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <JsonLd data={buildFaqJsonLd(HOME_FAQS)} />
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Still have questions?{" "}
                <Link href="/#see-it" className="font-semibold text-brand hover:underline">
                  Hear it in action
                </Link>{" "}
                and ask it anything, or{" "}
                <Link href="/support" className="font-semibold text-brand hover:underline">
                  reach support
                </Link>
                .
              </p>
            </div>
            <div className="mt-10">
              <FaqAccordion faqs={HOME_FAQS} />
            </div>
          </div>
        </section>
      </Reveal>

      {/* "Words don't do it justice, hear it yourself" closes the page */}
      <DemoCall />
    </>
  )
}
