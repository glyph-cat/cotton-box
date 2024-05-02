/* eslint-disable */
import { AsyncStateManager, StateManager } from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { $1, $2 } from '../../abstractions'
import { useDebugName } from '../../internals/debug-value'
import { getErrorMessageIfIncorrectType } from './internals'

// ===== This API is not ready =====
// We're not sure if this API design creates more problems than it solves.
// Adding this API means more liability in terms of maintaining the code,
// fixing bugs that may be discovered in the future, and making sure that
// the type definitions are properly written.

type $$ = $1 | $2

/**
 * Watch for changes related to a State Manager's initialization state.
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns `true` if the State Manager is still initializing, otherwise `false`.
 * @alpha
 */
export function useInitStatus(
  stateManager: StateManager<any> | AsyncStateManager<any>
): boolean {
  useDebugName(stateManager)
  if (process.env.NODE_ENV !== 'production') {
    if ((stateManager as $$).type === 1) {
      const errorMessage = getErrorMessageIfIncorrectType(stateManager as $$)
      // eslint-disable-next-line no-console
      if (errorMessage) { console.error(errorMessage) }
    }
  }
  return useSyncExternalStore(
    (stateManager as $$).isInitializing.watch,
    (stateManager as $$).isInitializing.get,
    (stateManager as $$).isInitializing.get,
  )
}
