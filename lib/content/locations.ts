import { locations, allServedCities, type LocationPage } from "@/data/locations"

export function getAllLocations(): LocationPage[] {
  return locations
}

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllServedCities() {
  return allServedCities
}
