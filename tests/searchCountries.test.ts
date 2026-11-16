import { afterEach, describe, expect, it, vi } from 'vitest'
import searchCountries from '../src/api/searchCountries.js'
import { HttpError } from '../src/errors/HttpError.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('searchCountries', () => {
  it('should return an array of countries when response is successful', async () => {
    const apiResponse = [
      {
        name: 'Italy',
        population: 60000000,
        languages: [{ name: 'italian' }],
        capital: 'Rome',
        region: 'Europe',
        flag: '🇮🇹',
      },
    ]

    const expectedCountries = [
      {
        name: 'Italy',
        population: 60000000,
        languages: ['italian'],
        capital: 'Rome',
        region: 'Europe',
        flag: '🇮🇹',
      },
    ]

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(apiResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    const result = await searchCountries('Italy', controller.signal)

    expect(result).toEqual(expectedCountries)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('should return an empty array when country is not found', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response('Country not found', { status: 404 }))

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    const result = await searchCountries('Unknown', controller.signal)

    expect(result).toEqual([])
  })

  it('should throw HttpError for 429 status', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response('Too Many Requests', { status: 429 }))

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await expect(
      searchCountries('Italy', controller.signal)
    ).rejects.toMatchObject({
      name: 'HttpError',
      status: 429,
    })
  })

  it('should throw an error when response is not ok', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response('Internal Server Error', { status: 500 }))

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await expect(
      searchCountries('Italy', controller.signal)
    ).rejects.toMatchObject({
      name: 'HttpError',
      status: 500,
    })
  })

  it('should pass the AbortSignal to fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response('[]', {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await searchCountries('Italy', controller.signal)

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: controller.signal,
      })
    )
  })

  it('should encode the search query in the URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response('[]', {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await searchCountries('South Korea', controller.signal)

    expect(mockFetch).toHaveBeenCalledWith(
      'https://countries.dev/name/South%20Korea',
      expect.any(Object)
    )
  })

  it('should propagate network errors', async () => {
    const networkError = new Error('Network error')
    const mockFetch = vi.fn().mockRejectedValue(networkError)

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await expect(searchCountries('Italy', controller.signal)).rejects.toThrow(
      'Network error'
    )
  })

  it('should propagate AbortError when request is cancelled', async () => {
    const abortError = new DOMException(
      'The operation was aborted',
      'AbortError'
    )

    const mockFetch = vi.fn().mockRejectedValue(abortError)

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    await expect(
      searchCountries('Italy', controller.signal)
    ).rejects.toMatchObject({
      name: 'AbortError',
    })
  })

  it('should throw HttpError with the response status', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response('Internal Server Error', { status: 500 }))

    vi.stubGlobal('fetch', mockFetch)

    const controller = new AbortController()

    try {
      await searchCountries('Italy', controller.signal)
      throw new Error('Expected searchCountries to throw')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError)

      if (error instanceof HttpError) {
        expect(error.status).toBe(500)
      }
    }
  })
})
