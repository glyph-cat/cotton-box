import { $ } from '../../abstractions'

/**
 * Error needs to be thrown, otherwise if `AsyncStateManager` is used, it will
 * return a `Promise` when useSyncExternalStore tries to get the state snapshot.
 * This in turn causes infinite render.
 * @returns `true` if `stateManager` is `StateManager` or `AsyncStateManager`
 * based on the `.type` property.
 */
export function isInvalidStateManagerType(stateManager: unknown): 1 {
  const stateManagerType = (stateManager as $)?.type
  if (stateManagerType === 2 || stateManagerType === 3) { return 1 }
  // Here, we save a few bytes by either returning `1` or nothing at all.
}

export function getErrorMessageForNonReactiveHookIfIncorrectType(stateManager: $): string {
  const stateManagerName = stateManager?.name
  const stateManagerType = (stateManager as $)?.type
  return `Invalid State Manager type.\n\nIt seems like you have mistakenly passed ${stateManagerType === 2 ? 'a `StateManager`' : 'an `AsyncStateManager`'} ${stateManagerName ? `(name: ${stateManagerName}) ` : ''}to \`useSimpleStateValue\`. Please \`useStateValue\` instead.`
}

export function getErrorMessageForReactiveHookIfIncorrectType(stateManager: $): string {
  const stateManagerName = stateManager?.name
  const stateManagerType = (stateManager as $)?.type
  return `Invalid State Manager type.\n\nIt seems like you have mistakenly passed ${stateManagerType === 2 ? 'a `StateManager`' : 'an `AsyncStateManager`'} ${stateManagerName ? `(name: ${stateManagerName}) ` : ''}to \`useSimpleStateValueWithReactiveSelector\`. Please \`useStateValueWithReactiveSelector\` instead.`
}

// About this:
// ┌────────────────────────────────────────────────────────────────────────┐
// │ stateManagerType === 2 ? 'a `StateManager`' : 'an `AsyncStateManager`' │
// └────────────────────────────────────────────────────────────────────────┘
// We do not need extra checks and can assume it can only be one of the two
// because we have already checked with `isInvalidStateManagerType` to make sure
// that the error message will only be logged if they are indeed State Managers,
// but just the invalid types.
