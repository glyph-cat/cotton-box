import {
  AsyncStateManager,
  ReadOnlyStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
  StateSelector,
} from 'cotton-box'
import { useCallback, useRef, useSyncExternalStore } from 'react'
import { useDebugName } from '../../internals/debug-value'
import { emptyWatcher } from '../../internals/empty-watcher'

// #region Guard: invalid types

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: StateManager<State>,
  selector?: StateSelector<unknown, unknown>,
  active?: boolean
): never

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: StateManager<State>,
  selector?: null,
  active?: boolean
): never

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_ASYNC_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: AsyncStateManager<State>,
  selector?: StateSelector<unknown, unknown>,
  active?: boolean
): never

/**
 * {:TSDOC_WARN_NOT_COMPATIBLE_HERE_ASYNC_STATE_MANAGER:}
 * {:TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: AsyncStateManager<State>,
  selector?: null,
  active?: boolean
): never

// #endregion Guard: invalid types

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @example Plain usage
 * ```typescript
 * const counter = useSimpleStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: null,
  active?: boolean
): State

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @example Plain usage
 * ```typescript
 * const counter = useSimpleStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useSimpleStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @public
 */
export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  active?: boolean
): SelectedState

export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | StateManager<State> | AsyncStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState> | null = null,
  active = true
): State | SelectedState {

  useDebugName(stateManager)

  const selectorRef = useRef<typeof selector>(null!)
  selectorRef.current = selector

  const getSnapshot = useCallback(() => {
    const fullStateSnapshot = stateManager.get()
    return selectorRef.current
      ? selectorRef.current(fullStateSnapshot)
      : fullStateSnapshot
  }, [stateManager])

  return useSyncExternalStore(
    active ? stateManager.watch : emptyWatcher,
    getSnapshot,
    getSnapshot
  )
}
