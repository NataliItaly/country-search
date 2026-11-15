import type { Country } from '../types/country.js'

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
    throw new Error(`HTTP error: ${response.status}`)
  }

  return (await response.json()) as Country[]
}
