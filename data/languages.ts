/**
 * Languages X1 Voice can answer calls in. Representative list of the most
 * commonly requested ones for US/CA restaurants; more are available on
 * request (framed that way on purpose, not as a fixed guarantee). Edit
 * freely as coverage changes.
 */

export type Language = {
  name: string
  /** Endonym / native rendering, for the example chips. */
  native: string
}

export const LANGUAGES: Language[] = [
  { name: "English", native: "English" },
  { name: "Spanish", native: "Español" },
  { name: "French", native: "Français" },
  { name: "Mandarin Chinese", native: "中文" },
  { name: "Cantonese", native: "廣東話" },
  { name: "Vietnamese", native: "Tiếng Việt" },
  { name: "Korean", native: "한국어" },
  { name: "Japanese", native: "日本語" },
  { name: "Tagalog", native: "Tagalog" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Portuguese", native: "Português" },
  { name: "Italian", native: "Italiano" },
  { name: "German", native: "Deutsch" },
  { name: "Polish", native: "Polski" },
  { name: "Russian", native: "Русский" },
  { name: "Ukrainian", native: "Українська" },
  { name: "Arabic", native: "العربية" },
  { name: "Farsi", native: "فارسی" },
  { name: "Turkish", native: "Türkçe" },
  { name: "Thai", native: "ไทย" },
  { name: "Khmer", native: "ភាសាខ្មែរ" },
  { name: "Haitian Creole", native: "Kreyòl" },
  { name: "Greek", native: "Ελληνικά" },
  { name: "Hebrew", native: "עברית" },
]

/** A deliberately diverse handful shown as example chips before the full list. */
export const EXAMPLE_LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Vietnamese",
  "Korean",
  "Tagalog",
  "Russian",
  "Arabic",
].map((n) => LANGUAGES.find((l) => l.name === n)!).filter(Boolean)
