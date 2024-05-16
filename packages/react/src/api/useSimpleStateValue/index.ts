import { SimpleStateManager, StateSelector } from 'cotton-box'
import { useCallback, useRef, useSyncExternalStore } from 'react'
import { $ } from '../../abstractions'
import { useDebugName } from '../../internals/debug-value'
import { emptyWatcher } from '../../internals/empty-watcher'

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
  stateManager: SimpleStateManager<State>,
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
  stateManager: SimpleStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  active?: boolean
): SelectedState

export function useSimpleStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State>,
  selector: StateSelector<State, SelectedState> | null = null,
  active = true
): State | SelectedState {

  useDebugName(stateManager)

  const selectorRef = useRef<StateSelector<State, SelectedState>>(null)
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
    (stateManager as $).clientOnly ? undefined : getSnapshot
  )
}

/**
 * {:TSDOC_MARKER_UNSTABLE_API:}
 * {:TSDOC_DESC_USE_SIMPLE_STATE_VALUE_WITH_REACTIVE_SELECTOR:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_REACTIVE_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useSimpleStateValueWithReactiveSelector
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useSimpleStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State>,
  selector: StateSelector<State, SelectedState>,
  active = true
): SelectedState {
  useDebugName(stateManager)
  const getSnapshot = useCallback(() => {
    return selector(stateManager.get())
  }, [selector, stateManager])
  return useSyncExternalStore(
    active ? stateManager.watch : emptyWatcher,
    getSnapshot,
    (stateManager as $).clientOnly ? undefined : getSnapshot,
  )
}
