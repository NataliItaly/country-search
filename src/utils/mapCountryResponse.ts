import type { Country } from '../types/country.js'

interface RawLanguage {
  name?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export default function mapCountryResponse(raw: unknown): Country {
  if (!isRecord(raw)) {
    throw new TypeError('Invalid country response')
  }

  const languages = Array.isArray(raw.languages)
    ? raw.languages
        .filter(
          (language): language is RawLanguage =>
            isRecord(language) && typeof language.name === 'string'
        )
        .map((language) => language.name as string)
    : []

  const result = {
    id: '',
    name: typeof raw.name === 'string' ? raw.name : '',
    flag: typeof raw.flag === 'string' ? raw.flag : '',
    capital: typeof raw.capital === 'string' ? raw.capital : '',
    region: typeof raw.region === 'string' ? raw.region : '',
    population: typeof raw.population === 'number' ? raw.population : 0,
    languages,
  }

  return result
}
