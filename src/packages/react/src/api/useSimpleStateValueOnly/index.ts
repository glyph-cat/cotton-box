import { ReadOnlyStateManager, SimpleFiniteStateManager, SimpleStateManager } from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { $0 } from '../../abstractions'

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
): State {
  return useSyncExternalStore(
    stateManager.watch,
    stateManager.get,
    (stateManager as $0).clientOnly ? undefined : stateManager.get,
  )
}
