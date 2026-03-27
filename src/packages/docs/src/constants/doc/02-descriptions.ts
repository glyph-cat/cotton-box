import {
  CORE_PACKAGE_NAME,
  DOCS_API_CORE_URL,
  DOCS_API_REACT_URL,
  REACT_PACKAGE_NAME,
} from './00-repo'
import {
  API_REFERENCE_URL_JSON_STRINGIFY,
  API_REFERENCE_URL_LOCAL_STORAGE,
  API_REFERENCE_URL_OBJECT_IS,
  API_REFERENCE_URL_USE_CALLBACK,
  REACT_DOCS_SITE,
  REACT_DOCS_SITE_DEV_TOOLS_URL,
  TYPE_REFERENCE_URL_PROMISE,
  WIKIPEDIA_URL_PURE_FUNCTION,
} from './99-external-references'
import { TYPE_PROMISE_UNDEFINED, TYPE_UNDEFINED } from './99-types'

// MARK: Warnings
export const TSDOC_WARN_NOT_COMPATIBLE_HERE_STATE_MANAGER = `## ❌ [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager) is not compatible here.`
export const TSDOC_WARN_NOT_COMPATIBLE_HERE_ASYNC_STATE_MANAGER = `## ❌ [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager) is not compatible here.`
export const TSDOC_WARN_PLEASE_USE_STATE_VALUE_INSTEAD = `## ➡️ Please [\`useStateValue\`](${DOCS_API_REACT_URL}/useStateValue) instead.`

// MARK: General
export const TSDOC_DESC_SIMPLE_STATE_MANAGER = 'A bare-bones state manager.'
export const TSDOC_DESC_STATE_MANAGER = 'A state manager with lifecycle management and enforces set-state functions to be executed based on order of invocation.'
export const TSDOC_DESC_ASYNC_STATE_MANAGER = 'A state manager with lifecycle management that supports asynchronous set-state functions and enforces them to be executed based on order of invocation.'
export const TSDOC_DESC_SIMPLE_FINITE_STATE_MANAGER = 'A bare-bones state manager that only allows state change according to a set of predefined state transitions.'
export const TSDOC_DESC_IS_INITIALIZING = `A distinct [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager) that keeps track whether the main State Manager is under initialization.`
export const TSDOC_DESC_OPTIONS_NAME = 'The display name. Only used for debugging.'
export const TSDOC_DESC_OPTIONS_SERIALIZE_STATE = 'A function to serialize the state. Only used for debugging.'
export const TSDOC_DESC_OPTIONS_SIMPLE = `Additional options for [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager).`
export const TSDOC_DESC_OPTIONS_SIMPLE_FINITE = `Additional options for [\`SimpleFiniteStateManager\`](${DOCS_API_CORE_URL}/SimpleFiniteStateManager).`
export const TSDOC_DESC_OPTIONS_STANDARD = `Additional options for [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager) and [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager).`
export const TSDOC_DESC_INVALID_STATE_TRANSITION_ERROR = 'An error that is thrown when attempting to change a state without conforming to the predefined state transitions.'
export const TSDOC_DESC_USE_SIMPLE_STATE_VALUE = `A React hook to consume a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager) or [\`SimpleFiniteStateManager\`](${DOCS_API_CORE_URL}/SimpleFiniteStateManager).`
export const TSDOC_DESC_USE_SIMPLE_STATE_VALUE_ONLY = `A minimal React hook to consume a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager) or [\`SimpleFiniteStateManager\`](${DOCS_API_CORE_URL}/SimpleFiniteStateManager) that doesn't support additional options or selectors.`
export const TSDOC_DESC_USE_STATE_VALUE = `A React hook to consume either a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager), [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager), [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager), or [\`SimpleFiniteStateManager\`](${DOCS_API_CORE_URL}/SimpleFiniteStateManager).`
export const TSDOC_DESC_OPTIONS_LIFECYCLE = 'Lifecycle hooks for the State Manager.'
export const TSDOC_DESC_OPTIONS_LIFECYCLE_INIT = `Will be invoked upon instantiation of the State Manager. Also see [\`StateManagerInitArgs\`](${DOCS_API_CORE_URL}/StateManagerInitArgs).`
export const TSDOC_DESC_OPTIONS_LIFECYCLE_DID_SET = `Will be invoked each time the \`.set\` method is called, even if the actual value remains the same.\n\nAlso see [\`StateManagerDidSetArgs\`](${DOCS_API_CORE_URL}/StateManagerDidSetArgs).`
export const TSDOC_DESC_OPTIONS_LIFECYCLE_DID_RESET = 'Will be invoked each time the `.reset` method is called.'
export const TSDOC_DESC_OPTIONS_VISIBILITY = `This only concerns [React](${REACT_DOCS_SITE}) for the time being.\n\nThis is used to control whether state values will be exposed in the [React Developer Tools](${REACT_DOCS_SITE_DEV_TOOLS_URL}).`
export const TSDOC_DESC_OPTIONS_VISIBILITY_DETAILED = `This only concerns [React](${REACT_DOCS_SITE}) for the time being.\n\nThis is used to control whether state values will be exposed in the [React Developer Tools](${REACT_DOCS_SITE_DEV_TOOLS_URL}) but only applies to [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager) and [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager).`
export const TSDOC_DESC_OPTIONS_SUSPENSE = `Suspense [React](${REACT_DOCS_SITE}) components that consume this State Manager while the State Manager is initializing.`
export const TSDOC_DESC_STATE_MANAGER_INIT_ARGS = 'Callback arguments provided in the `.init` callback / lifecycle hook.'
export const TSDOC_DESC_INIT_COMMIT = `Commits the state persisted from other sources such as the [\`localStorage\`](${API_REFERENCE_URL_LOCAL_STORAGE}).`
export const TSDOC_DESC_INIT_COMMIT_NOOP = 'Skips committing the state and lets the State Manager know that initialization has completed.'
export const TSDOC_DESC_STATE_MANAGER_DID_SET_ARGS = 'Callback arguments provided in the `.didSet` lifecycle hook.'
export const TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY = `Compares each element in the array using [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}). Use this when your selector returns an array.`

// MARK: Methods

export const TSDOC_METHOD_DESC_INIT = 'Perform initialization independent of the `init` lifecycle hook.'
export const TSDOC_METHOD_DESC_REINITIALIZE = 'Explicitly trigger the `init` lifecycle hook using the same logic provided to the `lifecycle` option.'
export const TSDOC_METHOD_DESC_GET = 'Retrieves the current state value.'
export const TSDOC_METHOD_DESC_GET_ASYNC = 'Retrieves the current state value after all preceding and pending state changes have completed.'
export const TSDOC_METHOD_DESC_GET_SYNC = 'Retrieves the current state value, even if there are still other pending state changes.'
export const TSDOC_METHOD_DESC_SET_BY_VALUE = 'Sets the state with a value.'
export const TSDOC_METHOD_DESC_SET_BY_FUNCTION = 'Sets the state with a function.'
export const TSDOC_METHOD_DESC_TRY_SET_BY_VALUE = 'Tries to set the state with a value. If the new state does not conform to the defined state transitions, the state will not change and no error will be thrown.'
export const TSDOC_METHOD_DESC_TRY_SET_BY_FUNCTION = 'Tries to set the state with a function. If the new state does not conform to the defined state transitions, the state will not change and no error will be thrown.'
export const TSDOC_METHOD_DESC_RESET = 'Resets the State Manager back to it\'s default value.'
export const TSDOC_METHOD_DESC_WATCH = 'Watch for state changes.'
export const TSDOC_METHOD_DESC_UNWATCH_ALL = 'Removes all existing watchers referencing to this State Manager. Watchers that added after calling this method will not be affected.'
export const TSDOC_METHOD_DESC_WAIT_BY_VALUE = 'Waits for the state to match the expected value. If the state already matches the `expectedValue`, the Promise will be resolved immediately.'
export const TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR = 'Waits for the `evaluator` to evaluate to `true`. The `evaluator` will be called immediately to check if the condition is fulfilled. If not, it will be called again each time the state changes until the condition is fulfilled.'
export const TSDOC_METHOD_DESC_DISPOSE_STATE_MANAGER = 'Disposes the State Manager when it is no longer in use. This will remove all watchers and prevent new ones from being added.'

// MARK: Parameters
export const SELECTOR_BASE_DESC = 'A function that accepts the state as an argument and returns a derived value.'
export const TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL = 'Additional options for the State Manager.'
export const TSDOC_PARAM_DESC_ALLOWED_STATE_TRANSITIONS = 'The list of allowed state transitions.'
export const TSDOC_PARAM_DESC_INIT_FN = 'The initialization callback, similar to the `init` lifecycle hook.'
export const TSDOC_PARAM_DESC_SET_NEW_STATE = 'The new state.'
export const TSDOC_PARAM_DESC_SET_FUNCTION = 'A function that accepts the current state and default state as parameters and returns a new state.'
export const TSDOC_PARAM_DESC_SET_FUNCTION_ASYNC = `A function that accepts the current state and default state as parameters and returns a new state or a [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into the new state.`
export const TSDOC_PARAM_DESC_WATCH_CALLBACK = 'The callback that will be invoked each time the state changes.'
export const TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE = 'The value to wait for.'
export const TSDOC_PARAM_DESC_WAIT_EVALUATOR = 'Determines whether the state fulfills a certain condition.'
export const TSDOC_PARAM_DESC_STATE_MANAGER = 'The State Manager to watch for changes.'
export const TSDOC_PARAM_DESC_SELECTOR = `${SELECTOR_BASE_DESC} This function does not need to be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`
export const TSDOC_PARAM_DESC_FROM_STATE = 'The value of the state which is it changing from.'
export const TSDOC_PARAM_DESC_TO_STATE = 'The value of the state which is it changing to.'
export const TSDOC_PARAM_DESC_ACTIVE = 'Controls whether the hook should watch for state changes and trigger component update.'
TSDOC_PARAM_DESC_FULL_ACTIVE: `${TSDOC_PARAM_DESC_ACTIVE} Defaults to \`true\`.`
export const TSDOC_PARAM_DESC_EQUALITY_FN_BASE = `A function that compares the previous state with the upcoming state and returns \`true\` if they are considered equal or \`false\` if otherwise. Some presets are available in the [\`Equality\`](${DOCS_API_CORE_URL}/Equality) object from \`${CORE_PACKAGE_NAME}\`.`
export const TSDOC_PARAM_DESC_EQUALITY_FN = `${TSDOC_PARAM_DESC_EQUALITY_FN_BASE} This function does not need to be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`
export const TSDOC_PARAM_DESC_FULL_EQUALITY_FN = `${TSDOC_PARAM_DESC_EQUALITY_FN} Defaults to [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}).`

// MARK: Returns
export const RETURN_DESC_INIT = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into \`undefined\`.`
export const RETURN_DESC_REINITIALIZE = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into \`undefined\`.`
export const RETURN_DESC_GET = 'The current state value.'
export const RETURN_DESC_GET_ASYNC = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into the current state value.`
export const RETURN_DESC_SET = TYPE_UNDEFINED
export const RETURN_DESC_TRY_SET = '`true` if the state change conforms to the predefined state transitions, otherwise `false`.'
export const RETURN_DESC_SET_ASYNC = TYPE_PROMISE_UNDEFINED
export const RETURN_DESC_RESET = TYPE_UNDEFINED
export const RETURN_DESC_RESET_ASYNC = TYPE_PROMISE_UNDEFINED
export const RETURN_DESC_WATCH = 'An "unwatch" function that when called, will remove the watcher. The "unwatch" function does not take any parameters and does not return anything.'
export const RETURN_DESC_UNWATCH_ALL = TYPE_UNDEFINED
export const RETURN_DESC_POST = TYPE_UNDEFINED
export const RETURN_DESC_WAIT = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state value that matches the \`expectedValue\` or allows the \`evaluator\` to return \`true\`.`
export const RETURN_DESC_WAIT_BY_VALUE = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state when the state matches the \`expectedValue\`.`
export const RETURN_DESC_WAIT_BY_EVALUATOR = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state when the \`evaluator\` returns \`true\`.`
export const RETURN_DESC_DISPOSE = TYPE_UNDEFINED
export const RETURN_DESC_DISPOSE_ASYNC = TYPE_PROMISE_UNDEFINED
export const RETURN_DESC_BUILT_IN_EQUALITY_PRESETS = '`true` if both states are considered equal, otherwise `false`'
export const RETURN_DESC_SHALLOW_COMPARE_ARRAY = RETURN_DESC_BUILT_IN_EQUALITY_PRESETS
export const RETURN_DESC_SHALLOW_COMPARE_ARRAY_OR_OBJECT = RETURN_DESC_BUILT_IN_EQUALITY_PRESETS
export const RETURN_DESC_SHALLOW_COMPARE_OBJECT = RETURN_DESC_BUILT_IN_EQUALITY_PRESETS
export const RETURN_DESC_STRINGIFY_COMPARE = RETURN_DESC_BUILT_IN_EQUALITY_PRESETS
export const RETURN_DESC_USE_INIT_STATE = '`true` if the State Manager is still initializing, otherwise `false`.'

// MARK: Types & Interfaces
export const TSDOC_TYPE_DESC_WAIT_EVALUATOR = `Type definition of the evaluator function that is used in the \`.wait\` method of all State Managers.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).`
export const TSDOC_TYPE_DESC_STATE_SELECTOR = `Type definition of the selector function that is used in the hooks provided by \`${REACT_PACKAGE_NAME}\`. \n\nIt is a function that accepts the state as an argument and returns a derived value.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).`
export const TSDOC_TYPE_DESC_EQUALITY_FN = `Type definition of an equality checking function that compares the previous state with the upcoming state and returns \`true\` if they are considered equal or \`false\` if otherwise.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).\n\nSome presets are available in the [\`Equality\`](${DOCS_API_CORE_URL}/Equality) object.`
export const TSDOC_TYPE_DESC_READONLY_STATE_MANAGER = 'A utility type for State Managers that allows [TypeScript](https://www.typescriptlang.org) to treat it as read-only.'
export const TSDOC_TYPE_DESC_STATE_TRANSITION = 'The definition of a state change from one to another.'

// MARK: Miscellaneous
// TODO: remove unused values related to equality
export const TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY_OR_OBJECT = 'A wrapper around `arrayIsShallowEqual` and `objectIsShallowEqual`. Only use this when you cannot determine whether your selected state will return an array or an object as it exhausts additional computing resources that could otherwise be prevented.'
export const TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_OBJECT = `Compares each item in the object using [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}). Use this when your selector returns a plain object.`
export const TSDOC_DESC_EQUALITY_STRINGIFY_COMPARE = `Compares the previous and next states after serializing them with [\`JSON.stringify\`](${API_REFERENCE_URL_JSON_STRINGIFY}).`
