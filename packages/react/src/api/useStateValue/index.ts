import { isFunction, isNull } from '@glyph-cat/type-checking'
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
import { IS_RN_BUILD } from '../../constants'
import { useDebugName } from '../../internals/debug-value'
import { emptyWatcher } from '../../internals/empty-watcher'
import { useSuspenseWaiter } from '../../internals/suspense-waiter'
import { useResolveHydrationStateManager } from '../hydration/internals'

// NOTE: For overloads where selectors are not null, we need to use `EqualityFn<any>`. Using `SelectedState` somehow messes up type inference, if that's what it's called.

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 * @example Plain usage
 * ```typescript
 * const counter = useStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @example Custom equality checking
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * })
 * ```
 * @example Custom equality checking (+ temporarily pause component update)
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * }, false)
 * ```
 * @public
 */
export function useStateValue<State>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: null,
  active?: boolean,
): State

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_EQUALITY_FN:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 @example Plain usage
 * ```typescript
 * const counter = useStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @example Custom equality checking
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * })
 * ```
 * @example Custom equality checking (+ temporarily pause component update)
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * }, false)
 * ```
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
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 @example Plain usage
 * ```typescript
 * const counter = useStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @example Custom equality checking
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * })
 * ```
 * @example Custom equality checking (+ temporarily pause component update)
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * }, false)
 * ```
 * @public
 */
export function useStateValue<State, SelectedState>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> | SimpleFiniteStateManager<State> | ReadOnlyStateManager<State>,
  selector?: StateSelector<State, SelectedState>,
  active?: boolean,
): SelectedState

/**
 * {:TSDOC_DESC_USE_STATE_VALUE:}
 * @see -{:DOCS_API_REACT_URL:}/useStateValue
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER:}
 * @param selector - {:TSDOC_PARAM_DESC_SELECTOR:}
 * @param equalityFn - {:TSDOC_PARAM_DESC_FULL_EQUALITY_FN:}
 * @param active - {:TSDOC_PARAM_DESC_FULL_ACTIVE:}
 * @returns -{:COMMON_DESC_CURRENT_STATE:}
 @example Plain usage
 * ```typescript
 * const counter = useStateValue(CounterState)
 * ```
 * @example With selector
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0)
 * ```
 * @example Temporarily pause component update due to state change
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, null, false)
 * ```
 * @example Temporarily pause component update due to state change (with selector)
 * ```typescript
 * const counterIsEven = useStateValue(CounterState, (c) => c % 2 === 0, false)
 * ```
 * @example Custom equality checking
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * })
 * ```
 * @example Custom equality checking (+ temporarily pause component update)
 * ```typescript
 * const user = useStateValue(UserState, null, (prevUser, nextUser) => {
 *   return prevUser.firstName === nextUser.firstName &&
 *     prevUser.lastName === nextUser.lastName
 * }, false)
 * ```
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
  ...optionalArgs: [
    activeOrEqualityFn?: boolean | EqualityFn<State | SelectedState>,
    $active?: boolean,
  ]
): State | SelectedState {

  if (!IS_RN_BUILD) {
    // NOTE: `BUILD_TYPE` is a compile-time constant.
    // This conditional invocation will become static after compilation.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    stateManager = useResolveHydrationStateManager(
      stateManager as StateManager<State> | AsyncStateManager<State>
    )
  }

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
  const isEqualRef = useRef<EqualityFn<State | SelectedState>>(null!)
  isEqualRef.current = isEqual

  const selectValue = useCallback(() => {
    const fullStateSnapshot = stateManager.get(1) as State
    if (selectorRef.current) {
      return selectorRef.current(fullStateSnapshot)
    } else {
      return fullStateSnapshot
    }
  }, [stateManager])

  const cachedValue = useRef<State | SelectedState>(null)
  const getSnapshot = useCallback((): State | SelectedState => {
    if (
      isNull(cachedValue.current) ||
      !isEqualRef.current(cachedValue.current, selectValue())
    ) {
      cachedValue.current = selectValue()
    }
    return cachedValue.current!
  }, [selectValue])

  const stateValue = useSyncExternalStore(
    active ? stateManager.watch : emptyWatcher,
    getSnapshot,
    getSnapshot,
  )
  return stateValue

}
