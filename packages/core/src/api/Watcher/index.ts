// TODO: Doc variables

/**
 * Creates a Watcher.
 * @example
 * const watcher = new Watcher()
 * const unwatch = watcher.watch(() => { ... })
 * watcher.refresh(...) // Arguments can be passed
 * unwatch()
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
  private M$watcherCollection: Record<number, CallableFunction> = {}

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
   * Accepts a callback and start watching for changes. The callback will be
   * invoked whenever a refresh is triggered.
   */
  watch(callback: ((...args: Args) => void)): (() => void) {
    const newId = ++this.M$incrementalWatchId
    this.M$watcherCollection[newId] = callback
    return () => { delete this.M$watcherCollection[newId] }
  }

  /**
   * Triggers a refresh.
   */
  refresh(...args: Args): void {
    if (this.M$isDisposed) { return } // Early exit
    const callbackStack = Object.values(this.M$watcherCollection)
    for (let i = 0; i < callbackStack.length; i++) {
      callbackStack[i](...args)
    }
  }

  /**
   * Forcefully remove all watchers.
   */
  unwatchAll(): void {
    this.M$watcherCollection = {}
  }

  /**
   * Removes all watchers and prevent new ones from being added.
   */
  dispose(): void {
    this.M$isDisposed = true
    this.unwatchAll()
  }

}
