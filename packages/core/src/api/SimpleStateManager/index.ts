import { SetStateFn, StateChangeEventType, WaitEvaluator } from '../../abstractions'
import { getAutomaticName } from '../../internals/name-generator'
import { isFunction } from '../../internals/type-checking'
import { Watcher } from '../Watcher'

/**
 * Unique runtime identifier for scoped State Managers.
 */
let scopeIdCounter = 0

/**
 * {:TSDOC_DESC_OPTIONS_SIMPLE:}
 * @see -{:DOCS_API_CORE_URL:}/SimpleStateManagerOptions
 * @public
 */
export interface SimpleStateManagerOptions<State> {
  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_NAME:}
   */
  readonly name?: string
  /**
   * {:TSDOC_DESC_OPTIONS_CLIENT_ONLY:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_CLIENT_ONLY:}
   */
  readonly clientOnly?: boolean
  /**
   * {:TSDOC_DESC_OPTIONS_SCOPE:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_SCOPE:}
   * @see -{:DOCS_LEARN_REACT_URL:}/scope
   */
  readonly scope?: SimpleStateManager<State>
}

/**
 * @public
 */
export class SimpleStateManager<State> {

  readonly type = 'SimpleStateManager'

  /**
   * @internal
   */
  protected readonly M$watcher = new Watcher<[State, StateChangeEventType]>()

  /**
   * @internal
   */
  protected M$internalState: State

  /**
   * @internal
   */
  readonly scopeId: number

  /**
   * @internal
   */
  readonly clientOnly: boolean

  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#defaultState
   */
  readonly defaultState: Readonly<State>

  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#name
   */
  readonly name: string

  /**
   * {:TSDOC_DESC_SIMPLE_STATE_MANAGER:}
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager
   */
  constructor(
    defaultState: State,
    options: SimpleStateManagerOptions<State> = {},
  ) {
    const { clientOnly, name, scope } = options
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.reset = this.reset.bind(this)
    this.watch = this.watch.bind(this)
    this.unwatchAll = this.unwatchAll.bind(this)
    this.wait = this.wait.bind(this)
    this.dispose = this.dispose.bind(this)
    this.defaultState = defaultState
    this.M$internalState = this.defaultState
    this.name = (name && name !== '') ? name : getAutomaticName()
    this.clientOnly = clientOnly ?? false
    this.scopeId = scope?.scopeId ?? ++scopeIdCounter
  }

  /**
   * {:TSDOC_METHOD_DESC_GET:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#get
   * @returns -{:RETURN_DESC_GET:}
   */
  get(): Readonly<State> {
    return this.M$internalState
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(newState: State): void

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    this.M$internalState = isFunction(newStateOrFn)
      ? newStateOrFn(this.M$internalState, this.defaultState)
      : newStateOrFn
    this.M$watcher.refresh(this.M$internalState, StateChangeEventType.SET)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#reset
   * @returns -{:RETURN_DESC_RESET:}
   */
  reset(): void {
    this.M$internalState = this.defaultState
    this.M$watcher.refresh(this.M$internalState, StateChangeEventType.RESET)
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCH:}
   * @param callback - {:TSDOC_PARAM_DESC_WATCH_CALLBACK:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#watch
   * @returns -{:RETURN_DESC_WATCH:}
   */
  watch(callback: (state: Readonly<State>, eventType: StateChangeEventType) => void): () => void {
    return this.M$watcher.watch(callback)
  }

  /**
   * {:TSDOC_METHOD_DESC_UNWATCH_ALL:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#unwatchAll
   * @returns -{:RETURN_DESC_UNWATCH_ALL:}
   */
  unwatchAll(): void {
    this.M$watcher.unwatchAll()
  }

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_VALUE:}
   * @param expectedValue - {:TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#wait
   * @returns -{:RETURN_DESC_WAIT_BY_VALUE:}
   */
  wait(expectedValue: State): Promise<State>

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR:}
   * @param evaluator - {:TSDOC_PARAM_DESC_WAIT_EVALUATOR:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#wait
   * @returns -{:RETURN_DESC_WAIT_BY_EVALUATOR:}
   */
  wait(evaluator: WaitEvaluator<State>): Promise<State>

  /**
   * This is so that when `valueOrEvaluator` is passed to `super.wait` in child
   * classes, TypeScript understands that `valueOrEvaluator` can be either
   * type and won't raise errors.
   * @internal
   */
  wait(valueOrEvaluator: State | WaitEvaluator<State>): Promise<State>

  wait(valueOrEvaluator: State | WaitEvaluator<State>): Promise<State> {
    const fulfillsCondition = ($state: State, $eventType: StateChangeEventType | null) => isFunction(valueOrEvaluator)
      ? valueOrEvaluator($state, this.defaultState, $eventType)
      : Object.is(valueOrEvaluator, $state)
    if (fulfillsCondition(this.M$internalState, null)) {
      return Promise.resolve(this.M$internalState)
    } else {
      return new Promise((resolve) => {
        const unwatch = this.M$watcher.watch((state, eventType) => {
          if (fulfillsCondition(state, eventType)) {
            unwatch()
            resolve(state)
          }
        })
      })
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   */
  dispose(): void {
    this.M$watcher.dispose()
  }

}
