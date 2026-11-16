import createElement from '../utils/createElement.js'
import formEl from './formEl.js'

export default function containerEl() {
  const containerEl = createElement('div', { class: 'container' })
  const title = createElement('h1', {}, 'Country Search')
  const resultEl = createElement('div', { class: 'result' })

  const formElement = formEl()
  containerEl.append(title, formElement, resultEl)

  return containerEl
}
