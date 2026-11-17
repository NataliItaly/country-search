import createElement from '../utils/createElement.js';
export default function cardListEl(data) {
    const list = createElement('ul', { class: 'list' });
    data.forEach((item) => {
        const listItem = createElement('li', { class: 'list__item', id: item.id });
        const countryFields = [
            'id',
            'name',
            'population',
            'flag',
            'capital',
            'region',
        ];
        countryFields.forEach((field) => {
            const row = createElement('p', { class: 'list__item-row' });
            const rowName = createElement('span', { class: `list__row-name` }, `${field}:`);
            const rowTitle = createElement('span', { class: `list__row-title list__item-${field}` }, String(item[field]));
            row.append(rowName, rowTitle);
            listItem.append(row);
        });
        if (item.languages.length > 0) {
            const row = createElement('p', { class: 'list__item-row' });
            const rowName = createElement('span', { class: 'list__row-name' }, 'Language:');
            row.append(rowName);
            item.languages.forEach((l) => {
                const rowEl = createElement('span', { class: 'list__row-title list__item-language' }, l);
                row.append(rowEl);
            });
            listItem.append(row);
        }
        list.append(listItem);
    });
    return list;
}
//# sourceMappingURL=cardListEl.js.map