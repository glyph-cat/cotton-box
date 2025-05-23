import { AsyncSetStateFn, CommitStrategy, StateChangeEventType } from '../../abstractions'
import { isFunction, isNull } from '../../internals/type-checking'
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

  // @ts-expect-error Forceful override
  // This allows TS to show an error when `useSimpleStateValue` with any
  // State Manager type other than `SimpleStateManager`.
  readonly type = 'AsyncStateManager'

  /**
   * @internal
   */
  protected readonly M$mutationQueue: Array<() => void | Promise<void>> = []

  /**
   * {:TSDOC_DESC_ASYNC_STATE_MANAGER:}
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager
   */
  constructor(
    defaultState: State,
    options: StateManagerOptions<State> = {},
  ) {
    super(defaultState, options)
    this.getSync = this.getSync.bind(this)
    this.internalClone = this.internalClone.bind(this)
  }

  /**
   * @internal
   */
  private async M$internalQueue(
    newStateOrFn: State | AsyncSetStateFn<State> | null,
    eventType: StateChangeEventType | typeof FILLER_STATE_CHANGE_EVENT_TYPE
  ): Promise<void> {

    if (
      eventType !== StateChangeEventType.INIT &&
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
      this.M$watcher.post(this.M$internalState, eventType)
      // #region Post-handling: lifecycle hooks
      if (eventType === StateChangeEventType.SET) {
        if (this.M$lifecycle.didSet) {
          this.M$lifecycle.didSet({
            state: this.M$internalState,
            defaultState: this.defaultState,
            previousState,
          })
        }
      } else if (eventType === StateChangeEventType.RESET) {
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
   * @internal
   */
  internalClone(): StateManager<State> | AsyncStateManager<State> {
    return new AsyncStateManager<State>(this.defaultState, {
      lifecycle: this.M$lifecycle,
      visibility: this.visibility,
      suspense: this.suspense,
      clientOnly: this.clientOnly,
      name: `${this.name}_clone`,
    })
  }

  /**
   * {:TSDOC_METHOD_DESC_INIT:}
   * @param initFn - {:TSDOC_PARAM_DESC_INIT_FN:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#init
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
      commit: async (state: State) => {
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
        await this.M$internalQueue(state, StateChangeEventType.INIT);
        (this.isInitializing as SimpleStateManager<boolean>).set(false)
        effectiveCommitStrategy = 'commit'
      },
    })
    await this.isInitializing.wait(false)
  }

  /**
   * {:TSDOC_METHOD_DESC_GET_ASYNC:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#get
   * @returns -{:RETURN_DESC_GET_ASYNC:}
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
   */
  getSync(): State {
    return this.M$internalState
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#set
   * @returns -{:RETURN_DESC_SET_ASYNC:}
   */
  set(newState: State): Promise<void>

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#set
   * @returns -{:RETURN_DESC_SET_ASYNC:}
   */
  set(setStateFn: AsyncSetStateFn<State>): Promise<void>

  async set(newStateOrFn: State | AsyncSetStateFn<State>): Promise<void> {
    await this.M$internalQueue(newStateOrFn, StateChangeEventType.SET)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#reset
   * @returns -{:RETURN_DESC_RESET_ASYNC:}
   */
  async reset(): Promise<void> {
    await this.M$internalQueue(this.defaultState, StateChangeEventType.RESET)
  }

  // NOTE: `wait` method is not implemented here but it seems like TS docs will
  // fallback to the one from parent class, but we really don't need that extra
  // layer of complexity of creating a wrapper function around the parent class
  // method... :facepalm:

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE_STATE_MANAGER:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE_ASYNC:}
   */
  async dispose(): Promise<void> {
    await this.M$internalQueue(null, FILLER_STATE_CHANGE_EVENT_TYPE)
    super.dispose()
  }

}
