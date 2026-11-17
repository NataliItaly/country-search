import createElement from '../utils/createElement.js';
export default function noResultEl(query) {
    const result = createElement('div', { class: 'no-results' }, `Hmm, we couldn't find any matches for ${query}. Want to try a different symbols?`);
    const text = createElement('p', { class: 'no-results__text' }, `Hmm, we couldn't find any matches for ${query}. Want to try a different symbols?`);
    const img = createElement('img', {
        class: 'no-results__img',
        src: '../assets/cat.png',
        alt: 'Cat with a magnifying glass',
    }, `Hmm, we couldn't find any matches for ${query}. Want to try a different symbols?`);
    result.append(text, img);
    return result;
}
//# sourceMappingURL=noCardsEl.js.map