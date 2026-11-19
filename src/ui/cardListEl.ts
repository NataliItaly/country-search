import createElement from '../utils/createElement.js'
import type { Country } from '../types/country.js'

export default function cardListEl(data: Country[]): HTMLElement {
  const list = createElement('ul', { class: 'list' })

  data.forEach((item): void => {
    const listItem = createElement('li', { class: 'list__item', id: item.id })

    const countryFields: (keyof Country)[] = [
      'name',
      'population',
      'flag',
      'capital',
      'region',
    ]
    countryFields.forEach((field) => {
      const row = createElement('p', { class: 'list__item-row' })
      const rowName = createElement(
        'span',
        { class: `list__row-name` },
        `${field}:`
      )

      let rowTitle: HTMLElement
      if (field === 'flag') {
        rowTitle = createElement('img', {
          class: 'list__item-flag',
          src: item.flag,
          alt: `${item.name} flag`,
        })
      } else {
        rowTitle = createElement(
          'span',
          { class: `list__row-title list__item-${field}` },
          String(item[field])
        )
      }

      row.append(rowName, rowTitle)
      listItem.append(row)
    })

    if (item.languages.length > 0) {
      const row = createElement('p', { class: 'list__item-row' })
      const rowName = createElement(
        'span',
        { class: 'list__row-name' },
        'Language:'
      )
      row.append(rowName)

      item.languages.forEach((l) => {
        const rowEl = createElement(
          'span',
          { class: 'list__row-title list__item-language' },
          l
        )
        row.append(rowEl)
      })

      listItem.append(row)
    }

    list.append(listItem)
  })

  return list
}
