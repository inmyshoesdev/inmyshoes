export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined
}

export function isNotNull<T>(x: T | null): x is T {
  return x !== null
}

export function once<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let applied = false

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (applied) {
      return undefined
    }

    applied = true
    return func(...args)
  }
}
