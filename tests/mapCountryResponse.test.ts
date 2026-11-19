import { describe, expect, it } from 'vitest'
import mapCountryResponse from '../src/utils/mapCountryResponse'

describe('mapCountryResponse', () => {
  it('should map API response to country card data', () => {
    const raw = {
      name: 'Italy',
      flag: '🇮🇹',
      capital: 'Rome',
      region: 'Europe',
      population: 58853482,
      languages: [
        {
          iso639_1: 'it',
          name: 'Italian',
          nativeName: 'Italiano',
        },
      ],
    }

    expect(mapCountryResponse(raw)).toEqual({
      name: 'Italy',
      flag: '🇮🇹',
      capital: 'Rome',
      region: 'Europe',
      population: 58853482,
      languages: ['Italian'],
    })
  })

  it('should use default values for missing fields', () => {
    const raw = {
      name: 'Italy',
    }

    expect(mapCountryResponse(raw)).toEqual({
      name: 'Italy',
      flag: '',
      capital: '',
      region: '',
      population: 0,
      languages: [],
    })
  })

  it('should handle missing languages', () => {
    const raw = {
      name: 'Italy',
      languages: null,
    }

    expect(mapCountryResponse(raw).languages).toEqual([])
  })

  it('should ignore invalid language entries', () => {
    const raw = {
      name: 'Italy',
      languages: [
        { name: 'Italian' },
        null,
        { nativeName: 'Français' },
        'English',
      ],
    }

    expect(mapCountryResponse(raw).languages).toEqual(['Italian'])
  })

  it('should preserve a flag URL', () => {
    const raw = {
      name: 'Italy',
      flag: 'https://countries.dev/flags/it.svg',
    }

    expect(mapCountryResponse(raw).flag).toBe(
      'https://countries.dev/flags/it.svg'
    )
  })
})
