import type {
  AsyncStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
} from '../../../core/src'

// This exposes the internal properties of the State Managers,
// making code more transparent.
export type $<T = any> = $0<T> | $1<T> | $2<T> | $3<T>
export type $0<T = any> = SimpleStateManager<T>
export type $1<T = any> = StateManager<T>
export type $2<T = any> = AsyncStateManager<T>
export type $3<T = any> = SimpleFiniteStateManager<T>

export type Nullable<T> = T | null
