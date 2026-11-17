import searchCountries from '../api/searchCountries.js'
import cardListEl from '../ui/cardListEl.js'
import noResultEl from '../ui/noResultEl.js'

export default async function handleSearch(
  query: string,
  signal: AbortSignal
): Promise<void> {
  const result = document.querySelector('.result')

  try {
    const countries = await searchCountries(query, signal)

    if (signal.aborted) {
      if (result) result.innerHTML = '' // ?
      return
    }

    console.log(countries)
    const cards = cardListEl(countries)

    console.log(cards.children.length)
    if (result) {
      result.innerHTML = ''
      if (cards.children.length > 0) {
        result.append(cards)
      } else {
        const emptyResultEl = noResultEl(query)
        result.append(emptyResultEl)
      }
    }
  } catch (error) {
    if (signal.aborted) {
      if (result) {
        result.innerHTML = ''
      }
      return
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      if (result) {
        result.innerHTML = ''
      }
      return
    }

    console.error('Search failed:', error)
  }
}
