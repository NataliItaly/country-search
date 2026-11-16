import containerEl from './ui/containerEl.js'
import debounce from './utils/debounce.js'
import handleSearch from './handlers/handleSearch.js'

const containerElement = containerEl()
document.body.append(containerElement)

let activeController: AbortController | null = null

const debouncedSearch = debounce((query: string, signal: AbortSignal): void => {
  if (signal.aborted) {
    return
  }

  void handleSearch(query, signal)
}, 300)

containerElement.addEventListener('input', (e: Event) => {
  if (
    !(e.target instanceof HTMLInputElement) ||
    e.target.id !== 'search-input'
  ) {
    return
  }

  // cancel the previous request
  activeController?.abort()

  // get new value
  const query = e.target.value.trim().toLowerCase()

  // clean previous result
  const resultEl = document.querySelector('result')
  if (resultEl) resultEl.replaceChildren()

  // check for empty input
  if (!query) {
    activeController = null
    return
  }

  // create new AbortController
  const controller = new AbortController()
  activeController = controller

  // starting the search with debounce
  debouncedSearch(query, controller.signal)
})
