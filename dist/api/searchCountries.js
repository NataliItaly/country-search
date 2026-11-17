import { HttpError } from '../errors/HttpError.js';
import mapCountryResponse from '../utils/mapCountryResponse.js';
const API_URL = 'https://countries.dev';
export default async function searchCountries(query, signal) {
    const url = `${API_URL}/name/${encodeURIComponent(query)}`;
    const response = await fetch(url, { signal });
    if (response.status === 404) {
        return [];
    }
    if (!response.ok) {
        throw new HttpError(response.status);
    }
    const raw = await response.json();
    if (!Array.isArray(raw)) {
        throw new TypeError('Invalid countries response');
    }
    return raw.map(mapCountryResponse);
}
//# sourceMappingURL=searchCountries.js.map