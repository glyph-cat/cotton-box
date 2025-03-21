import type {
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
} from '../../../core/src'
import { $$INTERNALS } from '../constants'

/**
 * State values are stored in a WeakMap so that they are not directly available
 * in the React Developer Tools.
 */
export type SyncValue<T> = WeakMap<typeof $$INTERNALS, T>

// This exposes the internal properties of the State Managers,
// making code more transparent.
export type $<T = any> = $0<T> | $1<T> | $2<T>
export type $0<T = any> = SimpleStateManager<T>
export type $1<T = any> = StateManager<T>
export type $2<T = any> = AsyncStateManager<T>
