import { isNull, isNullOrUndefined, isNumber } from '../../internals/type-checking'

/**
 * {:TSDOC_DESC_WATCHER:}
 * @public
 */
export class Watcher<Args extends any[]> {

  /**
   * @internal
   */
  private M$isDisposed = false

  /**
   * @internal
   */
  private M$watcherCollection: Record<number, ((...args: Args) => void)> = {}

  /**
   * @internal
   */
  private M$incrementalWatchId = 0

  constructor() {
    this.watch = this.watch.bind(this)
    this.refresh = this.refresh.bind(this)
    this.unwatchAll = this.unwatchAll.bind(this)
    this.dispose = this.dispose.bind(this)
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCHER_WATCH:}
   * @see -{:DOCS_API_CORE_URL:}/Watcher#watch
   * @returns -{:RETURN_DESC_WATCH:}
   */
  watch(callback: ((...args: Args) => void)): (() => void) {
    const newId = ++this.M$incrementalWatchId
    this.M$watcherCollection[newId] = callback
    return () => { delete this.M$watcherCollection[newId] }
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCHER_REFRESH:}
   * @see -{:DOCS_API_CORE_URL:}/Watcher#refresh
   * @returns -{:RETURN_DESC_REFRESH:}
   */
  refresh(...args: Args): void {
    if (this.M$isDisposed) { return } // Early exit
    const callbackStack = Object.values(this.M$watcherCollection)
    for (let i = 0; i < callbackStack.length; i++) {
      callbackStack[i](...args)
    }
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCHER_UNWATCH_ALL:}
   * @see -{:DOCS_API_CORE_URL:}/Watcher#unwatchAll
   * @returns -{:RETURN_DESC_UNWATCH_ALL:}
   */
  unwatchAll(): void {
    this.M$watcherCollection = {}
  }

  /**
   * {:TSDOC_METHOD_DESC_WATCHER_DISPOSE:}
   * @see -{:DOCS_API_CORE_URL:}/Watcher#dispose
   * @returns -{:RETURN_DESC_DISPOSE:}
   */
  dispose(): void {
    this.M$isDisposed = true
    this.unwatchAll()
  }

}

// TODO: Define 'TSDOC_DESC_BATCHED_WATCHER'

/**
 * {:TSDOC_DESC_BATCHED_WATCHER:}
 * @alpha
 */
export class BatchedWatcher<Value> {

  /**
   * @internal
   */
  private M$isDisposed = false

  /**
   * @internal
   */
  private M$watcherCollection: Record<number, (argsList: Array<Value>) => void> = {}

  /**
   * @internal
   */
  private M$incrementalWatchId = 0

  /**
   * @internal
   */
  private M$accumulatedValues: Array<Value> = []

  /**
   * @internal
   */
  private M$timeoutRef: ReturnType<typeof setTimeout> = null

  /**
   * @internal
   */
  private M$intervalRef: ReturnType<typeof setInterval> = null

  constructor(
    public readonly minimumTimeout?: number,
    public readonly maximumTimeout?: number,
  ) {
    if (isNullOrUndefined(this.minimumTimeout)) {
      this.minimumTimeout = 10
    } else {
      if (process.env.NODE_ENV !== 'production') {
        if (this.minimumTimeout < 0) {
          // eslint-disable-next-line no-console
          console.warn(`Expected minimum timeout to be >= 0 but got ${this.minimumTimeout}`)
        }
      }
      this.minimumTimeout = Math.max(0, this.minimumTimeout)
    }
    if (!isNullOrUndefined(this.maximumTimeout)) {
      if (process.env.NODE_ENV !== 'production') {
        if (this.maximumTimeout < this.minimumTimeout) {
          // eslint-disable-next-line no-console
          console.warn(`Maximum timeout (${this.maximumTimeout}) cannot be less than minimum timeout (${this.minimumTimeout})`)
        }
      }
      this.maximumTimeout = Math.max(this.minimumTimeout, this.maximumTimeout)
    }
    this.M$flush = this.M$flush.bind(this)
    this.watch = this.watch.bind(this)
    this.refresh = this.refresh.bind(this)
    this.unwatchAll = this.unwatchAll.bind(this)
    this.dispose = this.dispose.bind(this)
  }

  /**
   * @internal
   */
  private M$stopTimeout(): void {
    clearTimeout(this.M$timeoutRef)
    this.M$timeoutRef = null
  }

  /**
   * @internal
   */
  private M$stopInterval(): void {
    clearInterval(this.M$intervalRef)
    this.M$intervalRef = null
  }

  /**
   * @internal
   */
  private M$flush(): void {
    const accumulatedValues = [...this.M$accumulatedValues]
    this.M$accumulatedValues = []
    const callbackStack = Object.values(this.M$watcherCollection)
    for (let i = 0; i < callbackStack.length; i++) {
      callbackStack[i](accumulatedValues)
    }
  }

  refresh(value: Value): void {
    if (this.M$isDisposed) { return } // Early exit
    this.M$accumulatedValues.push(value)
    this.M$stopTimeout()
    this.M$timeoutRef = setTimeout(this.M$flush, this.minimumTimeout)
    if (isNumber(this.maximumTimeout)) {
      if (isNull(this.M$intervalRef)) {
        this.M$intervalRef = setInterval(() => {
          if (this.M$accumulatedValues.length > 0) {
            this.M$flush()
          } else {
            this.M$stopInterval()
          }
        }, this.maximumTimeout)
      }
    }
  }

  watch(callback: (accumulatedValues: Array<Value>) => void): () => void {
    const newId = ++this.M$incrementalWatchId
    this.M$watcherCollection[newId] = callback
    return () => { delete this.M$watcherCollection[newId] }
  }

  unwatchAll(): void {
    this.M$watcherCollection = {}
  }

  dispose(): void {
    this.M$isDisposed = true
    this.unwatchAll()
  }

}
