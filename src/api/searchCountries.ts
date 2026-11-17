import type { Country } from '../types/country.js'
import { HttpError } from '../errors/HttpError.js'
import mapCountryResponse from '../utils/mapCountryResponse.js'

const API_URL = 'https://countries.dev'

export default async function searchCountries(
  query: string,
  signal: AbortSignal
): Promise<Country[]> {
  const url = `${API_URL}/name/${encodeURIComponent(query)}`

  const response = await fetch(url, { signal })

  if (response.status === 404) {
    return []
  }

  if (!response.ok) {
    throw new HttpError(response.status)
  }

  const raw: unknown = await response.json()

  if (!Array.isArray(raw)) {
    throw new TypeError('Invalid countries response')
  }
  console.log('raw', raw.map(mapCountryResponse))
  return raw.map(mapCountryResponse)
}
