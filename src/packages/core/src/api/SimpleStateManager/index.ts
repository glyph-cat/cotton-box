import { IDisposable, Optional } from '@glyph-cat/foundation'
import { isFunction } from '@glyph-cat/type-checking'
import { SetStateFn, WaitEvaluator } from '../../abstractions'

const __emptyFunction = () => { /* do nothing */ }

/**
 * {:TSDOC_DESC_OPTIONS_SIMPLE:}
 * @see -{:DOCS_API_CORE_URL:}/SimpleStateManagerOptions
 * @public
 */
export interface SimpleStateManagerOptions {
  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_NAME:}
   */
  readonly name?: Optional<string>
}

/**
 * {:TSDOC_DESC_SIMPLE_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager
 * @public
 */
export class SimpleStateManager<State> implements IDisposable {

  /**
   * @internal
   */
  private M$isDisposed = false

  /**
   * @internal
   */
  private M$watcherHandlers = new Set<(state: State) => void>()

  /**
   * @internal
   */
  protected M$internalState: State

  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#defaultState
   */
  readonly defaultState: State

  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#name
   */
  readonly name?: Optional<string>

  /**
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   */
  constructor(
    defaultState: State,
    options?: SimpleStateManagerOptions,
  ) {
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.reset = this.reset.bind(this)
    this.watch = this.watch.bind(this)
    this.unwatchAll = this.unwatchAll.bind(this)
    this.wait = this.wait.bind(this)
    this.dispose = this.dispose.bind(this)
    this.defaultState = defaultState
    this.M$internalState = this.defaultState
    this.name = options?.name
  }

  /**
   * {:TSDOC_METHOD_DESC_GET:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#get
   * @returns -{:RETURN_DESC_GET:}
   * @example
   * ```typescript
   * const currentCount = CounterState.get()
   * ```
   */
  get(): State {
    return this.M$internalState
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#set
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @returns -{:RETURN_DESC_SET:}
   * @example Set state by value
   * ```typescript
   * CounterState.set(42)
   * ```
   */
  set(newState: State): void

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#set
   * @returns -{:RETURN_DESC_SET:}
   * @example Set state by function
   * ```typescript
   * CounterState.set((prevCounter) => prevCounter + 1)
   * ```
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    this.M$internalState = isFunction(newStateOrFn)
      ? newStateOrFn(this.M$internalState, this.defaultState)
      : newStateOrFn
    this.M$post(this.M$internalState)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#reset
   * @returns -{:RETURN_DESC_RESET:}
   * @example
   * ```typescript
   * CounterState.reset()
   * ```
   */
  reset(): void {
    this.M$internalState = this.defaultState
    this.M$post(this.M$internalState)
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCH:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#watch
   * @param callback - {:TSDOC_PARAM_DESC_WATCH_CALLBACK:}
   * @returns -{:RETURN_DESC_WATCH:}
   * @example
   * ```typescript
   * CounterState.watch((currentCount) => {
   *   console.log(`Current count: ${currentCount}`)
   * })
   * ```
   */
  watch(callback: (state: State) => void): () => void {
    if (this.M$isDisposed) { return __emptyFunction } // Early exit
    this.M$watcherHandlers.add(callback)
    return () => { this.M$watcherHandlers.delete(callback) }
  }

  /**
   * {:TSDOC_METHOD_DESC_UNWATCH_ALL:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#unwatchAll
   * @returns -{:RETURN_DESC_UNWATCH_ALL:}
   * @example
   * ```typescript
   * CounterState.unwatchAll()
   * ```
   */
  unwatchAll(): void {
    this.M$watcherHandlers.clear()
  }

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#wait
   * @param expectedValue - {:TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE:}
   * @returns -{:RETURN_DESC_WAIT_BY_VALUE:}
   * @example Wait for an exact value
   * ```typescript
   * CounterState.wait(43)
   * ```
   */
  wait(expectedValue: State): Promise<State>

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#wait
   * @param evaluator - {:TSDOC_PARAM_DESC_WAIT_EVALUATOR:}
   * @returns -{:RETURN_DESC_WAIT_BY_EVALUATOR:}
   * @example Wait for a condition to be fulfilled
   * ```typescript
   * // Wait for counter value to be an even number
   * CounterState.wait((currentCount) => currentCount % 2 === 0)
   * ```
   */
  wait(evaluator: WaitEvaluator<State>): Promise<State>

  /**
   * @privateRemarks
   * This is so that when `valueOrEvaluator` is passed to `super.wait` in child
   * classes, TypeScript understands that `valueOrEvaluator` can be either
   * type and won't raise errors.
   * @internal
   */
  wait(valueOrEvaluator: State | WaitEvaluator<State>): Promise<State>

  wait(valueOrEvaluator: State | WaitEvaluator<State>): Promise<State> {
    const fulfillsCondition = ($state: State) => isFunction(valueOrEvaluator)
      ? valueOrEvaluator($state, this.defaultState)
      : Object.is(valueOrEvaluator, $state)
    if (fulfillsCondition(this.M$internalState)) {
      return Promise.resolve(this.M$internalState)
    } else {
      return new Promise((resolve) => {
        const unwatch = this.watch((state) => {
          if (fulfillsCondition(state)) {
            unwatch()
            resolve(state)
          }
        })
      })
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE_STATE_MANAGER:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   * @example
   * ```typescript
   * CounterState.dispose()
   * ```
   */
  dispose(): void {
    this.M$isDisposed = true
    this.unwatchAll()
  }

  /**
   * Calls all watch handlers with the new state.
   * @param state - The new state
   * @example
   * ```typescript
   * this.M$post(this.M$internalState)
   * ```
   * @internal
   */
  protected M$post(state: State): void {
    this.M$watcherHandlers.forEach((callback) => {
      callback(state)
    })
  }

}
