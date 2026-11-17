import searchCountries from '../api/searchCountries.js';
import cardListEl from '../ui/cardListEl.js';
import noResultEl from '../ui/noResultEl.js';
import errorEl from '../ui/errorEl.js';
export default async function handleSearch(query, signal) {
    const result = document.querySelector('.result');
    if (signal.aborted)
        return;
    if (!query.trim()) {
        result?.replaceChildren();
        return;
    }
    try {
        const countries = await searchCountries(query, signal);
        /*  if (signal.aborted) {
          if (result) result.replaceChildren()
          return
        } */
        console.log(countries);
        const cards = cardListEl(countries);
        console.log(cards.children.length);
        if (result) {
            result.innerHTML = '';
            if (cards.children.length > 0) {
                result.append(cards);
            }
            else {
                const emptyResultEl = noResultEl(query);
                result.append(emptyResultEl);
            }
        }
    }
    catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return;
        }
        console.error('Search failed:', error);
        if (result) {
            result.replaceChildren(errorEl());
        }
    }
}
//# sourceMappingURL=handleSearch.js.map