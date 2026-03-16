import { StateChangeEventType } from '../../abstractions'

export class Watcher<State> {

  private M$isDisposed = false

  private M$watcherCollection = new Set<(state: State, event: StateChangeEventType) => void>()

  M$watch(
    callback: ((state: State, eventType: StateChangeEventType) => void)
  ): () => void {
    this.M$watcherCollection.add(callback)
    return () => { this.M$watcherCollection.delete(callback) }
  }

  M$post(state: State, event: StateChangeEventType): void {
    if (this.M$isDisposed) { return } // Early exit
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
