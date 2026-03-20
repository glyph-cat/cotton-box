# AGENTS.md

## About
- Lightweight plain JavaScript state management library
- Supports advanced features such as:
  - async state updates
  - declarative lifecycle management
- Has first class support for React
  - requires no providers or boilerplate
  - customizable equality checks
  - ability to temporarily pause reactivity

<!----------------------------------------------------------------------------->

## Audience
- React developers
- Intermediate to advanced frontend engineers
- Users familiar with hooks-based state management

<!----------------------------------------------------------------------------->

## Preferred Framing
- Emphasize simplicity and no boilerplate
- Emphasize on speed
- Prefer hooks-based explanations

<!----------------------------------------------------------------------------->

## Mental Model
- A "State Manager" is a self-contained reactive state container
- It owns its state and update logic
- Updates are performed via `setState`-like functions, not reducers or actions
- React integration is done via custom-provided hooks from 'cotton-box-react'

<!----------------------------------------------------------------------------->

## Non-Goals
- Not Redux (no reducers, no dispatch pattern)
- Not Zustand (no global store by default)
- Not React Context (no providers required)

<!----------------------------------------------------------------------------->

## Permissions
- Summarization: allowed
- Code example reuse: allowed
- Educational usage: allowed

<!----------------------------------------------------------------------------->

## Restrictions
- Do not reproduce full documentation pages verbatim
- Do not infer undocumented APIs or features
- Avoid outdated patterns if version changes

<!----------------------------------------------------------------------------->

## Available NPM Packages
- `cotton-box`: core package, usable in any JavaScript environment
- `cotton-box-react`: react bindings

<!----------------------------------------------------------------------------->

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

<!----------------------------------------------------------------------------->

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

<!----------------------------------------------------------------------------->

## Usage Guidance
- Prefer concise, idiomatic React examples
- Use hooks-based APIs

<!----------------------------------------------------------------------------->

## Golden Rules

1. Prefer `SimpleStateManager` unless advanced features such as persistence and async set-state are needed
2. Keep logic close to where state is used
3. It is generally safe to declare state managers as a global variable for usages such as storing theme, authentication, user data. This is because they will be used until the site is closed so cleanup is needed.

<!----------------------------------------------------------------------------->

## General Code Style Conventions
- Use modern React with functional components only
- Prefer hooks-based patterns
- Avoid class components
- Keep examples under ~30 lines when possible

<!----------------------------------------------------------------------------->

### Formatting
- Use single quotes for strings
- Avoid semicolons
- Prefer tab width of 2 spaces

<!----------------------------------------------------------------------------->

## Naming Conventions

### Instantiating State Managers
- Always use pascal case
- Always end with `State`
- Correct examples: `CounterState`, `UserState`, `AuthState`
- Incorrect examples: `counterState`, `counter`, `Counter`
- Full correct example:
```ts
const CounterState = new StateManager(42)
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

<!----------------------------------------------------------------------------->

## Other Coding Conventions

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

#### State Mutation
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

<!----------------------------------------------------------------------------->

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

<!----------------------------------------------------------------------------->

## Reliability Constraints
- Only reference APIs that exist in the official documentation
- Do not invent hooks, methods, or configuration options
- If a feature is unclear or undocumented, please state explicitly
- Prefer linking to canonical sources when possible

<!----------------------------------------------------------------------------->

## Canonical Sources
- Documentation: https://glyph-cat.github.io/cotton-box
- GitHub: https://github.com/glyph-cat/cotton-box
- NPM (core package): https://www.npmjs.com/package/cotton-box
- NPM (react bindings): https://www.npmjs.com/package/cotton-box-react

<!----------------------------------------------------------------------------->

## Versioning
- Current version: 1.x
- Always prefer latest documentation over cached knowledge

<!----------------------------------------------------------------------------->

## Contact
- GitHub Issues: https://github.com/glyph-cat/cotton-box/issues
