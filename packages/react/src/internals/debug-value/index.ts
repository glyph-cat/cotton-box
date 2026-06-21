import {
  AsyncStateManager,
  ReadOnlyStateManager,
  SimpleStateManager,
  StateManager,
} from 'cotton-box'
import { useDebugValue } from 'react'

/**
 * This allows us to control the behavior of displaying the debug name in the
 * future. For example, displaying the name based on certain conditions.
 * But for now, this will do.
 */
export function useDebugName(
  stateManager: SimpleStateManager<any> | StateManager<any> | AsyncStateManager<any> | ReadOnlyStateManager<any>
): void {
  useDebugValue(stateManager?.name ?? null)
}
