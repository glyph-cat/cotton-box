import { isNull, isNullOrUndefined, isNumber } from '../../internals/type-checking'

// TODO: Define 'TSDOC_DESC_BATCHED_WATCHER'
// TODO: Docs for BatchedWatcher

/**
 * {:TSDOC_DESC_BATCHED_WATCHER:}
 * @alpha
 */
export class BatchedWatcher<Args extends any[]> {

  /**
   * @internal
   */
  private M$isDisposed = false

  /**
   * @internal
   */
  private M$watcherCollection: Record<number, (argsList: Array<Args>) => void> = {}

  /**
   * @internal
   */
  private M$incrementalWatchId = 0

  /**
   * @internal
   */
  private M$accumulatedValues: Array<Args> = []

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
    this.post = this.post.bind(this)
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

  post(...value: Args): void {
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

  watch(callback: (accumulatedValues: Array<Args>) => void): () => void {
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
