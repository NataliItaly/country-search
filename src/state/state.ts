import type { Country } from '../types/country.js'

let countryState: Country[]

const savedCountryState = localStorage.getItem('countryState')

if (savedCountryState) {
  try {
    countryState = JSON.parse(savedCountryState) as Country[]
  } catch {
    countryState = []
  }
}

export function getCountryState() {
  return countryState
}

export function setCountryState(countries: Country[]) {
  countryState = countries

  localStorage.setItem('countryState', JSON.stringify(countryState))
}
