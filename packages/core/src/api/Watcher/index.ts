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
