import createElement from '../utils/createElement.js';
export default function errorEl() {
    const errorElement = createElement('div', { class: 'error' });
    const message = createElement('div', { class: 'error__message' }, "Oops! Something went wrong. We couldn't complete your search.");
    const img = createElement('img', {
        class: 'error__img',
        src: './assets/cat-error.png',
        alt: 'Cat cat holding a disconnected power plug in its mouth next to an offline server stack.',
    });
    errorElement.append(message, img);
    return errorElement;
}
//# sourceMappingURL=errorEl.js.map