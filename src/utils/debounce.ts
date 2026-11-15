export default function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined

  return (...args: Args): void => {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
