import {
  AsyncStateManager,
  ReadOnlyStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
} from 'cotton-box'
import { useSyncExternalStore } from 'react'

// #region Guard: invalid types

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValueOnly
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: StateManager<State>,
): never

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_ASYNC_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValueOnly
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: AsyncStateManager<State>,
): never

// #endregion Guard: invalid types

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValueOnly
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @example
 * ```typescript
 * const counter = useSimpleStateValueOnly(CounterState)
 * ```
 * @public
 */
export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
): State

export function useSimpleStateValueOnly<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | StateManager<State> | AsyncStateManager<State> | ReadOnlyStateManager<State>,
): State {
  return useSyncExternalStore(
    stateManager.watch,
    stateManager.get,
    stateManager.get,
  )
}
