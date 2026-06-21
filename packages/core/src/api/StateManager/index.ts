import { isFunction, isNumber } from '@glyph-cat/type-checking'
import {
  CommitStrategy,
  ReadOnlyStateManager,
  SetStateFn,
  StateChangeEvent,
} from '../../abstractions'
import {
  COMMIT_STRATEGY_COMMIT,
  COMMIT_STRATEGY_COMMIT_NOOP,
  IS_RN_BUILD,
  STATE_CHANGE_INIT_EVENT,
  STATE_CHANGE_RESET_EVENT,
  STATE_CHANGE_SET_EVENT,
} from '../../constants'
import { type AsyncStateManager } from '../AsyncStateManager'
import { SimpleStateManager, SimpleStateManagerOptions } from '../SimpleStateManager'
import {
  getErrorMessageForOverlappingInits,
  getErrorMessageForRepeatedInitCommits,
  getErrorMessageForSetOrResetDuringInitialization,
} from './internals'

/**
 * {:TSDOC_DESC_STATE_MANAGER_INIT_ARGS:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerInitArgs
 * @public
 */
export interface StateManagerInitArgs<State> {
  /**
   * {:COMMON_DESC_CURRENT_STATE:}
   */
  readonly currentState: State
  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   */
  readonly defaultState: State
  /**
   * {:TSDOC_DESC_INIT_COMMIT:}
   */
  commit(state: State): void
  /**
   * {:TSDOC_DESC_INIT_COMMIT_NOOP:}
   */
  commitNoop(): void
}

/**
 * {:TSDOC_DESC_STATE_MANAGER_DID_SET_ARGS:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerDidSetArgs
 * @public
 */
export interface StateManagerDidSetArgs<State> {
  /**
   * {:COMMON_DESC_CURRENT_STATE:}
   */
  readonly state: State
  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   */
  readonly defaultState: State
  /**
   * {:COMMON_DESC_PREVIOUS_STATE:}
   */
  readonly previousState: State
}

/**
 * {:TSDOC_DESC_OPTIONS_LIFECYCLE:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerLifecycle
 * @public
 */
export interface StateManagerLifecycle<State> {
  /**
   * {:TSDOC_DESC_OPTIONS_LIFECYCLE_INIT:}
   */
  init?(args: StateManagerInitArgs<State>): void | Promise<void>
  /**
   * {:TSDOC_DESC_OPTIONS_LIFECYCLE_DID_SET:}
   */
  didSet?(args: StateManagerDidSetArgs<State>): void
  /**
   * {:TSDOC_DESC_OPTIONS_LIFECYCLE_DID_RESET:}
   */
  didReset?(): void
}

/**
 * {:TSDOC_DESC_OPTIONS_VISIBILITY_DETAILED:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerVisibility
 * @public
 * @deprecated This is not a reliable way to hide sensitive values.
 * While this works for React Dev Tools, the built-in memory inspector in
 * most browsers will still be able to show the value anyway. Please consider
 * storing sensitive information on the server and only expose what's absolutely
 * necessary to the client instead.
 */
export enum StateManagerVisibility {
  /**
   * {:DESC_STATE_MANAGER_VISIBILITY_ENVIRONMENT:}
   */
  ENVIRONMENT,
  /**
   * {:DESC_STATE_MANAGER_VISIBILITY_EXPOSED:}
   */
  EXPOSED,
  /**
   * {:DESC_STATE_MANAGER_VISIBILITY_HIDDEN:}
   */
  HIDDEN,
}

/**
 * {:TSDOC_DESC_OPTIONS_STANDARD:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerOptions
 * @public
 */
export interface StateManagerOptions<State> extends SimpleStateManagerOptions {
  /**
   * {:TSDOC_DESC_OPTIONS_LIFECYCLE:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_LIFECYCLE:}
   */
  readonly lifecycle?: StateManagerLifecycle<State>
  /**
   * {:TSDOC_DESC_OPTIONS_VISIBILITY:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_VISIBILITY:}
   * @deprecated This is not a reliable way to hide sensitive values.
   * While this works for React Dev Tools, the built-in memory inspector in
   * most browsers will still be able to show the value anyway. Please consider
   * storing sensitive information on the server and only expose what's absolutely
   * necessary to the client instead.
   */
  readonly visibility?: StateManagerVisibility
  /**
   * {:TSDOC_DESC_OPTIONS_SUSPENSE:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_SUSPENSE:}
   */
  readonly suspense?: boolean
}

/**
 * {:TSDOC_DESC_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/StateManager
 * @public
 */
export class StateManager<State> extends SimpleStateManager<State> {

  /**
   * @internal
   */
  protected readonly M$lifecycle: StateManagerLifecycle<State>

  /**
   * @internal
   */
  protected readonly M$mutationQueue: Array<() => void> = []

  /**
   * @internal
   * @deprecated
   */
  readonly visibility: StateManagerOptions<State>['visibility']

  /**
   * @internal
   */
  readonly suspense: StateManagerOptions<State>['suspense']

  /**
   * {:TSDOC_DESC_IS_INITIALIZING:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#isInitializing
   */
  readonly isInitializing: ReadOnlyStateManager<boolean>

  /**
   * @see -{:DOCS_API_CORE_URL:}/StateManager
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   * @example Plain example
   * ```typescript
   * const CounterState = new StateManager(0)
   * ```
   */
  constructor(
    defaultState: State,
    options?: StateManagerOptions<State>,
  ) {
    super(defaultState, options)
    this.isInitializing = new SimpleStateManager(false, {
      name: `${this.name}_isInitializing`,
    }) as unknown as ReadOnlyStateManager<boolean>
    this.suspense = options?.suspense ?? false
    this.visibility = options?.visibility
    if (process.env.NODE_ENV !== 'production') {
      if (isNumber(this.visibility)) {
        // eslint-disable-next-line no-console
        console.error('`options.visibility` is not a reliable way to hide sensitive values. While this works for React Dev Tools, the built-in memory inspector in most browsers will still be able to show the value anyway. Please consider storing sensitive information on the server and only expose what\'s absolutely necessary to the client instead.')
      }
    }
    this.M$lifecycle = { ...options?.lifecycle }
    this.init = this.init.bind(this)
    this.reinitialize = this.reinitialize.bind(this)
    if (this.M$lifecycle.init) {
      this.init(this.M$lifecycle.init)
    }
  }

  /**
   * @internal
   */
  protected M$internalQueue(
    newStateOrFn: State | SetStateFn<State>,
    eventType: StateChangeEvent
  ): void {
    if (eventType !== STATE_CHANGE_INIT_EVENT && this.isInitializing.get()) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(getErrorMessageForSetOrResetDuringInitialization(this.name))
      }
      return // Early exit
    }
    const mutationQueueIsEmptyAtInvocationTime = this.M$mutationQueue.length <= 0
    this.M$mutationQueue.push(() => {
      const previousState = this.M$internalState
      this.M$internalState = isFunction(newStateOrFn)
        ? newStateOrFn(this.M$internalState, this.defaultState)
        : newStateOrFn
      this.M$post(this.M$internalState)
      // #region Post-handling: lifecycle hooks
      if (eventType === STATE_CHANGE_SET_EVENT) {
        if (this.M$lifecycle.didSet) {
          this.M$lifecycle.didSet({
            state: this.M$internalState,
            defaultState: this.defaultState,
            previousState,
          })
        }
      } else if (eventType === STATE_CHANGE_RESET_EVENT) {
        if (this.M$lifecycle.didReset) {
          this.M$lifecycle.didReset()
        }
      }
      // #endregion Post-handling: lifecycle hooks
    })
    if (mutationQueueIsEmptyAtInvocationTime) {
      while (this.M$mutationQueue.length > 0) {
        // We need to preserve the callback in the queue until it has finished
        // executing so that it becomes possible to check if there are any
        // pending callbacks when we need to add new ones to the queue.
        this.M$mutationQueue[0]()
        this.M$mutationQueue.shift()
      }
    }
  }

  /**
   * @privateRemarks
   * This is only used so that we can have a special instance of the state
   * manager to be populated with server-side value.
   * This method is used in conjunction with {@link internalHydrateSSR}.
   * @internal
   */
  internalClone(): StateManager<State> | AsyncStateManager<State> {
    return new StateManager<State>(this.defaultState, {
      lifecycle: this.M$lifecycle,
      visibility: this.visibility,
      suspense: this.suspense,
      name: this.name && `${this.name}_cloned`,
    })
  }

  /**
   * @privateRemarks
   * This is similar to init, except it doesn't trigger the watcher since this
   * is meant to be called in the server only.
   * @internal
   */
  internalHydrateSSR(initFn: (args: StateManagerInitArgs<State>) => void): void {
    if (IS_RN_BUILD) { return } // Early exit
    let effectiveCommitStrategy: CommitStrategy
    initFn({
      currentState: this.M$internalState,
      defaultState: this.defaultState,
      commitNoop: () => {
        if (effectiveCommitStrategy) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(
              this.name,
              COMMIT_STRATEGY_COMMIT_NOOP,
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        effectiveCommitStrategy = COMMIT_STRATEGY_COMMIT_NOOP
      },
      commit: (state: State) => {
        if (effectiveCommitStrategy) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(
              this.name,
              COMMIT_STRATEGY_COMMIT,
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        this.M$internalState = state
        effectiveCommitStrategy = COMMIT_STRATEGY_COMMIT
      },
    })
  }

  /**
   * {:TSDOC_METHOD_DESC_INIT:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#init
   * @param initFn - {:TSDOC_PARAM_DESC_INIT_FN:}
   * @returns -{:RETURN_DESC_INIT:}
   * @example
   * ```typescript
   * await CounterState.init(({ commit, commitNoop }) => {
   *   const rawData = localStorage.getItem('counter')
   *   if (rawData) {
   *   const parsedData = Number(rawData)
   *     if (typeof parsedData === 'number') {
   *       commit(parsedData)
   *       return // Early exit
   *     }
   *   }
   *   commitNoop() // Fallback: commit using default state
   * })
   * ```
   */
  async init(initFn: (args: StateManagerInitArgs<State>) => void | Promise<void>): Promise<void> {
    if (this.isInitializing.get()) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(getErrorMessageForOverlappingInits(this.name))
      }
    }
    let effectiveCommitStrategy: CommitStrategy;
    (this.isInitializing as SimpleStateManager<boolean>).set(true)
    await initFn({
      currentState: this.M$internalState,
      defaultState: this.defaultState,
      commitNoop: () => {
        if (effectiveCommitStrategy) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(
              this.name,
              COMMIT_STRATEGY_COMMIT_NOOP,
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = COMMIT_STRATEGY_COMMIT_NOOP
      },
      commit: (state: State) => {
        if (effectiveCommitStrategy) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(
              this.name,
              COMMIT_STRATEGY_COMMIT,
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        this.M$internalQueue(state, STATE_CHANGE_INIT_EVENT);
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = COMMIT_STRATEGY_COMMIT
      },
    })
    await this.isInitializing.wait(false)
  }

  /**
   * {:TSDOC_METHOD_DESC_REINITIALIZE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#reinitialize
   * @returns -{:RETURN_DESC_REINITIALIZE:}
   * @example
   * ```typescript
   * await CounterState.reinitialize()
   * ```
   */
  async reinitialize(): Promise<void> {
    if (this.M$lifecycle.init) {
      await this.init(this.M$lifecycle.init)
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#set
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
   * @see -{:DOCS_API_CORE_URL:}/StateManager#set
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @returns -{:RETURN_DESC_SET:}
   * @example Set state by function
   * ```typescript
   * CounterState.set((prevCounter) => prevCounter + 1)
   * ```
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    this.M$internalQueue(newStateOrFn, STATE_CHANGE_SET_EVENT)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#reset
   * @returns -{:RETURN_DESC_RESET:}
   * @example
   * ```typescript
   * CounterState.reset()
   * ```
   */
  reset(): void {
    this.M$internalQueue(this.defaultState, STATE_CHANGE_RESET_EVENT)
  }

  // NOTE: `wait` method is not implemented here but it seems like TS docs will
  // fallback to the one from parent class, but we really don't need that extra
  // layer of complexity of creating a wrapper function around the parent class
  // method... :facepalm:

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE_STATE_MANAGER:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   * @example
   * ```typescript
   * CounterState.dispose()
   * ```
   */
  dispose(): void {
    (this.isInitializing as SimpleStateManager<boolean>).dispose()
    super.dispose()
  }

}
