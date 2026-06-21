import {
  AsyncStateManager,
  ReadOnlyStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
} from 'cotton-box'
import { useSyncExternalStore } from 'react'
import { $1, $2 } from '../../abstractions'

type $$ = $1 | $2

const MockInitState = new SimpleStateManager<boolean>(false)

export function useSuspenseWaiter<T>(
  stateManager: SimpleStateManager<T> | StateManager<T> | AsyncStateManager<T> | SimpleFiniteStateManager<T> | ReadOnlyStateManager<T> | null | undefined
): void {

  // SimpleStateManager does not have this property.
  // NOTE: Unable to use `instanceof` to check because for UMD builds somehow,
  // it will always be `false`.
  const isInitializingState = (stateManager as StateManager<unknown> | AsyncStateManager<unknown>).isInitializing ?? MockInitState

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

type SuspenseStatus = 1 | 2 | 3
const SUCCESS_STATUS_SUCCESS: SuspenseStatus = 1
const SUCCESS_STATUS_PENDING: SuspenseStatus = 2
const SUCCESS_STATUS_ERROR: SuspenseStatus = 3

export function createSuspenseWaiter(
  promise: Promise<unknown>
): () => void {
  let status: SuspenseStatus = SUCCESS_STATUS_PENDING
  let res: unknown = null
  const suspender = promise
    .then((r: unknown): void => {
      status = SUCCESS_STATUS_SUCCESS
      res = r
    })
    .catch((e): void => {
      status = SUCCESS_STATUS_ERROR
      res = e
    })
  // Throwing must be done in a callback so that it is not run in the same 'tick'
  // Otherwise, status will always be pending
  return (): void => {
    switch (status) {
      case SUCCESS_STATUS_PENDING: throw suspender
      case SUCCESS_STATUS_ERROR: throw res
    }
  }
}
