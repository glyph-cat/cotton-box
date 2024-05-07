import { SetStateFn, WaitEvaluator } from '../../abstractions'
import { isFunction } from '../../internals/type-checker'
import { SimpleStateManager, SimpleStateManagerOptions } from '../SimpleStateManager'
import {
  getErrorMessageForOverlappingInits,
  getErrorMessageForRepeatedInitCommits,
  getErrorMessageForSetOrResetDuringInitialization,
} from './internals'

enum InternalQueueType {
  /**  Init */ I,
  /**   Set */ S,
  /** Reset */ R,
}

/**
 * {:TSDOC_DESC_STATE_MANAGER_INIT_ARGS:}
 * @see -{:DOCS_API_CORE_URL:}/StateManagerInitArgs
 * @public
 */
export interface StateManagerInitArgs<State> {
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
export interface StateManagerOptions<State> extends SimpleStateManagerOptions<State> {
  /**
   * {:TSDOC_DESC_OPTIONS_LIFECYCLE:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_LIFECYCLE:}
   */
  readonly lifecycle?: StateManagerLifecycle<State>
  /**
   * {:TSDOC_DESC_OPTIONS_VISIBILITY:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_VISIBILITY:}
   */
  readonly visibility?: StateManagerVisibility
  /**
   * {:TSDOC_DESC_OPTIONS_SUSPENSE:}
   * @defaultValue {:DEFAULT_VALUE_OPTIONS_SUSPENSE:}
   */
  readonly suspense?: boolean
}

/**
 * @public
 */
export class StateManager<State> extends SimpleStateManager<State> {

  // @ts-expect-error Forceful override
  // This allows TS to show an error when `useSimpleStateValue` with any
  // State Manager type other than `SimpleStateManager`.
  readonly type = 'StateManager'

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
   */
  readonly isInitializing = new SimpleStateManager(false)

  /**
   * @internal
   */
  readonly visibility: StateManagerOptions<State>['visibility']

  /**
   * @internal
   */
  readonly suspense: StateManagerOptions<State>['suspense']

  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#defaultState
   */
  readonly defaultState: State

  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#name
   */
  readonly name: string | undefined

  /**
   * {:TSDOC_DESC_STATE_MANAGER:}
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager
   */
  constructor(
    defaultState: State,
    options: StateManagerOptions<State> = {},
  ) {
    const { lifecycle, suspense, visibility, ...otherOptions } = options
    super(defaultState, otherOptions)
    this.suspense = suspense ?? false
    this.visibility = visibility ?? StateManagerVisibility.ENVIRONMENT
    this.M$lifecycle = { ...lifecycle }
    this.init = this.init.bind(this)
    if (this.M$lifecycle.init) {
      this.init(this.M$lifecycle.init)
    }
  }

  /**
   * @internal
   */
  M$internalQueue = (
    newStateOrFn: State | SetStateFn<State>,
    type: InternalQueueType
  ): void => {
    if (type !== InternalQueueType.I && this.isInitializing.get()) {
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
      this.M$watcher.M$refresh(this.M$internalState)
      // #region Post-handling: lifecycle hooks
      if (type === InternalQueueType.S) {
        if (this.M$lifecycle.didSet) {
          this.M$lifecycle.didSet({
            state: this.M$internalState,
            defaultState: this.defaultState,
            previousState,
          })
        }
      } else if (type === InternalQueueType.R) {
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
   * {:TSDOC_METHOD_DESC_INIT:}
   * @param initFn - {:TSDOC_PARAM_DESC_INIT_FN:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#init
   * @returns -{:RETURN_DESC_INIT:}
   */
  async init(initFn: (args: StateManagerInitArgs<State>) => void | Promise<void>): Promise<void> {
    if (this.isInitializing.get()) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(getErrorMessageForOverlappingInits(this.name))
      }
    }
    let alreadyCommitted = false
    this.isInitializing.set(true)
    await initFn({
      defaultState: this.defaultState,
      commitNoop: () => {
        if (alreadyCommitted) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(this.name, 'commitNoop'))
          }
          return // Early exit
        }
        this.isInitializing.set(false)
        alreadyCommitted = true
      },
      commit: (state: State) => {
        if (alreadyCommitted) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(this.name, 'commit'))
          }
          return // Early exit
        }
        this.M$internalQueue(state, InternalQueueType.I)
        this.isInitializing.set(false)
        alreadyCommitted = true
      },
    })
    await this.isInitializing.wait(false)
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
    this.M$internalQueue(newStateOrFn, InternalQueueType.S)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#reset
   * @returns -{:RETURN_DESC_RESET:}
   */
  reset(): void {
    this.M$internalQueue(this.defaultState, InternalQueueType.R)
  }

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_VALUE:}
   * @param expectedValue - {:TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#wait
   * @returns -{:RETURN_DESC_WAIT_BY_VALUE:}
   */
  wait(expectedValue: State): Promise<State>

  /**
   * {:TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR:}
   * @param evaluator - {:TSDOC_PARAM_DESC_WAIT_EVALUATOR:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#wait
   * @returns -{:RETURN_DESC_WAIT_BY_EVALUATOR:}
   */
  wait(evaluator: WaitEvaluator<State>): Promise<State>

  async wait(valueOrEvaluator: State | WaitEvaluator<State>): Promise<State> {
    if (this.isInitializing.get()) {
      await this.isInitializing.wait(false)
    }
    return await super.wait(valueOrEvaluator)
  }

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   */
  dispose(): void {
    this.isInitializing.dispose()
    super.dispose()
  }

}
