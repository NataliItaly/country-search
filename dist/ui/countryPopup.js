import createElement from '../utils/createElement.js';
export default function countryPopup(data) {
    const popup = createElement('div', { class: 'popup' });
    const popupWindow = createElement('div', { class: 'popup__window' });
    const popupBtn = createElement('button', { class: 'popup__btn' });
    const countryFields = [
        'name',
        'population',
        'flag',
        'capital',
        'region',
    ];
    countryFields.forEach((field) => {
        const row = createElement('p', { class: 'list__item-row' });
        const rowName = createElement('span', { class: `list__row-name` }, `${field}:`);
        const rowTitle = createElement('span', { class: `list__row-title list__item-${field}` }, String(data[field]));
        row.append(rowName, rowTitle);
        popupWindow.append(row);
    });
    if (data.languages.length > 0) {
        const row = createElement('p', { class: 'list__item-row' });
        const rowName = createElement('span', { class: 'list__row-name' }, 'Language:');
        row.append(rowName);
        data.languages.forEach((l) => {
            const rowEl = createElement('span', { class: 'list__row-title list__item-language' }, l);
            row.append(rowEl);
        });
        popupWindow.append(row, popupBtn);
    }
    popup.append(popupWindow);
    return popup;
}
//# sourceMappingURL=countryPopup.js.map