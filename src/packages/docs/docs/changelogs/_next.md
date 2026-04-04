## v1.1.0

### cotton-box
- `options.visibility` has been deprecated.
  - It is not a reliable way to hide sensitive values.
  - While this works for React Dev Tools, the built-in memory inspector in most browsers will still be able to show the value anyway.
  - Please consider storing sensitive information on the server and only expose what's absolutely necessary to the client instead.
- `SimpleFiniteStateManager` will now show a warning when calling `.reset()` if there is no valid state transition from the current state to the default state. Starting from v2, an `InvalidStateTransitionError` will be thrown.
- `SimpleFiniteStateManager` now has a new `.tryReset()` method.
- Examples have been added to every API via the `@example` TSDoc tag.
- Internal performance optimizations.

### cotton-box-react
- `options.visibility` now no longer does anything in React Developer Tools.
- Examples have been added to every API via the `@example` TSDoc tag.
- Internal performance optimizations.
