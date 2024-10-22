import { CommitStrategy, ReadOnlyStateManager, SetStateFn } from '../../abstractions'
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
  readonly name: string

  /**
   * {:TSDOC_DESC_IS_INITIALIZING:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#isInitializing
   */
  readonly isInitializing: ReadOnlyStateManager<boolean>

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
    this.isInitializing = new SimpleStateManager(false, {
      name: `${this.name} (isInitializing)`,
    }) as unknown as ReadOnlyStateManager<boolean>
    this.suspense = suspense ?? false
    this.visibility = visibility ?? StateManagerVisibility.ENVIRONMENT
    this.M$lifecycle = { ...lifecycle }
    this.init = this.init.bind(this)
    this.reinitialize = this.reinitialize.bind(this)
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
   * @see -{:DOCS_API_CORE_URL:}/StateManager#init
   * @returns -{:RETURN_DESC_INIT:}
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
              'commitNoop',
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = 'commitNoop'
      },
      commit: (state: State) => {
        if (effectiveCommitStrategy) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(
              this.name,
              'commit',
              effectiveCommitStrategy,
            ))
          }
          return // Early exit
        }
        this.M$internalQueue(state, InternalQueueType.I);
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = 'commit'
      },
    })
    await this.isInitializing.wait(false)
  }

  /**
   * {:TSDOC_METHOD_DESC_REINITIALIZE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#reinitialize
   * @returns -{:RETURN_DESC_REINITIALIZE:}
   */
  async reinitialize(): Promise<void> {
    if (this.M$lifecycle.init) {
      await this.init(this.M$lifecycle.init)
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(newState: State): void

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    this.M$internalQueue(newStateOrFn, InternalQueueType.S)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#reset
   * @returns -{:RETURN_DESC_RESET:}
   */
  reset(): void {
    this.M$internalQueue(this.defaultState, InternalQueueType.R)
  }

  // NOTE: `wait` method is not implemented here but it seems like TS docs will
  // fallback to the one from parent class, but we really don't need that extra
  // layer of complexity of creating a wrapper function around the parent class
  // method... :facepalm:

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE:}
   * @see -{:DOCS_API_CORE_URL:}/StateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   */
  dispose(): void {
    (this.isInitializing as SimpleStateManager<boolean>).dispose()
    super.dispose()
  }

}
