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

// based on https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
// returns tuple of [num, success]
export function tryConvertNumeric(str: string): [number, boolean] {
  const isNumeric =
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

  if (isNumeric) {
    return [Number(str), true]
  }
  return [0, false]
}

// returns tuple of [bool, success]
export function tryConvertBool(str: string): [boolean, boolean] {
  if (str === 'true') {
    return [true, true]
  }
  if (str === 'false') {
    return [false, true]
  }

  return [false, false]
}
