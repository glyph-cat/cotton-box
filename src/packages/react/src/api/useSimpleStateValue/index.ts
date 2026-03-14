import {
  ReadOnlyStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateSelector,
} from 'cotton-box'
import { useCallback, useRef, useSyncExternalStore } from 'react'
import { $0 } from '../../abstractions'
import { useDebugName } from '../../internals/debug-value'
import { emptyWatcher } from '../../internals/empty-watcher'
import { NoState } from '../no-state'
import { getNoState } from '../no-state/internal'

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValue<State>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: null,
  active?: boolean
): State

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  active?: boolean
): SelectedState

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValue<State, SelectedState>(
  stateManager: null | undefined,
  selector?: StateSelector<NoState, SelectedState>,
  active?: boolean
): NoState

/**
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State> | null | undefined,
  selector?: StateSelector<State | NoState, SelectedState>,
  active?: boolean
): State | NoState

export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State> | null | undefined,
  selector: StateSelector<State | NoState, SelectedState> | null = null,
  active = true
): State | SelectedState | NoState {

  useDebugName(stateManager)

  const selectorRef = useRef<typeof selector>(null!)
  selectorRef.current = selector

  const getSnapshot = useCallback(() => {
    const fullStateSnapshot = (stateManager?.get ?? getNoState)()
    return selectorRef.current
      ? selectorRef.current(fullStateSnapshot)
      : fullStateSnapshot
  }, [stateManager])

  return useSyncExternalStore(
    (active && stateManager?.watch) ? stateManager.watch : emptyWatcher,
    getSnapshot,
    (stateManager as $0)
      ? (stateManager as $0).clientOnly ? undefined : getSnapshot
      : getNoState
  )
}
