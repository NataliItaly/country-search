import containerEl from './ui/containerEl.js';
import debounce from './utils/debounce.js';
import handleSearch from './handlers/handleSearch.js';
import getYear from './utils/getYear.js';
import countryPopup from './ui/countryPopup.js';
import { getCountryState } from './state/state.js';
getYear();
const containerElement = containerEl();
document.body.prepend(containerElement);
let activeController = null;
const debouncedSearch = debounce((query, signal) => {
    if (signal.aborted) {
        return;
    }
    void handleSearch(query, signal);
}, 300);
containerElement.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target instanceof HTMLElement && e.target.closest('.list__item')) {
        const element = e.target.closest('.list__item');
        const currentCountries = getCountryState();
        const currentData = currentCountries.find((item) => element.id === item.id);
        if (currentData) {
            const popupEl = countryPopup(currentData);
            document.body.append(popupEl);
        }
    }
});
window.addEventListener('click', function (e) {
    if (e.target instanceof HTMLElement && e.target.closest('.popup__btn')) {
        console.log('popup close');
        const popup = e.target.closest('.popup');
        console.log(popup);
        if (popup)
            popup.remove();
    }
    if (e.target instanceof HTMLElement &&
        e.target.classList.contains('popup') &&
        !e.target.closest('.popup__window')) {
        const popup = e.target.closest('.popup');
        if (popup)
            popup.remove();
    }
});
containerElement.addEventListener('input', (e) => {
    if (!(e.target instanceof HTMLInputElement) ||
        e.target.id !== 'search-input') {
        return;
    }
    // cancel the previous request
    activeController?.abort();
    activeController = null;
    // get new value
    const query = e.target.value.trim().toLowerCase();
    // clean previous result
    const resultEl = document.querySelector('.result');
    if (resultEl)
        resultEl.replaceChildren();
    // check for empty input
    if (!query) {
        //activeController = null
        return;
    }
    // create new AbortController
    const controller = new AbortController();
    activeController = controller;
    // starting the search with debounce
    debouncedSearch(query, controller.signal);
});
//# sourceMappingURL=main.js.map