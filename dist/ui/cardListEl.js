import createElement from '../utils/createElement.js';
export default function cardListEl(data) {
    const list = createElement('ul', { class: 'list' });
    data.forEach((item) => {
        const listItem = createElement('li', { class: 'list__item' });
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
/* const name = item.name ? item.name : ''
    const population = item.population ? String(item.population) : ''
    const flag = item.flag ? item.flag : ''
    const capital = item.capital ? item.capital : ''
    const region = item.region ? item.region : ''
    const languages = item.languages ? item.languages : [] */
/* const title = createElement('h3', { class: 'list__title' }, name)
    const capitalInfo = createElement(
      'p',
      { class: 'list__item-capital' },
      capital
    )
    const populationInfo = createElement(
      'p',
      { class: 'list__population-info' },
      population
    )
    const regionInfo = createElement(
      'p',
      { class: 'list__item-region' },
      region
    )
    const flagInfo = createElement('p', { class: 'list__item-flag' }, flag) */
//listItem.append(title, flagInfo, capitalInfo, populationInfo, regionInfo)
//# sourceMappingURL=cardListEl.js.map