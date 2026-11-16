import createElement from '../utils/createElement.js'
import type { CountryResponse } from '../types/countryResponse.js'

export default function resultEl(data: CountryResponse[]): HTMLElement {
  const el = createElement('ul', { class: 'result' })

  data.forEach((item) => {
    let text = ''
    if (item.name) text = item.name.toString()
    const itemList = createElement('div', { class: 'result__item' }, text)
    el.append(itemList)
  })

  return el
}
