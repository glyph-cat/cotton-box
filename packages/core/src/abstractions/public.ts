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
export type WaitEvaluator<State> = (currentState: State, defaultState: State) => boolean

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
