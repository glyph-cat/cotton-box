// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isNull(value: unknown): value is null {
  return Object.is(value, null)
}

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object'
}
