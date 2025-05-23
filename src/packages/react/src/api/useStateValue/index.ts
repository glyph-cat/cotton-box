import {
  AsyncStateManager,
  EqualityFn,
  ReadOnlyStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
  StateSelector,
} from 'cotton-box'
import { useCallback, useRef, useSyncExternalStore } from 'react'
import { isFunction } from '../../../../core/src/internals/type-checking'
import { $1, $2, SyncValue } from '../../abstractions'
import { $$INTERNALS } from '../../constants'
import { useDebugName, useInspectableValue } from '../../internals/debug-value'
import { emptyWatcher } from '../../internals/empty-watcher'
import { useSuspenseWaiter } from '../../internals/suspense-waiter'
import { useResolveHydrationStateManager } from '../hydration/internal'

type $$ = $1 | $2

type UseStateValueOptionalArgs<State, SelectedState> = [
  activeOrEqualityFn?: boolean | EqualityFn<State | SelectedState>,
  $active?: boolean,
]

// NOTE: For overloads where selectors are not null, we need to use `EqualityFn<any>`. Using `SelectedState` somehow messes up type inference, if that's what it's called.

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValue<State>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: null,
  active?: boolean,
): State

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_EQUALITY_FN:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValue<State>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: null,
  equalityFn?: EqualityFn<any>,
  active?: boolean,
): State

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  active?: boolean,
): SelectedState

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_EQUALITY_FN:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  equalityFn?: EqualityFn<any>,
  active?: boolean,
): SelectedState

export function useStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState> | null = null,
  ...optionalArgs: UseStateValueOptionalArgs<State, SelectedState>
): State | SelectedState {

  stateManager = useResolveHydrationStateManager(
    stateManager as unknown as StateManager<State> | AsyncStateManager<State>
  )

  useSuspenseWaiter(stateManager)
  useDebugName(stateManager)

  let active: boolean
  let isEqual: EqualityFn<State | SelectedState>
  if (optionalArgs.length >= 2) {
    isEqual = optionalArgs[0] as EqualityFn<State | SelectedState> ?? Object.is
    active = optionalArgs[1] ?? false
  } else {
    if (isFunction(optionalArgs[0])) {
      isEqual = optionalArgs[0]
      active = true
    } else {
      isEqual = Object.is
      active = optionalArgs[0] ?? true
    }
  }

  const selectorRef = useRef<StateSelector<State, SelectedState>>(null)
  selectorRef.current = selector
  const isEqualRef = useRef<EqualityFn<State | SelectedState>>(null)
  isEqualRef.current = isEqual

  const selectValue = useCallback(() => {
    const fullStateSnapshot = (stateManager as $$).get(1) as State
    if (selectorRef.current) {
      return selectorRef.current(fullStateSnapshot)
    } else {
      return fullStateSnapshot
    }
  }, [stateManager])

  const cachedSyncValue = useRef<SyncValue<State | SelectedState>>(null)
  const getSnapshot = useCallback((): SyncValue<State | SelectedState> => {
    if (
      Object.is(cachedSyncValue.current, null) ||
      !isEqualRef.current(cachedSyncValue.current.get($$INTERNALS), selectValue())
    ) {
      cachedSyncValue.current = new WeakMap([
        [$$INTERNALS, selectValue()],
      ]) as SyncValue<State | SelectedState>
    }
    return cachedSyncValue.current
  }, [selectValue])

  const stateValue = useSyncExternalStore(
    active ? stateManager.watch : emptyWatcher,
    getSnapshot,
    (stateManager as $$).clientOnly ? undefined : getSnapshot,
  )
  useInspectableValue((stateManager as $$).visibility, stateValue)
  return stateValue.get($$INTERNALS)

}

/**
 * {:TSDOC_MARKER_UNSTABLE_API:}
 * {:TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_REACTIVE_SELECTOR:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValueWithReactiveSelector
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState>
): SelectedState

/**
 * {:TSDOC_MARKER_UNSTABLE_API:}
 * {:TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_REACTIVE_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValueWithReactiveSelector
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState>,
  active?: boolean,
): SelectedState

/**
 * {:TSDOC_MARKER_UNSTABLE_API:}
 * {:TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_REACTIVE_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_REACTIVE_EQUALITY_FN:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValueWithReactiveSelector
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState>,
  equalityFn?: EqualityFn<State | SelectedState>,
): SelectedState

/**
 * {:TSDOC_MARKER_UNSTABLE_API:}
 * {:TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_REACTIVE_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_REACTIVE_EQUALITY_FN:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValueWithReactiveSelector
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @public
 */
export function useStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState>,
  equalityFn: EqualityFn<State | SelectedState>,
  active?: boolean,
): SelectedState

export function useStateValueWithReactiveSelector<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector: StateSelector<State, SelectedState>,
  ...optionalArgs: UseStateValueOptionalArgs<State, SelectedState>
): SelectedState {

  useSuspenseWaiter(stateManager)
  useDebugName(stateManager)

  let active: boolean
  let isEqual: EqualityFn<State | SelectedState>
  if (optionalArgs.length >= 2) {
    isEqual = optionalArgs[0] as EqualityFn<State | SelectedState> ?? Object.is
    active = optionalArgs[1] ?? false
  } else {
    if (isFunction(optionalArgs[0])) {
      isEqual = optionalArgs[0]
      active = true
    } else {
      isEqual = Object.is
      active = optionalArgs[0] ?? true
    }
  }

  const cachedSyncValue = useRef<SyncValue<SelectedState>>(null)
  const getSnapshot = useCallback((): SyncValue<SelectedState> => {
    const selectedState = selector((stateManager as $$).get(1))
    if (
      Object.is(cachedSyncValue.current, null) ||
      !isEqual(cachedSyncValue.current.get($$INTERNALS), selectedState)
    ) {
      cachedSyncValue.current = new WeakMap([
        [$$INTERNALS, selectedState],
      ]) as SyncValue<SelectedState>
    }
    return cachedSyncValue.current
  }, [isEqual, selector, stateManager])

  const stateValue = useSyncExternalStore(
    active ? stateManager.watch : emptyWatcher,
    getSnapshot,
    (stateManager as $$).clientOnly ? undefined : getSnapshot,
  )
  useInspectableValue((stateManager as $$).visibility, stateValue)
  return stateValue.get($$INTERNALS)

}
