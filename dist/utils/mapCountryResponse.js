function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export default function mapCountryResponse(raw) {
    if (!isRecord(raw)) {
        throw new TypeError('Invalid country response');
    }
    const languages = Array.isArray(raw.languages)
        ? raw.languages
            .filter((language) => isRecord(language) && typeof language.name === 'string')
            .map((language) => language.name)
        : [];
    const flags = isRecord(raw.flags) ? raw.flags : undefined;
    const result = {
        id: '',
        name: typeof raw.name === 'string' ? raw.name : '',
        flag: typeof flags?.svg === 'string' && flags.svg
            ? flags.svg
            : typeof flags?.png === 'string' && flags.png
                ? flags.png
                : '',
        capital: typeof raw.capital === 'string' ? raw.capital : '',
        region: typeof raw.region === 'string' ? raw.region : '',
        population: typeof raw.population === 'number' ? raw.population : 0,
        languages,
    };
    return result;
}
//# sourceMappingURL=mapCountryResponse.js.map