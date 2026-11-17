import searchCountries from '../api/searchCountries.js';
import cardListEl from '../ui/cardListEl.js';
export default async function handleSearch(query, signal) {
    try {
        const countries = await searchCountries(query, signal);
        if (signal.aborted) {
            return;
        }
        console.log(countries);
        const cards = cardListEl(countries);
        const result = document.querySelector('.result');
        if (result) {
            result.innerHTML = '';
            result.append(cards);
        }
    }
    catch (error) {
        if (signal.aborted) {
            return;
        }
        if (error instanceof DOMException && error.name === 'AbortError') {
            return;
        }
        console.error('Search failed:', error);
    }
}
//# sourceMappingURL=handleSearch.js.map