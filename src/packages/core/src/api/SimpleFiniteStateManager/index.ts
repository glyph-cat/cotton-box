import { SetStateFn, StateChangeEventType, StateTransition } from '../../abstractions'
import { isFunction } from '../../internals/type-checking'
import { SimpleStateManager, SimpleStateManagerOptions } from '../SimpleStateManager'

/**
 * {:TSDOC_DESC_OPTIONS_SIMPLE_FINITE:}
 * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManagerOptions
 * @public
 */
export interface SimpleFiniteStateManagerOptions<State> extends SimpleStateManagerOptions {
  /**
   * {:TSDOC_DESC_OPTIONS_SERIALIZE_STATE:}
   */
  serializeState?(state: State): string
}

/**
 * @public
 */
export class SimpleFiniteStateManager<State> extends SimpleStateManager<State> {

  /**
   * @internal
   */
  private readonly M$allowedStateTransitions: Map<State, ReadonlySet<State>>

  /**
   * {:TSDOC_DESC_SIMPLE_FINITE_STATE_MANAGER:}
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param allowedStateTransitions  - {:TSDOC_PARAM_DESC_ALLOWED_STATE_TRANSITIONS:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   */
  constructor(
    defaultState: State,
    allowedStateTransitions: Array<StateTransition<State>>,
    readonly options: SimpleFiniteStateManagerOptions<State> = {},
  ) {
    super(defaultState, options)

    const $allowedStateTransitions = new Map<State, Set<State>>()
    for (const [fromState, toState] of allowedStateTransitions) {
      if (!$allowedStateTransitions.has(fromState)) {
        $allowedStateTransitions.set(fromState, new Set<State>())
      }
      $allowedStateTransitions.get(fromState).add(toState)
    }
    this.M$allowedStateTransitions = $allowedStateTransitions
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(newState: State): void

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#set
   * @returns -{:RETURN_DESC_SET:}
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    const newState = isFunction(newStateOrFn)
      ? newStateOrFn(this.M$internalState, this.defaultState)
      : newStateOrFn
    const currentStateAllowedTransitions = this.M$allowedStateTransitions.get(this.M$internalState)
    if (!currentStateAllowedTransitions.has(newState)) {
      const serializeState = this.options?.serializeState ?? String
      throw new InvalidStateTransitionError(
        serializeState(this.M$internalState),
        serializeState(newState)
      )
    }
    this.M$internalState = newState
    this.M$watcher.refresh(this.M$internalState, StateChangeEventType.SET)
  }

}

/**
 * @public
 */
export class InvalidStateTransitionError extends Error {

  constructor(fromState: string, toState: string) {
    super(`Invalid state transition from ${fromState} to ${toState}`)
  }

}
