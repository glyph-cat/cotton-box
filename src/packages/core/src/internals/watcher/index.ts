import { Fn } from '@glyph-cat/foundation'

const __emptyFunction = () => { /* do nothing */ }

export class Watcher<State> {

  private M$isDisposed = false

  private M$watcherCollection = new Set<(state: State) => void>()

  M$watch(callback: Fn<[State], void>): () => void {
    if (this.M$isDisposed) { return __emptyFunction } // Early exit
    this.M$watcherCollection.add(callback)
    return () => { this.M$watcherCollection.delete(callback) }
  }

  M$post(state: State): void {
    this.M$watcherCollection.forEach((callback) => {
      callback(state)
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
