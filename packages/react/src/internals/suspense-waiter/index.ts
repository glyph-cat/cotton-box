import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { $1, $2 } from '../../abstractions'

type $$ = $1 | $2

const MockInitState = new SimpleStateManager<boolean>(false)

export function useSuspenseWaiter(
  stateManager: SimpleStateManager<unknown> | StateManager<unknown> | AsyncStateManager<unknown>
): void {

  // SimpleStateManager does not have this property.
  // NOTE: Unable to use `instanceof` to check because for UMD builds somehow,
  // it will always be `false`.
  const isInitializingState = ((stateManager as $1 | $2)._isInitializing ?? MockInitState) as SimpleStateManager<boolean>

  const isInitializing = useSyncExternalStore(
    isInitializingState.watch,
    isInitializingState.get,
    isInitializingState.get,
  )

  if ((stateManager as $$).suspense && isInitializing) {
    // A function is returned and invoked immediately
    createSuspenseWaiter(isInitializingState.wait(false))()
  }

}

// Modified based from ovieokeh's `wrapPromise` method. Reference:
// https://github.com/ovieokeh/suspense-data-fetching/blob/master/lib/api/wrapPromise.js

enum SuspenseStatus {
  /** Success */ S,
  /** Pending */ P,
  /**   Error */ E,
}

export function createSuspenseWaiter(
  promise: Promise<unknown>
): () => void {
  let status = SuspenseStatus.P
  let res: unknown = null
  const suspender = promise
    .then((r: unknown): void => {
      status = SuspenseStatus.S
      res = r
    })
    .catch((e): void => {
      status = SuspenseStatus.E
      res = e
    })
  // Throwing must be done in a callback so that it is not run in the same 'tick'
  // Otherwise, status will always be pending
  return (): void => {
    switch (status) {
      case SuspenseStatus.P: throw suspender
      case SuspenseStatus.E: throw res
    }
  }
}
