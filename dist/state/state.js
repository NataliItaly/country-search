let countryState;
const savedCountryState = localStorage.getItem('countryState');
if (savedCountryState) {
    try {
        countryState = JSON.parse(savedCountryState);
    }
    catch {
        countryState = [];
    }
}
export function getCountryState() {
    return countryState;
}
export function setCountryState(countries) {
    countryState = countries;
    localStorage.setItem('countryState', JSON.stringify(countryState));
}
//# sourceMappingURL=state.js.map