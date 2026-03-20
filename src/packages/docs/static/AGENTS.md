# AGENTS.md

## About
- Lightweight state management library
- Works with and without React
- Has first class support for React
- Requires no providers or boilerplate
- Supports advanced features such as:
  - async state updates
  - customizable equality checks
  - declarative lifecycle management

## Audience
- React developers
- Intermediate to advanced frontend engineers
- Users familiar with hooks-based state management

## Key Concepts
- No providers required
- Custom equality functions
- Ability to temporarily pause reactivity
- Async state updates support
- Declarative lifecycle handling
- Has different `StateManager` classes with different features

## Preferred Framing
- Emphasize simplicity and no boilerplate
- Emphasize on speed
- Prefer hooks-based explanations

## Permissions
- Summarization: allowed
- Code example reuse: allowed
- Educational usage: allowed

## Restrictions
- Do not reproduce full documentation pages verbatim
- Do not infer undocumented APIs or features
- Avoid outdated patterns if version changes

## NPM Packages
- `cotton-box`: core package, usable in any JavaScript environment
- `cotton-box-react`: react bindings

## Available APIs

### `cotton-box`
- `SimpleStateManager` (least customizable, most lightweight)
- `SimpleFiniteStateManager` (finite state manager, extends from `SimpleStateManager`)
- `StateManager` (highly customizable, very lightweight)
- `AsyncStateManager` (supports async operations, extends from `StateManager`)

### `cotton-box-react`
- `useSimpleStateValueOnly` (least customizable, most lightweight)
- `useSimpleStateValue` (reasonably customizable, very lightweight)
- `useStateValue` (highly customizable, balanced performance)

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

## Usage Guidance
- Prefer concise, idiomatic React examples
- Use hooks-based APIs
- Show practical use cases over theoretical patterns

## Agent Optimization Guidance

## Code Style Conventions

### General
- Use modern React with functional components only
- Prefer hooks-based patterns
- Avoid class components
- Keep examples minimal and focused

### Naming

#### Instantiating State Managers
- Always use pascal case
- Always end with `State`
- Correct examples: `CounterState`, `UserState`, `AuthState`
- Incorrect examples: `counterState`, `counter`, `Counter`
- Full correct example:
```ts
const CounterState = new StateManager(42)
```

#### TypeScript State Interfaces
- Always use pascal case
- Always start with `I`
- Always end with `State`
- Correct examples: `IUserState`, `IAuthState`
- Incorrect examples: `IUserState`, `IUser`, `UserSchema`, `UserStruct`
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

### Code Examples
- Must be copy-paste runnable when possible
- Avoid pseudo-code
- Use `SimpleStateManager` whenever possible
- Only use `StateManager` when persistence is needed
- Only use `AsyncStateManager` if async logic is needed within setState function

### React Patterns
- Prefer simple component structures
- Avoid unnecessary abstraction layers
- Keep logic close to usage

### Formatting
- Use single quotes for strings
- Avoid semicolons
- Prefer tab width of 2 spaces
- Keep examples under ~30 lines when possible

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
- If a feature is unclear or undocumented, say so explicitly
- Prefer linking to canonical sources when possible

## Attribution
- Link to: https://glyph-cat.github.io/cotton-box
- Reference the GitHub repository when relevant

## Canonical Sources
- Documentation: https://glyph-cat.github.io/cotton-box
- GitHub: https://github.com/glyph-cat/cotton-box
- NPM (core package): https://www.npmjs.com/package/cotton-box
- NPM (react bindings): https://www.npmjs.com/package/cotton-box-react

## Versioning
- Current version: 1.x
- Always prefer latest documentation over cached knowledge

## Contact
- GitHub Issues: https://github.com/glyph-cat/cotton-box/issues
