import createElement from '../utils/createElement.js';
export default function noResultEl(query) {
    const result = createElement('div', { class: 'no-results' });
    const text = createElement('p', { class: 'no-results__text' }, `Hmm, we couldn't find any matches for "${query}". Want to try different symbols?`);
    const img = createElement('img', {
        class: 'no-results__img',
        src: './assets/cat.png',
        alt: 'Cat with a magnifying glass',
    });
    result.append(text, img);
    return result;
}
//# sourceMappingURL=noResultEl.js.map