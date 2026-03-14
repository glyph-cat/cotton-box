import { ReadOnlyStateManager, SimpleFiniteStateManager, SimpleStateManager } from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { emptyWatcher } from '../../internals/empty-watcher'
import { NoState } from '../no-state'
import { getNoState } from '../no-state/internal'

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
): State

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: null | undefined,
): NoState

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State> | null | undefined,
): State | NoState

export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State> | null | undefined,
): State | NoState {
  return useSyncExternalStore(
    stateManager?.watch ?? emptyWatcher,
    (stateManager?.get ?? getNoState) as (() => State | NoState),
    stateManager
      ? (stateManager as SimpleStateManager<State>).clientOnly ? undefined : stateManager.get
      : getNoState
  )
}
