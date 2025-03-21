/**
 * Determine if a value is a function.
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a function.
 */
export function isFunction(value: unknown): value is ((args: unknown[]) => unknown) {
  return typeof value === 'function'
}
