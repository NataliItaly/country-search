let countryState;
const savedCountryState = localStorage.getItem('countryState');
if (savedCountryState) {
    countryState = JSON.parse(savedCountryState);
}
else {
    countryState = [];
    localStorage.setItem('countryState', JSON.stringify(countryState));
}
export function getCountryState() {
    return countryState;
}
export function setCountryState(obj) {
    Object.assign(countryState, obj);
    localStorage.setItem('countryState', JSON.stringify(countryState));
}
//# sourceMappingURL=state.js.map