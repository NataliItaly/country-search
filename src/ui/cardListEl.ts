import createElement from '../utils/createElement.js'
import type { CountryResponse } from '../types/countryResponse.js'

export default function cardListEl(data: CountryResponse[]): HTMLElement {
  const list = createElement('ul', { class: 'result' })

  data.forEach((item) => {
    let text = ''
    if (item.name) text = item.name.toString()
    const itemList = createElement('div', { class: 'result__item' }, text)
    list.append(itemList)
  })

  return list
}
