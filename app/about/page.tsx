import { buildMetadata } from "@/lib/seo/metadata"
import { PageHeader } from "@/components/blocks/page-header"
import { Breadcrumbs } from "@/components/blocks/breadcrumbs"
import { SourcedStat } from "@/components/blocks/sourced-stat"
import { CtaSection } from "@/components/blocks/cta-section"
import { Card } from "@/components/ui/card"

export const metadata = buildMetadata({
  title: "About",
  description:
    "Why we built X1 Voice: too many restaurant phone calls go unanswered, and every one of them is a lost order.",
  path: "/about",
})

const VALUES = [
  {
    title: "No call should be a coin flip",
    body: "Whether a caller reaches someone during a Friday rush shouldn't depend on how many people happen to be near the phone right now. That's the specific problem X1 Voice exists to solve.",
  },
  {
    title: "Say what's true, not what sounds good",
    body: "We'd rather show a labeled placeholder than a fabricated testimonial, and a sourced estimate than a vague percentage restated three different ways. That standard applies to this site as much as to the product.",
  },
  {
    title: "Fit into how a restaurant already runs",
    body: "X1 Voice is built to sit on top of the phone number and POS you already use, not to make you change how your kitchen or front-of-house operates.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <PageHeader
        eyebrow="About"
        title="Why we built X1 Voice"
        description="A phone that rings out is a lost order. We built X1 Voice to make sure that stops happening."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-5 text-muted-foreground">
          <p>
            Restaurant phones ring the most at exactly the moment
            there&rsquo;s the least slack to answer them. Anyone who has
            worked a Friday dinner rush knows it: the line is out the door
            and everyone in the building is already doing something else.
            Most of those unanswered calls are customers who wanted to place
            an order. They just called somewhere else instead.
          </p>
          <p>
            That&rsquo;s the problem X1 Voice is built around: an AI phone
            agent that answers every call to your existing restaurant number,
            takes the order the way a good front-of-house person would,
            modifiers and substitutions included, and puts it straight into
            your POS with no re-keying. It covers the hours nobody wants to
            staff a phone for, and it never puts a caller on hold because the
            kitchen just got slammed.
          </p>
          <p>
            We&rsquo;re an early, small company. We don&rsquo;t have a decade
            of history or a wall of customer logos to point to, and
            we&rsquo;re not going to invent either. What we do have is a
            clear, specific problem we watched happen at real restaurants,
            and a product built to fix it. As real customers come on board,
            their stories will replace the placeholders you see elsewhere on
            this site. That&rsquo;s a promise about where this page is
            headed, not a claim we&rsquo;re making today.
          </p>
        </div>

        <div className="mt-12 rounded-xl border bg-muted/20 p-8">
          <SourcedStat className="mx-auto flex flex-col items-center text-center" />
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-display font-semibold sm:text-3xl">
              What we build toward
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <Card key={v.title} className="p-6">
                <h3 className="font-medium">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Hear it answer a call yourself."
        description="The fastest way to understand X1 Voice is to hear it work. Book a live demo and we'll call your own restaurant number."
      />
    </>
  )
}
