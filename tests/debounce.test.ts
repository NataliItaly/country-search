import { afterEach, describe, expect, it, vi } from 'vitest'
import debounce from '../src/utils/debounce.js'

afterEach(() => {
  vi.useRealTimers()
})

describe('debounce', () => {
  it('should not call the function immediately', () => {
    vi.useFakeTimers()

    const callback = vi.fn()
    const debounced = debounce(callback, 500)

    debounced()

    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the function after the specified delay', () => {
    vi.useFakeTimers()

    const callback = vi.fn()
    const debounced = debounce(callback, 500)

    debounced()

    vi.advanceTimersByTime(499)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer when called again', () => {
    vi.useFakeTimers()

    const callback = vi.fn()
    const debounced = debounce(callback, 500)

    debounced()

    vi.advanceTimersByTime(300)

    debounced()

    vi.advanceTimersByTime(499)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should use the latest arguments', () => {
    vi.useFakeTimers()

    const callback = vi.fn()
    const debounced = debounce(callback, 500)

    debounced('Italy')
    debounced('France')
    debounced('Germany')

    vi.advanceTimersByTime(500)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('Germany')
  })
})
