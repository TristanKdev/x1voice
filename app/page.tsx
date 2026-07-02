import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Hero } from "@/components/blocks/hero"
import { TypeMarquee } from "@/components/blocks/type-marquee"
import { BentoFeatures } from "@/components/blocks/bento-features"
import { SourcedStat } from "@/components/blocks/sourced-stat"
import { TestimonialMarquee } from "@/components/blocks/testimonial-marquee"
import { FaqAccordion } from "@/components/blocks/faq-accordion"
import { CtaSection } from "@/components/blocks/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { buildFaqJsonLd } from "@/lib/seo/jsonld"
import { Button } from "@/components/ui/button"
import { HOME_FAQS } from "@/data/site"

export default function Home() {
  return (
    <>
      <Hero />

      <TypeMarquee />

      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <SourcedStat className="mx-auto flex flex-col items-center" />
        </div>
      </section>

      <BentoFeatures />

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-display font-medium">
            Built for how your restaurant actually runs
          </h2>
          <p className="mt-3 text-muted-foreground">
            A pizzeria&apos;s phone problems look nothing like a fine-dining
            room&apos;s. See what changes for your kind of restaurant.
          </p>
          <Button
            variant="outline"
            className="mt-6 gap-2"
            nativeButton={false}
            render={
              <Link href="/solutions">
                Browse solutions by restaurant type
                <ArrowRightIcon className="size-4" />
              </Link>
            }
          />
        </div>
      </section>

      <TestimonialMarquee />

      <section className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <JsonLd data={buildFaqJsonLd(HOME_FAQS)} />
          <h2 className="text-center text-3xl font-display font-medium">
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
