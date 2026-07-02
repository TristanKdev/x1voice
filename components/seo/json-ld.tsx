export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  const payload = items.length === 1 ? items[0] : items
  return (
    <script
      type="application/ld+json"
      // JSON.stringify of our own typed builder output — not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
