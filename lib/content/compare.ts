import { comparePages, type ComparePage } from "@/data/compare"

export function getAllComparePages(): ComparePage[] {
  return comparePages
}

export function getComparePageBySlug(slug: string): ComparePage | undefined {
  return comparePages.find((c) => c.slug === slug)
}
