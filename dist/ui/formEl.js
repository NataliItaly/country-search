import createElement from '../utils/createElement.js';
export default function formEl() {
    const form = createElement('form', {
        class: 'screen form form_game',
        id: 'game',
    });
    const label = createElement('label', { class: 'form__label', htmlFor: 'search-input' }, "Entry country's name");
    const input = createElement('input', {
        class: 'form__input',
        id: 'search-input',
        name: 'search-input',
        type: 'search',
        placeholder: 'For example Italy',
    });
    form.append(label, input);
    return form;
}
//# sourceMappingURL=formEl.js.map