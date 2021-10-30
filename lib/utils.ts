export function log(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args)
  }
}

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

// adapted from: https://stackoverflow.com/a/47112177
// essentially creates a Promise which can be resolved from outside the
// Promise's closure.
export class Deferred<T> {
  private _promise: Promise<T>
  resolve!: (value: T | PromiseLike<T>) => void
  reject!: (reason?: any) => void

  then: <TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ) => Promise<TResult1 | TResult2>

  catch: <TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ) => Promise<T | TResult>;

  [Symbol.toStringTag] = 'Promise'

  constructor() {
    this._promise = new Promise<T>((resolve, reject) => {
      // assign the resolve and reject functions to `this`
      // making them usable on the class instance
      this.resolve = resolve
      this.reject = reject
    })

    this._promise.then
    // bind `then` and `catch` to implement the same interface as Promise
    this.then = this._promise.then.bind(this._promise)
    this.catch = this._promise.catch.bind(this._promise)
  }
}

// From https://stackoverflow.com/a/12646864
export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
