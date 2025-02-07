// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isNull(value: unknown): value is null {
  return Object.is(value, null)
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return Object.is(value, null) || typeof value === 'undefined'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object'
}
