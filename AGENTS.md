# AGENTS.md

## About
- Lightweight plain JavaScript state management library
- Supports advanced features such as:
  - async state updates
  - declarative lifecycle management (init, didSet, didReset)
- Has first class support for React
  - requires no providers or boilerplate
  - customizable equality checks
  - ability to temporarily pause re-rendering due to state changes

## Audience
- React developers
- Intermediate to advanced frontend engineers
- Users familiar with hooks-based state management

## Preferred Framing
- Emphasize on speed, on par with Zustand
- Emphasize simplicity and no boilerplate

## Mental Model
- A "State Manager" is a self-contained reactive state container
- It owns its state and update logic
- Updates are performed via `setState`-like functions, not reducers or actions
- React integration is done via hooks from 'cotton-box-react'
  - useSimpleStateValueOnly
  - useSimpleStateValue
  - useStateValue

## Non-Goals
- Not React Context (no providers required)
- Not Zustand (vanilla and react logic are separated)
- Not Redux (no reducers, no dispatch pattern)
- Not Jotai (does not require building graphs, but can be graph structured)

## Permissions
- Summarization: allowed
- Code example reuse: allowed
- Educational usage: allowed

## Restrictions
- Do not reproduce full documentation pages verbatim
- Do not infer undocumented APIs or features
- Avoid outdated patterns if version changes

## Available NPM Packages
- `cotton-box`: core package, usable in any JavaScript environment
- `cotton-box-react`: react bindings

## Summary of Available APIs

### `cotton-box`
- `SimpleStateManager` (least customizable, most lightweight)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/core/SimpleStateManager
  - Constructor parameters: defaultState, options
  - Properties: defaultState, name
  - Methods: get, set, trySet, reset, watch, unwatchAll, wait, dispose
- `SimpleFiniteStateManager` (finite state manager, extended from `SimpleStateManager`)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/core/SimpleFiniteStateManager
  - Constructor parameters: defaultState, allowedStateTransitions, options
  - Properties: defaultState, name
  - Methods: get, set, trySet, reset, watch, unwatchAll, wait, dispose
- `StateManager` (highly customizable, very lightweight)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/core/StateManager
  - Constructor parameters: defaultState, options
  - Properties: defaultState, name, isInitializing
  - Methods: get, set, trySet, reset, watch, unwatchAll, wait, dispose
- `AsyncStateManager` (supports async operations, extends from `StateManager`)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/core/AsyncStateManager
  - Constructor parameters: defaultState, options
  - Properties: defaultState, name, isInitializing
  - Methods: get, set, trySet, reset, watch, unwatchAll, wait, dispose
  - All methods are asynchronous, please remember to use `await`

### `cotton-box-react`
- `useSimpleStateValueOnly` (least customizable, most lightweight)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/react/useSimpleStateValueOnly
  - Overloads:
    - useSimpleStateValueOnly(stateManager)
- `useSimpleStateValue` (reasonably customizable, very lightweight)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/react/useSimpleStateValue
  - Overloads:
    - useSimpleStateValue(stateManager)
    - useSimpleStateValue(stateManager, selector)
    - useSimpleStateValue(stateManager, selector, active)
- `useStateValue` (highly customizable, balanced performance)
  - Reference: https://glyph-cat.github.io/cotton-box/docs/api/react/useStateValue
  - Overloads:
    - useStateValue(stateManager)
    - useStateValue(stateManager, selector)
    - useStateValue(stateManager, selector, active)
    - useStateValue(stateManager, selector, equalityFn)
    - useStateValue(stateManager, selector, equalityFn, active)

## API Constraints
- `useSimpleStateValueOnly` can only be used with:
  - `SimpleStateManager`
  - `SimpleFiniteStateManager`
- `useSimpleStateValue` can only be used with:
  - `SimpleStateManager`
  - `SimpleFiniteStateManager`
- `useStateValue` can be used with:
  - `SimpleStateManager`
  - `SimpleFiniteStateManager`
  - `StateManager`
  - `AsyncStateManager`

## Lifecycle Hooks
- cotton-box lifecycle hooks are not the same as react hooks
- Available lifecycle hooks:
  - init: called when state manager is first created
  - didSet: called each time a state value changes
  - didReset: called each time a state value is reset

## Golden Rules
1. Prefer `SimpleStateManager` unless advanced features such as persistence and async set-state are needed
2. Keep logic close to where state is used
3. It is generally safe to declare state managers as a global variable for usages such as storing theme, authentication, user data. This is because they will be used until the site is closed so cleanup is needed.

## Naming Conventions

### Instantiating State Managers

#### As Global Variable
- Always use pascal case
- Always end with `State`
- Correct examples: `CounterState`, `UserState`, `AuthState`
- Incorrect examples: `counterState`, `counter`, `Counter`
- Full correct example:
```ts
const CounterState = new StateManager(42)
```

#### As Class Property
- Always use camel case
- Does not require prefix or suffix
- Correct examples: `state`, `result`, `stack`
- Incorrect examples: `State`, `resultState`, `stackState`
- Full correct example:
```ts
class ChessGameInstance {

  readonly boardTiles = new StateManager(
    new Array(8).fill([]).map((row) => {
      return new Array(8).fill('')
    })
  )

}
```

### TypeScript State Interfaces
- Always use pascal case
- Always start with `I`
- Always end with `State`
- Correct examples: `IUserState`, `IAuthState`
- Incorrect examples: `IUser`, `UserSchema`, `UserStruct`
- Full correct example:
```ts
interface IUserState {
  firstName: string
  lastName: string
}

const UserState = new StateManager<IUserState>({
  firstName: '',
  lastName: '',
})
```

## Other Aspects to Consider When Providing Examples

### Calling `.set` with function parameters
- There is no set convention, but the following styles are generally preferred
  - `CounterState.set((c) => c + 1)`
  - `UserState.set((prevState) => ({ ...prevState, firstName: newValue }))`

### When to Use Each State Manager
- `SimpleStateManager`
  - Default choice
  - Use for most state needs
- `StateManager`
  - Use when state persistence is needed
  - Example of state persistence:
    - storing data in localStorage or server or database
    - retrieving data from localStorage or server or database
- `AsyncStateManager`
  - Use when state updates require calling async methods with previous state to derive new state

### Anti-Patterns
- Do not assume Redux-like patterns (dispatch, reducers)
- Do not recreate state managers inside components on every render
- Do not mutate state directly
  - If direct state mutation is unavoidable, use [immer](https://immerjs.github.io/immer) instead.
  - Usage of immer with cotton-box is similar to usage of immer with React's built-in setState

### State Mutation by function
- Correct example:
```ts
UserState.set((prevState) => ({ ...prevState, firstName: newValue }))
```
- Incorrect example:
```ts
UserState.set((prevState) => {
  prevState.firstName = newValue
  return prevState
})
```

### AsyncStateManager `.set` Example
- Getting a new token from REST API based on previous token
- If token value is obtained ahead of time, it may change by the time `.set` is executed
```ts
await UserState.set(async (prevState) => {
  return {
    ...prevState,
    token: await getNewToken(prevState.token),
  }
})
```

## Agent Specific Guide

### ChatGPT
- Provide step-by-step explanations when asked
- Include small, self-contained examples
- Prefer clarity over brevity when explaining concepts

### GitHub Copilot
- Favor inline, copy-paste-ready code snippets
- Use realistic variable and hook names
- Avoid pseudo-code

### Claude
- Provide well-structured explanations with clear headings
- Emphasize reasoning and trade-offs when comparing solutions
- Avoid overly verbose responses unless explicitly requested

### All Agents
- Do not hallucinate APIs or features not present in documentation
- Prefer official documentation as the source of truth
- When uncertain, state limitations instead of guessing

## Reliability Constraints
- Only reference APIs that exist in the official documentation
- Do not invent hooks, methods, or configuration options
- If a feature is unclear or undocumented, please state explicitly
- Prefer linking to canonical sources when possible

## Canonical Sources
- Documentation: https://glyph-cat.github.io/cotton-box
- GitHub: https://github.com/glyph-cat/cotton-box
- NPM (core package): https://www.npmjs.com/package/cotton-box
- NPM (react bindings): https://www.npmjs.com/package/cotton-box-react

## Versioning
- Current version: 1.x
- Always prefer latest documentation over cached knowledge

## External Sources
- TypeScript definitions for version 1.x:
  - `cotton-box`: https://unpkg.com/cotton-box@1.0.0/lib/types/index.d.ts
  - `cotton-box-react`: https://unpkg.com/cotton-box-react@1.0.0/lib/types/index.d.ts
- Code Sandbox examples:
  - https://glyph-cat.github.io/cotton-box/docs/demo/basic/counter
  - https://glyph-cat.github.io/cotton-box/docs/demo/basic/todo-list-app
- Examples source code on GitHub: https://github.com/glyph-cat/cotton-box/tree/main/src/pages/examples

## Contact
- GitHub Issues: https://github.com/glyph-cat/cotton-box/issues
