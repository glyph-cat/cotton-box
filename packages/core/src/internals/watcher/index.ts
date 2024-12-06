/**
 * Creates a Watcher.
 * @example
 * const watcher = new Watcher()
 * const unwatch = watcher.M$watch(() => { ... })
 * watcher.M$refresh(...) // Arguments can be passed
 * unwatch()
 */
export class Watcher<Args extends any[]> {

  private M$isDisposed = false
  private M$watcherCollection: Record<number, CallableFunction> = {}
  private M$incrementalWatchId = 0

  /**
   * Accepts a callback and start watching for changes. The callback will be
   * invoked whenever a refresh is triggered.
   */
  M$watch = (callback: ((...args: Args) => void)): (() => void) => {
    const newId = ++this.M$incrementalWatchId
    this.M$watcherCollection[newId] = callback
    return () => { delete this.M$watcherCollection[newId] }
  }

  /**
   * Triggers a refresh.
   */
  M$refresh = (...args: Args): void => {
    if (this.M$isDisposed) { return } // Early exit
    const callbackStack = Object.values(this.M$watcherCollection)
    for (let i = 0; i < callbackStack.length; i++) {
      callbackStack[i](...args)
    }
  }

  /**
   * Forcefully remove all watchers.
   */
  M$unwatchAll = (): void => {
    this.M$watcherCollection = {}
  }

  /**
   * Removes all watchers and prevent new ones from being added.
   */
  M$dispose = (): void => {
    this.M$isDisposed = true
    this.M$unwatchAll()
  }

}
