import { solutions, type SolutionPage } from "@/data/solutions"

export function getAllSolutions(): SolutionPage[] {
  return solutions
}

export function getSolutionBySlug(slug: string): SolutionPage | undefined {
  return solutions.find((s) => s.slug === slug)
}
