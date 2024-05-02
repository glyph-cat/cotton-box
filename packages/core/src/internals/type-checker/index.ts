// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object'
}
