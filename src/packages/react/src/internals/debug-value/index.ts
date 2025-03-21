import {
  AsyncStateManager,
  ReadOnlyStateManager,
  SimpleStateManager,
  StateManager,
  StateManagerVisibility,
} from 'cotton-box'
import { useDebugValue } from 'react'
import { SyncValue } from '../../abstractions'
import { $$INTERNALS } from '../../constants'

/**
 * This allows us to control the behavior of displaying the debug name in the
 * future. For example, displaying the name based on certain conditions.
 * But for now, this will do.
 */
export function useDebugName(
  stateManager: SimpleStateManager<any> | StateManager<any> | AsyncStateManager<any> | ReadOnlyStateManager<any>
): void {
  useDebugValue(stateManager?.['name'])
}

export function useInspectableValue(
  visibility: StateManagerVisibility,
  valueToShow: SyncValue<unknown>
): void {
  useDebugValue(evaluateDebugValueVisibility(visibility)
    ? valueToShow.get($$INTERNALS)
    : undefined
  )
}

/**
 * @returns `true` if visible, otherwise `false`.
 */
export function evaluateDebugValueVisibility(
  visibility: StateManagerVisibility,
): boolean {
  if (visibility) {
    return visibility === StateManagerVisibility.EXPOSED
  } else {
    return process.env.NODE_ENV !== 'production'
  }
}
