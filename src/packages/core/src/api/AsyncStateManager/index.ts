import { isFunction, isNull } from '@glyph-cat/type-checking'
import { AsyncSetStateFn, CommitStrategy, StateChangeEventType } from '../../abstractions'
import { COMMIT_STRATEGY_COMMIT, COMMIT_STRATEGY_COMMIT_NOOP } from '../../constants'
import { SimpleStateManager } from '../SimpleStateManager'
import { StateManager, StateManagerInitArgs, StateManagerOptions } from '../StateManager'
import {
  getErrorMessageForOverlappingInits,
  getErrorMessageForRepeatedInitCommits,
  getErrorMessageForSetOrResetDuringInitialization,
} from '../StateManager/internals'

const FILLER_STATE_CHANGE_EVENT_TYPE = null

/**
 * {:TSDOC_DESC_ASYNC_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager
 * @public
 */
export class AsyncStateManager<State> extends StateManager<State> {

  /**
   * @internal
   */
  protected readonly M$mutationQueue: Array<() => void | Promise<void>> = []

  /**
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   */
  constructor(
    defaultState: State,
    options?: StateManagerOptions<State>,
  ) {
    super(defaultState, options)
    this.getSync = this.getSync.bind(this)
    // KIV: Probably no binding required:
    // this.internalClone = this.internalClone.bind(this)
  }

  /**
   * @internal
   */
  protected override async M$internalQueue(
    newStateOrFn: State | AsyncSetStateFn<State> | null,
    eventType: StateChangeEventType | typeof FILLER_STATE_CHANGE_EVENT_TYPE
  ): Promise<void> {

    if (
      eventType !== StateChangeEventType.I &&
      !Object.is(eventType, FILLER_STATE_CHANGE_EVENT_TYPE) &&
      this.isInitializing.get()
    ) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(getErrorMessageForSetOrResetDuringInitialization(this.name))
      }
      return // Early exit
    }
    const mutationQueueIsEmptyAtInvocationTime = this.M$mutationQueue.length <= 0
    this.M$mutationQueue.push(async () => {
      if (isNull(eventType)) {
        // We don't want to do anything if the type is `X`, think of this as
        // taking a number for queue only.
        return // Early exit
      }
      const previousState = this.M$internalState
      this.M$internalState = isFunction(newStateOrFn)
        ? await newStateOrFn(this.M$internalState, this.defaultState)
        : newStateOrFn as State
      this.M$post(this.M$internalState)
      // #region Post-handling: lifecycle hooks
      if (eventType === StateChangeEventType.S) {
        if (this.M$lifecycle.didSet) {
          this.M$lifecycle.didSet({
            state: this.M$internalState,
            defaultState: this.defaultState,
            previousState,
          })
        }
      } else if (eventType === StateChangeEventType.R) {
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
        await this.M$mutationQueue[0]()
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
    return new AsyncStateManager<State>(this.defaultState, {
      lifecycle: this.M$lifecycle,
      visibility: this.visibility,
      suspense: this.suspense,
      name: this.name && `${this.name}_cloned`,
    })
  }

  /**
   * {:TSDOC_METHOD_DESC_INIT:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#init
   * @param initFn - {:TSDOC_PARAM_DESC_INIT_FN:}
   * @returns -{:RETURN_DESC_INIT:}
   * @example
   * ```typescript
   * await CounterState.init(async ({ commit, commitNoop }) => {
   *   try {
   *     const counter = await fetch('/counter')
   *     commit(parsedData)
   *     return // Early exit
   *   } catch (error) {
   *     console.error('Failed to get counter', error)
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
      commit: async (state: State) => {
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
        await this.M$internalQueue(state, StateChangeEventType.I);
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = COMMIT_STRATEGY_COMMIT
      },
    })
    await this.isInitializing.wait(false)
  }

  /**
   * {:TSDOC_METHOD_DESC_GET_ASYNC:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#get
   * @returns -{:RETURN_DESC_GET_ASYNC:}
   * @example
   * ```typescript
   * const currentCount = await CounterState.get()
   * ```
   */
  get(): Promise<State>

  /**
   * @param flag - Use this flag to force-return the state synchronously.
   * @internal
   */
  get(flag?: 1): State

  get(flag?: 1): State | Promise<State> {
    if (flag) {
      return this.M$internalState
    } else {
      return new Promise<State>((resolve, reject) => {
        this.M$internalQueue(null, FILLER_STATE_CHANGE_EVENT_TYPE).then(() => {
          resolve(this.M$internalState)
        }).catch(reject)
      })
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_GET_SYNC:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#getSync
   * @returns -{:RETURN_DESC_GET:}
   * @example
   * ```typescript
   * const currentCount = CounterState.getSync()
   * ```
   */
  getSync(): State {
    return this.M$internalState
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#set
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @returns -{:RETURN_DESC_SET_ASYNC:}
   * @example Set state by value
   * ```typescript
   * await CounterState.set(42)
   * ```
   */
  set(newState: State): Promise<void>

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#set
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @returns -{:RETURN_DESC_SET_ASYNC:}
   * @example Set state by function
   * ```typescript
   * // `await` is required because the method returns a promise,
   * // even if set function is synchronous.
   * await CounterState.set((prevCounter) => prevCounter + 1)
   * ```
   */
  set(setStateFn: AsyncSetStateFn<State>): Promise<void>

  async set(newStateOrFn: State | AsyncSetStateFn<State>): Promise<void> {
    await this.M$internalQueue(newStateOrFn, StateChangeEventType.S)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#reset
   * @returns -{:RETURN_DESC_RESET_ASYNC:}
   * @example
   * ```typescript
   * await CounterState.reset()
   * ```
   */
  async reset(): Promise<void> {
    await this.M$internalQueue(this.defaultState, StateChangeEventType.R)
  }

  // NOTE: `wait` method is not implemented here but it seems like TS docs will
  // fallback to the one from parent class, but we really don't need that extra
  // layer of complexity of creating a wrapper function around the parent class
  // method... :facepalm:

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE_STATE_MANAGER:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE_ASYNC:}
   * @example
   * ```typescript
   * await CounterState.dispose()
   * ```
   */
  async dispose(): Promise<void> {
    await this.M$internalQueue(null, FILLER_STATE_CHANGE_EVENT_TYPE)
    super.dispose()
  }

}
