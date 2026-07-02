export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        {eyebrow ? (
          <p className="text-sm font-medium text-brand">{eyebrow}</p>
        ) : null}
        <h1 className="font-display mt-3 max-w-3xl text-balance text-4xl font-medium sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
