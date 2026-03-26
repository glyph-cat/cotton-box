import { isFunction } from '@glyph-cat/type-checking'
import { SetStateFn, StateTransition } from '../../abstractions'
import { InvalidStateTransitionError } from '../../errors'
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
 * {:TSDOC_DESC_SIMPLE_FINITE_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager
 * @public
 */
export class SimpleFiniteStateManager<State> extends SimpleStateManager<State> {

  /**
   * @internal
   */
  private readonly M$allowedStateTransitions: Map<State, ReadonlySet<State>>

  /**
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager
   * @param defaultState - {:COMMON_DESC_DEFAULT_STATE:}
   * @param allowedStateTransitions  - {:TSDOC_PARAM_DESC_ALLOWED_STATE_TRANSITIONS:}
   * @param options - {:TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL:}
   * @example Plain example
   * ```typescript
   * class PlayableCharacter {
   *
   *   readonly state = new SimpleFiniteStateManager('idle', [
   *     ['idle', 'walking'],
   *     ['idle', 'attacking'],
   *     ['walking', 'idle'],
   *     ['attacking', 'idle'],
   *   ], {
   *     name: 'PlayableCharacter',
   *   })
   *
   * }
   *
   * const character = new PlayableCharacter()
   * ```
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
      $allowedStateTransitions.get(fromState)!.add(toState)
    }
    this.M$allowedStateTransitions = $allowedStateTransitions
  }

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#set
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @returns -{:RETURN_DESC_SET:}
   * @example
   * ```typescript
   * character.state.set('walking')
   * ```
   */
  set(newState: State): void

  /**
   * {:TSDOC_METHOD_DESC_SET_BY_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#set
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @returns -{:RETURN_DESC_SET:}
   * @example
   * ```typescript
   * character.state.set((state) => state === 'idle' ? 'attacking' : 'idle')
   * ```
   */
  set(setStateFn: SetStateFn<State>): void

  set(newStateOrFn: State | SetStateFn<State>): void {
    const newState = isFunction(newStateOrFn)
      ? newStateOrFn(this.M$internalState, this.defaultState)
      : newStateOrFn
    const currentStateAllowedTransitions = this.M$allowedStateTransitions.get(this.M$internalState)
    if (!currentStateAllowedTransitions?.has(newState)) {
      const serializeState = this.options?.serializeState ?? String
      throw new InvalidStateTransitionError(
        serializeState(this.M$internalState),
        serializeState(newState),
        this.name,
      )
    }
    this.M$internalState = newState
    this.M$post(this.M$internalState)
  }

  /**
   * {:TSDOC_METHOD_DESC_TRY_SET_BY_VALUE:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#trySet
   * @param newState - {:TSDOC_PARAM_DESC_SET_NEW_STATE:}
   * @returns -{:RETURN_DESC_SET:}
   * @example
   * ```typescript
   * if (character.state.trySet('walking')) {
   *   // successfully changed state to 'walking'
   * }
   * ```
   */
  trySet(newState: State): boolean

  /**
   * {:TSDOC_METHOD_DESC_TRY_SET_BY_FUNCTION:}
   * @see -{:DOCS_API_CORE_URL:}/SimpleFiniteStateManager#trySet
   * @param setStateFn - {:TSDOC_PARAM_DESC_SET_FUNCTION:}
   * @returns -{:RETURN_DESC_SET:}
   * @example
   * ```typescript
   * if (character.state.set((state) => state === 'idle' ? 'attacking' : 'idle')) {
   *   // successfully changed state based on conditions
   * }
   * ```
   */
  trySet(setStateFn: SetStateFn<State>): boolean

  trySet(newStateOrFn: State | SetStateFn<State>): boolean {
    const newState = isFunction(newStateOrFn)
      ? newStateOrFn(this.M$internalState, this.defaultState)
      : newStateOrFn
    const currentStateAllowedTransitions = this.M$allowedStateTransitions.get(this.M$internalState)
    if (!currentStateAllowedTransitions?.has(newState)) {
      return false
    }
    this.M$internalState = newState
    this.M$post(this.M$internalState)
    return true
  }

}
