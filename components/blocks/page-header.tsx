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
    <div className="relative overflow-hidden border-b">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
        {eyebrow ? (
          <p className="text-sm font-medium text-brand">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-balance text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
