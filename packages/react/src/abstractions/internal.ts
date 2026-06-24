import type {
  AsyncStateManager,
  SimpleFiniteStateManager,
  SimpleStateManager,
  StateManager,
} from '../../../core/src'

// This exposes the internal properties of the State Managers,
// making code more transparent.

/** @deprecated */
export type $<T = any> = $0<T> | $1<T> | $2<T> | $3<T>
/** @deprecated */
export type $0<T = any> = SimpleStateManager<T>
/** @deprecated */
export type $1<T = any> = StateManager<T>
/** @deprecated */
export type $2<T = any> = AsyncStateManager<T>
/** @deprecated */
export type $3<T = any> = SimpleFiniteStateManager<T>

/** @deprecated */
export type Nullable<T> = T | null

export { }
