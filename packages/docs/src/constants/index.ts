// #region Package names
const CORE_PACKAGE_NAME = 'cotton-box'
const REACT_PACKAGE_NAME = `${CORE_PACKAGE_NAME}-react`
// #endregion Package names

// #region Docs site URLs
const GLYPH_CAT_GITHUB_IO = 'https://glyph-cat.github.io'
const DOCS_SITE_URL = process.env.NODE_ENV === 'production'
  ? `${GLYPH_CAT_GITHUB_IO}/${CORE_PACKAGE_NAME}`
  : `http://localhost:3000/${CORE_PACKAGE_NAME}`
const DOCS_API_DOCS_URL = `${DOCS_SITE_URL}/docs`
const DOCS_LEARN_URL = `${DOCS_API_DOCS_URL}/learn`
const DOCS_API_URL = `${DOCS_API_DOCS_URL}/api`
const DOCS_API_CORE_URL = `${DOCS_API_URL}/core`
const DOCS_API_REACT_URL = `${DOCS_API_URL}/react`
const DOCS_API_MISC_URL = `${DOCS_API_URL}/misc`
// #endregion Docs site URLs

// #region External reference URLs
const REACT_DOCS_SITE = 'https://react.dev'
const REACT_DOCS_SITE_DEV_TOOLS_URL = `${REACT_DOCS_SITE}/learn/react-developer-tools`
const API_REFERENCE_URL_USE_CALLBACK = `${REACT_DOCS_SITE}/reference/react/useCallback`
const REACT_LEARN_CONTEXT_URL = `${REACT_DOCS_SITE}/learn/passing-data-deeply-with-context`
const TYPE_REFERENCE_URL_PROMISE = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise'
const TYPE_REFERENCE_URL_UNDEFINED = 'https://www.w3schools.com/jsref/jsref_undefined.asp'
const API_REFERENCE_URL_LOCAL_STORAGE = 'https://developer.mozilla.org/docs/Web/API/Window/localStorage'
const API_REFERENCE_URL_OBJECT_IS = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/is'
const API_REFERENCE_URL_JSON_STRINGIFY = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify'
const WIKIPEDIA_URL_PURE_FUNCTION = 'https://en.wikipedia.org/wiki/Pure_function'
// #endregion External reference URLs

const SELECTOR_BASE_DESC = 'A function that accepts the state as an argument and returns a derived value.'

const TSDOC_PARAM_DESC_ACTIVE = 'Controls whether the hook should watch for state changes and trigger component update.'

const TSDOC_PARAM_DESC_EQUALITY_FN_BASE = `A function that compares the previous state with the upcoming state and returns \`true\` if they are considered equal or \`false\` if otherwise. Some presets are available in the [\`Equality\`](${DOCS_API_CORE_URL}/Equality) object from \`${CORE_PACKAGE_NAME}\`.`

const TSDOC_PARAM_DESC_EQUALITY_FN = `${TSDOC_PARAM_DESC_EQUALITY_FN_BASE} This function does not need to be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`

const TSDOC_PARAM_DESC_REACTIVE_EQUALITY_FN = `${TSDOC_PARAM_DESC_EQUALITY_FN_BASE} This function _**must**_ be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`

const TYPE_UNDEFINED = `[\`undefined\`](${TYPE_REFERENCE_URL_UNDEFINED})`
const TYPE_PROMISE_UNDEFINED = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into ${TYPE_UNDEFINED}.`

const RETURN_DESC_BUILT_IN_EQUALITY_PRESETS = '`true` if both states are considered equal, otherwise `false`'

export const DocConstants = {

  GITHUB_REPO_URL: `https://github.com/glyph-cat/${CORE_PACKAGE_NAME}`,
  PACKAGE_DESCRIPTION: 'A flexible toolbox with different types of state managers catered to different scenarios.', // TODO: [Low priority] Should we get this from root package.json?

  // #region Package names
  DISPLAY_PACKAGE_NAME: 'Cotton Box',
  CORE_PACKAGE_NAME,
  REACT_PACKAGE_NAME,
  // #endregion Package names

  // #region Docs site URLs
  GLYPH_CAT_GITHUB_IO,
  DOCS_SITE_URL,
  DOCS_API_URL,
  DOCS_API_CORE_URL,
  DOCS_API_REACT_URL,
  DOCS_API_MISC_URL,
  DOCS_LEARN_TUTORIAL_URL: `${DOCS_LEARN_URL}/tutorial`,
  DOCS_LEARN_REACT_URL: `${DOCS_LEARN_URL}/react`,
  // #endregion Docs site URLs

  // #region Common descriptions
  COMMON_DESC_CURRENT_STATE: 'The current state.',
  COMMON_DESC_DEFAULT_STATE: 'The default state.',
  COMMON_DESC_PREVIOUS_STATE: 'The previous state.',
  COMMON_DESC_NEXT_STATE: 'The new state.',
  // #endregion Common descriptions

  TSDOC_MARKER_UNSTABLE_API: '# Caution: Unstable API\n',

  // #region tsdoc
  TSDOC_DESC_SIMPLE_STATE_MANAGER: 'A bare-bones state manager.',
  TSDOC_DESC_STATE_MANAGER: 'A state manager with lifecycle management and enforces set-state functions to be executed based on order of invocation.',
  TSDOC_DESC_ASYNC_STATE_MANAGER: 'A state manager with lifecycle management that supports asynchronous set-state functions and enforces them to be executed based on order of invocation.',
  TSDOC_DESC_IS_INITIALIZING: `A distinct [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager) that keeps track whether the main State Manager is under initialization.`,
  TSDOC_DESC_OPTIONS_NAME: 'The display name. Only used for debugging.',
  TSDOC_DESC_OPTIONS_SIMPLE: `Additional options for [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager).`,
  TSDOC_DESC_OPTIONS_STANDARD: `Additional options for [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager) and [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager).`,
  TSDOC_DESC_USE_SIMPLE_STATE_VALUE: `A React hook to consume a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager).`,
  TSDOC_DESC_USE_SIMPLE_STATE_VALUE_WITH_REACTIVE_SELECTOR: `A React hook to consume a \`SimpleStateManager\` with a selector that is wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`,
  TSDOC_DESC_USE_STATE_VALUE: `A React hook to consume either a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager), [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager), or [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager).`,
  TSDOC_DESC_USE_STATE_VALUE_WITH_REACTIVE_SELECTOR: `A React hook to consume either a [\`SimpleStateManager\`](${DOCS_API_CORE_URL}/SimpleStateManager), [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager), or [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager) with a selector that is wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`,
  TSDOC_DESC_USE_SCOPED: `A React hook to consume a scoped State Manager. To be used together with [\`StateManagerScopeProvider\`](${DOCS_API_REACT_URL}/StateManagerScopeProvider). However, if the component consuming this hook is not wrapped in one, then the returned State Manager will fall back to the "unscoped" one.`,
  TSDOC_DESC_STATE_MANAGER_SCOPE_PROVIDER: `Provider component to use scoped State Managers by using [React's Context API](${REACT_LEARN_CONTEXT_URL}) under the hood.`,
  TSDOC_DESC_STATE_MANAGER_SCOPE_PROVIDER_PROPS: `Props for [\`StateManagerScopeProvider\`](${DOCS_API_REACT_URL}/StateManagerScopeProvider).`,
  TSDOC_DESC_OPTIONS_SCOPE: `To be used with \`useScoped\` from '${REACT_PACKAGE_NAME}'.`,
  TSDOC_DESC_OPTIONS_LIFECYCLE: 'Lifecycle hooks for the State Manager.',
  TSDOC_DESC_OPTIONS_LIFECYCLE_INIT: `Will be invoked upon instantiation of the State Manager. Also see [\`StateManagerInitArgs\`](${DOCS_API_CORE_URL}/StateManagerInitArgs).`,
  TSDOC_DESC_OPTIONS_LIFECYCLE_DID_SET: `Will be invoked each time the \`.set\` method is called, even if the actual value remains the same.\n\nAlso see [\`StateManagerDidSetArgs\`](${DOCS_API_CORE_URL}/StateManagerDidSetArgs).`,
  TSDOC_DESC_OPTIONS_LIFECYCLE_DID_RESET: 'Will be invoked each time the `.reset` method is called.',
  TSDOC_DESC_OPTIONS_CLIENT_ONLY: `This only concerns [React](${REACT_DOCS_SITE}) for the time being.\n\nIf set to \`true\`, then this State Manager cannot be used for server-side rendering.`,
  TSDOC_DESC_OPTIONS_VISIBILITY: `This only concerns [React](${REACT_DOCS_SITE}) for the time being.\n\nThis is used to control whether state values will be exposed in the [React Developer Tools](${REACT_DOCS_SITE_DEV_TOOLS_URL}).`,
  TSDOC_DESC_OPTIONS_VISIBILITY_DETAILED: `This only concerns [React](${REACT_DOCS_SITE}) for the time being.\n\nThis is used to control whether state values will be exposed in the [React Developer Tools](${REACT_DOCS_SITE_DEV_TOOLS_URL}) but only applies to [\`StateManager\`](${DOCS_API_CORE_URL}/StateManager) and [\`AsyncStateManager\`](${DOCS_API_CORE_URL}/AsyncStateManager).`,
  TSDOC_DESC_OPTIONS_SUSPENSE: `Suspense [React](${REACT_DOCS_SITE}) components that consume this State Manager while the State Manager is initializing.`,
  TSDOC_DESC_STATE_MANAGER_INIT_ARGS: 'Callback arguments provided in the `.init` callback / lifecycle hook.',
  TSDOC_DESC_INIT_COMMIT: `Commits the state persisted from other sources such as the [\`localStorage\`](${API_REFERENCE_URL_LOCAL_STORAGE}).`,
  TSDOC_DESC_INIT_COMMIT_NOOP: 'Skips committing the state and lets the State Manager know that initialization has completed.',
  TSDOC_DESC_STATE_MANAGER_DID_SET_ARGS: 'Callback arguments provided in the `.didSet` lifecycle hook.',
  TSDOC_DESC_EQUALITY: `Some common equality-checking presets that can be used with [\`useStateValue\`](${DOCS_API_REACT_URL}/useStateValue) and [\`useStateValueWithReactiveSelector\`](${DOCS_API_REACT_URL}/useStateValueWithReactiveSelector) or for any general purpose.`,
  TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY: `Compares each element in the array using [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}). Use this when your selector returns an array.`,
  TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_ARRAY_OR_OBJECT: 'A wrapper around `shallowCompareArray` and `shallowCompareObject`. Only use this when you cannot determine whether your selected state will return an array or an object as it exhausts additional computing resources that could otherwise be prevented.',
  TSDOC_DESC_EQUALITY_SHALLOW_COMPARE_OBJECT: `Compares each item in the object using [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}). Use this when your selector returns a plain object.`,
  TSDOC_DESC_EQUALITY_STRINGIFY_COMPARE: `Compares the previous and next states after serializing them with [\`JSON.stringify\`](${API_REFERENCE_URL_JSON_STRINGIFY}).`,

  TSDOC_DESC_ENUM_BUILD_TYPE: 'The available build types of the package.',
  TSDOC_DESC_ENUM_BUILD_TYPE_CJS: 'Common JS',
  TSDOC_DESC_ENUM_BUILD_TYPE_ES: 'EcmaScript',
  TSDOC_DESC_ENUM_BUILD_TYPE_MJS: 'EcmaScript (minified)',
  TSDOC_DESC_ENUM_BUILD_TYPE_UMD: 'Universal Module Definition',
  TSDOC_DESC_ENUM_BUILD_TYPE_UMD_MIN: 'Universal Module Definition (Minified)',
  TSDOC_DESC_BUILD_TYPE: 'The package\'s build type.',
  TSDOC_DESC_BUILD_HASH: 'Hash of the Git commit in which the package\'s version is built.',
  TSDOC_DESC_VERSION: 'The package\'s version number. It follows [Semantic Versioning](https://semver.org).',

  TSDOC_METHOD_DESC_INIT: 'Perform initialization independent of the `init` lifecycle hook.',
  TSDOC_METHOD_DESC_REINITIALIZE: 'Explicitly trigger the `init` lifecycle hook using the same logic provided to the `lifecycle` option.',
  TSDOC_METHOD_DESC_GET: 'Retrieves the current state value.',
  TSDOC_METHOD_DESC_GET_ASYNC: 'Retrieves the current state value after all preceding and pending state changes have completed.',
  TSDOC_METHOD_DESC_GET_SYNC: 'Retrieves the current state value, even if there are still other pending state changes.',
  TSDOC_METHOD_DESC_SET_BY_VALUE: 'Sets the state with a value.',
  TSDOC_METHOD_DESC_SET_BY_FUNCTION: 'Sets the state with a function.',
  TSDOC_METHOD_DESC_RESET: 'Resets the State Manager back to it\'s default value.',
  TSDOC_METHOD_DESC_WATCH: 'Watch for state changes.',
  TSDOC_METHOD_DESC_UNWATCH_ALL: 'Removes all existing watchers referencing to this State Manager. Watchers that added after calling this method will not be affected.',
  TSDOC_METHOD_DESC_WAIT_BY_VALUE: 'Waits for the state to match the expected value. If the state already matches the `expectedValue`, the Promise will be resolved immediately.',
  TSDOC_METHOD_DESC_WAIT_BY_EVALUATOR: 'Waits for the `evaluator` to evaluate to `true`. The `evaluator` will be called immediately to check if the condition is fulfilled. If not, it will be called again each time the state changes.',
  TSDOC_METHOD_DESC_DISPOSE: 'Disposes the State Manager when it is no longer in use. This will remove all watchers and prevent new ones from being added.',

  TSDOC_PARAM_DESC_STATE_MANAGER_OPTIONS_GENERAL: 'Additional options for the State Manager.',
  TSDOC_PARAM_DESC_INIT_FN: 'The initialization callback, similar to the `init` lifecycle hook.',
  TSDOC_PARAM_DESC_SET_NEW_STATE: 'The new state.',
  TSDOC_PARAM_DESC_SET_FUNCTION: 'A function that accepts the current state and default state as parameters and returns a new state.',
  TSDOC_PARAM_DESC_SET_FUNCTION_ASYNC: `A function that accepts the current state and default state as parameters and returns a new state or a [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into the new state.`,
  TSDOC_PARAM_DESC_WATCH_CALLBACK: 'The callback that will be invoked each time the state changes.',
  TSDOC_PARAM_DESC_WAIT_EXPECTED_VALUE: 'The value to wait for.',
  TSDOC_PARAM_DESC_WAIT_EVALUATOR: 'Determines whether the state fulfills a certain condition.',
  TSDOC_PARAM_DESC_STATE_MANAGER: 'The State Manager to watch for changes.',
  TSDOC_PARAM_DESC_SELECTOR: `${SELECTOR_BASE_DESC} This function does not need to be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`,
  TSDOC_PARAM_DESC_REACTIVE_SELECTOR: `${SELECTOR_BASE_DESC} This function _**must**_ be declared outside of the component function body or wrapped in [\`useCallback\`](${API_REFERENCE_URL_USE_CALLBACK}).`,
  TSDOC_PARAM_DESC_ACTIVE,
  TSDOC_PARAM_DESC_FULL_ACTIVE: `${TSDOC_PARAM_DESC_ACTIVE} Defaults to \`true\`.`,
  TSDOC_PARAM_DESC_EQUALITY_FN,
  TSDOC_PARAM_DESC_FULL_EQUALITY_FN: `${TSDOC_PARAM_DESC_EQUALITY_FN} Defaults to [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}).`,
  TSDOC_PARAM_DESC_REACTIVE_EQUALITY_FN,
  TSDOC_PARAM_DESC_FULL_REACTIVE_EQUALITY_FN: `${TSDOC_PARAM_DESC_REACTIVE_EQUALITY_FN} Defaults to [\`Object.is\`](${API_REFERENCE_URL_OBJECT_IS}).`,
  TSDOC_PARAM_DESC_STATE_MANAGER_FOR_USE_SCOPE: 'The State Manager that will be scoped.',

  TSDOC_PROP_STATE_MANAGER_SCOPE_CHILDREN: 'The [`children`](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) prop.',
  TSDOC_PROP_STATE_MANAGER_SCOPE_STATES: 'The State Managers to use.',

  TSDOC_TYPE_DESC_WAIT_EVALUATOR: `Type definition of the evaluator function that is used in the \`.wait\` method of all State Managers.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).`,
  TSDOC_TYPE_DESC_STATE_SELECTOR: `Type definition of the selector function that is used in the hooks provided by \`${REACT_PACKAGE_NAME}\`. \n\nIt is a function that accepts the state as an argument and returns a derived value.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).`,
  TSDOC_TYPE_DESC_EQUALITY_FN: `Type definition of an equality checking function that compares the previous state with the upcoming state and returns \`true\` if they are considered equal or \`false\` if otherwise.\n\nThis should be a [pure function](${WIKIPEDIA_URL_PURE_FUNCTION}).\n\nSome presets are available in the [\`Equality\`](${DOCS_API_CORE_URL}/Equality) object.`,
  TSDOC_TYPE_DESC_READONLY_STATE_MANAGER: 'A utility type for State Managers that allows [TypeScript](https://www.typescriptlang.org) to treat it as read-only.',
  // #endregion tsdoc

  // #region Default value definitions
  DEFAULT_VALUE_OPTIONS_NAME: TYPE_UNDEFINED,
  DEFAULT_VALUE_OPTIONS_SCOPE: TYPE_UNDEFINED,
  DEFAULT_VALUE_OPTIONS_LIFECYCLE: TYPE_UNDEFINED,
  DEFAULT_VALUE_OPTIONS_CLIENT_ONLY: '`false`',
  DEFAULT_VALUE_OPTIONS_VISIBILITY: '`StateManagerVisibility.ENVIRONMENT`',
  DEFAULT_VALUE_OPTIONS_SUSPENSE: '`false`',
  // #endregion Default value definitions

  // #region Return descriptions
  TYPE_UNDEFINED,
  RETURN_DESC_INIT: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into \`undefined\`.`,
  RETURN_DESC_REINITIALIZE: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into \`undefined\`.`,
  RETURN_DESC_GET: 'The current state value.',
  RETURN_DESC_GET_ASYNC: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into the current state value.`,
  RETURN_DESC_SET: TYPE_UNDEFINED,
  RETURN_DESC_SET_ASYNC: TYPE_PROMISE_UNDEFINED,
  RETURN_DESC_RESET: TYPE_UNDEFINED,
  RETURN_DESC_RESET_ASYNC: TYPE_PROMISE_UNDEFINED,
  RETURN_DESC_WATCH: 'An "unwatch" function that when called, will remove the watcher. The "unwatch" function does not take any parameters and does not return anything.',
  RETURN_DESC_UNWATCH_ALL: TYPE_UNDEFINED,
  RETURN_DESC_WAIT: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state value that matches the \`expectedValue\` or allows the \`evaluator\` to return \`true\`.`,
  RETURN_DESC_WAIT_BY_VALUE: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state when the state matches the \`expectedValue\`.`,
  RETURN_DESC_WAIT_BY_EVALUATOR: `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into a snapshot of the state when the \`evaluator\` returns \`true\`.`,
  RETURN_DESC_DISPOSE: TYPE_UNDEFINED,
  RETURN_DESC_DISPOSE_ASYNC: TYPE_PROMISE_UNDEFINED,
  RETURN_DESC_SHALLOW_COMPARE_ARRAY: RETURN_DESC_BUILT_IN_EQUALITY_PRESETS,
  RETURN_DESC_SHALLOW_COMPARE_ARRAY_OR_OBJECT: RETURN_DESC_BUILT_IN_EQUALITY_PRESETS,
  RETURN_DESC_SHALLOW_COMPARE_OBJECT: RETURN_DESC_BUILT_IN_EQUALITY_PRESETS,
  RETURN_DESC_STRINGIFY_COMPARE: RETURN_DESC_BUILT_IN_EQUALITY_PRESETS,

  RETURN_DESC_USE_SCOPED: 'The scoped State Manager.',
  RETURN_DESC_USE_INIT_STATE: '`true` if the State Manager is still initializing, otherwise `false`.',
  // #endregion Return descriptions

  // #region State Manager Visibility
  DESC_STATE_MANAGER_VISIBILITY_ENVIRONMENT: 'State values will be exposed in non-production environments, but hidden in production environment.',
  DESC_STATE_MANAGER_VISIBILITY_EXPOSED: 'State values will be always exposed regardless of the environment.',
  DESC_STATE_MANAGER_VISIBILITY_HIDDEN: 'State values will be always hidden regardless of the environment.',
  // #endregion State Manager Visibility

  // #region Type references
  TYPE_REFERENCE_URL_STRING: 'https://www.w3schools.com/jsref/jsref_obj_string.asp',
  TYPE_REFERENCE_URL_BOOLEAN: 'https://www.w3schools.com/jsref/jsref_obj_boolean.asp',
  TYPE_REFERENCE_URL_PROMISE,
  TYPE_REFERENCE_WEAK_MAP: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap',
  TYPE_REFERENCE_URL_NULL: 'https://www.w3schools.com/typescript/typescript_null.php',
  TYPE_REFERENCE_URL_UNDEFINED: 'https://www.w3schools.com/jsref/jsref_undefined.asp',
  TYPE_REFERENCE_URL_ANY: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any',
  // TYPE_REFERENCE_URL_UNKNOWN: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown',
  TYPE_REFERENCE_URL_ENUM: 'https://www.typescriptlang.org/docs/handbook/enums.html',
  TYPE_REFERENCE_URL_FUNCTION: 'https://www.w3schools.com/js/js_functions.asp',
  TYPE_REFERENCE_URL_ARRAY: 'https://www.w3schools.com/js/js_arrays.asp',
  TYPE_REFERENCE_URL_CLASS: 'https://www.w3schools.com/js/js_classes.asp',
  TYPE_REFERENCE_URL_INTERFACE: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
  TYPE_REFERENCE_URL_TYPE: 'https://www.w3schools.com/typescript/typescript_aliases_and_interfaces.php',
  API_REFERENCE_URL_OBJECT_IS,
  API_REFERENCE_URL_USE_CALLBACK,
  API_REFERENCE_URL_JSON_PARSE: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
  API_REFERENCE_URL_JSON_STRINGIFY,
  API_REFERENCE_URL_LOCAL_STORAGE,
  REACT_DOCS_SITE,
  REACT_DOCS_SITE_DEV_TOOLS_URL,
  REACT_DOCS_SITE_STRICT_MODE_URL: `${REACT_DOCS_SITE}/reference/react/StrictMode`,
  REACT_DOCS_SITE_USE_REF_URL: `${REACT_DOCS_SITE}/reference/react/useRef`,
  // #endregion Type references

} as const
