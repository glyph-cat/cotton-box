import type { SimpleStateManager } from '../api/SimpleStateManager'

/**
 * {:TSDOC_PARAM_DESC_SET_FUNCTION:}
 * @see -{:DOCS_API_CORE_URL:}/SetStateFn
 * @public
 */
export type SetStateFn<State> = (currentState: State, defaultState: State) => State

/**
 * {:TSDOC_PARAM_DESC_SET_FUNCTION_ASYNC:}
 * @see -{:DOCS_API_CORE_URL:}/AsyncSetStateFn
 * @public
 */
export type AsyncSetStateFn<State> = (currentState: State, defaultState: State) => State | Promise<State>

/**
 * {:TSDOC_TYPE_DESC_WAIT_EVALUATOR:}
 * @see -{:DOCS_API_CORE_URL:}/WaitEvaluator
 * @public
 */
export type WaitEvaluator<State> = (currentState: State, defaultState: State, eventType: StateChangeEventType | null) => boolean

/**
 * {:TSDOC_TYPE_DESC_STATE_SELECTOR:}
 * @see -{:DOCS_API_CORE_URL:}/StateSelector
 * @public
 */
export type StateSelector<State, SelectedState> = (state: State) => SelectedState

/**
 * {:TSDOC_TYPE_DESC_EQUALITY_FN:}
 * @see -{:DOCS_API_CORE_URL:}/EqualityFn
 * @public
 */
export type EqualityFn<State> = (previousState: State, nextState: State) => boolean

/**
 * {:TSDOC_TYPE_DESC_READONLY_STATE_MANAGER:}
 * @see -{:DOCS_API_CORE_URL:}/ReadOnlyStateManager
 * @public
 */
export type ReadOnlyStateManager<State> = Pick<SimpleStateManager<State>, 'get' | 'watch' | 'wait'>

/**
 * {:TSDOC_TYPE_DESC_STATE_CHANGE_EVENT_TYPE:}
 * @see -{:DOCS_API_CORE_URL:}/StateChangeEventType
 * @public
 */
export enum StateChangeEventType {
  /**
   * {:DESC_STATE_CHANGE_EVENT_TYPE_SET:}
   */
  SET = 1,
  /**
   * {:DESC_STATE_CHANGE_EVENT_TYPE_RESET:}
   */
  RESET,
  /**
   * {:DESC_STATE_CHANGE_EVENT_TYPE_INIT:}
   */
  INIT,
}

/**
 * {:TSDOC_TYPE_DESC_STATE_TRANSITION:}
 * @see -{:DOCS_API_CORE_URL:}/StateTransition
 * @public
 */
export type StateTransition<State> = [fromState: State, toState: State]
