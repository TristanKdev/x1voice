import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Faq } from "@/data/solutions"

/**
 * Doubles as the on-page AEO Q&A surface — direct-answer-first content that
 * answer engines can extract, and the same `faqs` array feeds FAQPage
 * JSON-LD via lib/seo/jsonld.ts's buildFaqJsonLd().
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion className="mx-auto max-w-2xl">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.question} value={`faq-${i}`}>
          <AccordionTrigger className="text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
