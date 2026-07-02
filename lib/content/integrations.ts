import { integrations, type IntegrationPage } from "@/data/integrations"

export function getAllIntegrations(): IntegrationPage[] {
  return integrations
}

export function getIntegrationBySlug(slug: string): IntegrationPage | undefined {
  return integrations.find((i) => i.slug === slug)
}
