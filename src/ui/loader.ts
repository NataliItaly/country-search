import createElement from '../utils/createElement.js'

export default function loaderEl(): HTMLElement {
  const loader = createElement('div', { class: 'loader' })
  return loader
}
