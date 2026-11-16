import createElement from '../utils/createElement.js'
import formEl from './formEl.js'

export default function createContainer() {
  const containerEl = createElement('div', { class: 'container' })
  const title = createElement('h1', {}, 'Country Search')

  const formElement = formEl()
  containerEl.append(title, formElement)

  return containerEl
}
