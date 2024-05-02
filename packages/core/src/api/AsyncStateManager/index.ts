import { AsyncSetStateFn, StateManagerType } from '../../abstractions'
import { isFunction } from '../../internals/type-checker'
import { StateManager, StateManagerInitArgs, StateManagerOptions } from '../StateManager'
import {
  getErrorMessageForOverlappingInits,
  getErrorMessageForRepeatedInitCommits,
  getErrorMessageForSetOrResetDuringInitialization,
} from '../StateManager/internals'

enum InternalQueueType {
  /**  Init */ I,
  /**   Set */ S,
  /** Reset */ R,
  /**  None */ X,
}

/**
 * {:TSDOC_DESC_ASYNC_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager
 * @public
 */
export class AsyncStateManager<State> extends StateManager<State>  {

  /**
   * @internal
   */
  readonly type: StateManagerType = 3

  /**
   * @internal
   */
  protected readonly M$mutationQueue: Array<() => void | Promise<void>> = []

  /**
   * {:COMMON_DESC_DEFAULT_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#defaultState
   */
  readonly defaultState: State

  /**
   * {:TSDOC_DESC_OPTIONS_NAME:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#name
   */
  readonly name: string | undefined

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
    // This is just so that TS docs show the information of this class
    // instead of the inherited class... (eye roll)
  }

  /**
   * @internal
   */
  protected M$internalQueue = async (
    newStateOrFn: State | AsyncSetStateFn<State>,
    type: InternalQueueType
  ): Promise<void> => {

    if (type !== InternalQueueType.I && this.isInitializing.get()) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(getErrorMessageForSetOrResetDuringInitialization(this.name))
      }
      return // Early exit
    }
    const mutationQueueIsEmptyAtInvocationTime = this.M$mutationQueue.length <= 0
    this.M$mutationQueue.push(async () => {
      if (type === InternalQueueType.X) {
        // We don't want to do anything if the type is `X`, think of this as
        // taking a number for queue only.
        return // Early exit
      }
      const previousState = this.M$internalState
      this.M$internalState = isFunction(newStateOrFn)
        ? await newStateOrFn(this.M$internalState, this.defaultState)
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
      } else {
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
      commit: async (state: State) => {
        if (alreadyCommitted) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(getErrorMessageForRepeatedInitCommits(this.name, 'commit'))
          }
          return // Early exit
        }
        await this.M$internalQueue(state, InternalQueueType.I)
        this.isInitializing.set(false)
        alreadyCommitted = true
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
        this.M$internalQueue(null, InternalQueueType.X).then(() => {
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
    await this.M$internalQueue(newStateOrFn, InternalQueueType.S)
  }

  /**
   * {:TSDOC_METHOD_DESC_RESET:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#reset
   * @returns -{:RETURN_DESC_RESET_ASYNC:}
   */
  async reset(): Promise<void> {
    await this.M$internalQueue(this.defaultState, InternalQueueType.R)
  }

  // KIV: [Low priority] `wait` method is not implemented here and it seems like TS docs will fallback to the one from parent class, but we really don't need that extra complexity of creating a wrapper function around the parent class method... :facepalm:

  /**
   * {:TSDOC_METHOD_DESC_DISPOSE:}
   * @see -{:DOCS_API_CORE_URL:}/AsyncStateManager#dispose
   * @returns -{:RETURN_DESC_DISPOSE_ASYNC:}
   */
  async dispose(): Promise<void> {
    await this.M$internalQueue(null, InternalQueueType.X)
    super.dispose()
  }

}
