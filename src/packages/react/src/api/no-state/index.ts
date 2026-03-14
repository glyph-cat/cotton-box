/**
 * Type of {@link NO_STATE|`NO_STATE`}.
 * @public
 */
export interface NoState extends Symbol { }

/**
 * An reference object returned from _"useStateValue"_ series hooks indicating that
 * no state manager were provided.
 * @public
 */
export const NO_STATE = Symbol('NO_STATE') as NoState

/**
 * Checks if the a value is _not_ a reference object indicating that no state manager
 * was provided to the _"useStateValue"_ series hooks.
 * @param value - The value to check.
 * @returns `false` if the value is {@link NO_STATE|`NO_STATE`}, otherwise `true`.
 */
export function hasState(value: unknown): value is NoState {
  return !Object.is(value, NO_STATE)
}

/**
 * Checks if the a value is a reference object indicating that no state manager
 * was provided to the _"useStateValue"_ series hooks.
 * @param value - The value to check.
 * @returns `true` if the value is {@link NO_STATE|`NO_STATE`}, otherwise `false`.
 */
export function hasNoState(value: unknown): value is NoState {
  return Object.is(value, NO_STATE)
}
