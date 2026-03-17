import { StateChangeEventType } from '../../abstractions'

const __emptyFunction = () => { /* do nothing */ }

export class Watcher<State> {

  private M$isDisposed = false

  private M$watcherCollection = new Set<(state: State, event: StateChangeEventType) => void>()

  M$watch(
    callback: ((state: State, eventType: StateChangeEventType) => void)
  ): () => void {
    if (this.M$isDisposed) { return __emptyFunction } // Early exit
    this.M$watcherCollection.add(callback)
    return () => { this.M$watcherCollection.delete(callback) }
  }

  M$post(state: State, event: StateChangeEventType): void {
    this.M$watcherCollection.forEach((callback) => {
      callback(state, event)
    })
  }

  M$unwatchAll(): void {
    this.M$watcherCollection.clear()
  }

  M$dispose(): void {
    this.M$isDisposed = true
    this.M$unwatchAll()
  }

}
