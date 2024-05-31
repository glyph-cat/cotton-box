import { AsyncStateManager, StateManager } from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { $1, $2 } from '../../abstractions'
import { useDebugName } from '../../internals/debug-value'

type $$ = $1 | $2

/**
 * {:TSDOC_DESC_USE_INIT_STATE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @see -{:DOCS_API_REACT_URL:}/useInitState
 * @returns -{:TSDOC_DESC_USE_INIT_STATE:}
 * @public
 */
export function useInitState(
  stateManager: StateManager<any> | AsyncStateManager<any>
): boolean {
  useDebugName(stateManager)
  return useSyncExternalStore(
    (stateManager as $$)._isInitializing.watch,
    (stateManager as $$)._isInitializing.get,
    (stateManager as $$)._isInitializing.get,
  )
}
