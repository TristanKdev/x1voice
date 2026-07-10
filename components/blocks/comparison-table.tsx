import { CheckIcon, XIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type ComparisonColumn = {
  key: string
  label: string
  highlighted?: boolean
}

export type ComparisonRow = {
  feature: string
  values: Record<string, boolean | string>
  note?: string
}

/**
 * Neutral check/x/text markers, never color-only encoding, used for both
 * the pricing feature matrix and the compare-page feature matrix so the two
 * families of pages render comparisons identically.
 */
export function ComparisonTable({
  columns,
  rows,
}: {
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col" className="w-1/3">
              Feature
            </TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                scope="col"
                className={col.highlighted ? "text-brand" : undefined}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.feature}>
              <TableCell className="font-medium">
                {row.feature}
                {row.note ? (
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    {row.note}
                  </span>
                ) : null}
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <ComparisonValue value={row.values[col.key]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ComparisonValue({ value }: { value: boolean | string | undefined }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 text-foreground">
        <CheckIcon className="size-4" aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    )
  }
  if (value === false || value === undefined) {
    return (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <XIcon className="size-4" aria-hidden />
        <span className="sr-only">Not included</span>
      </span>
    )
  }
  return <span className="text-sm">{value}</span>
}
