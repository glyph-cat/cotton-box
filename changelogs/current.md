# V1.X.X

## v1.1.0

### cotton-box
- `options.visibility` has been deprecated.
  - It is not a reliable way to hide sensitive values.
  - While this works for React Dev Tools, the built-in memory inspector in most browsers will still be able to show the value anyway.
  - Please consider storing sensitive information on the server and only expose what's absolutely necessary to the client instead.
- Type definitions now include examples.
- Internal performance optimizations.

### cotton-box-react
- `options.visibility` now no longer does anything in React Developer Tools.
- Type definitions now include examples.
- Internal performance optimizations.

## v1.0.0

### cotton-box
- This package now has the following external dependencies:
  - [`@glyph-cat/foundation`](https://www.npmjs.com/package/@glyph-cat/foundation)
  - [`@glyph-cat/type-checking`](https://www.npmjs.com/package/@glyph-cat/type-checking)
- Fixed `README.md` now displays the correct description: _"This is the core package of cotton-box."_ instead of _"This is the official React bindings for cotton-box."_
- `Watcher` has been moved back to [`@glyph-cat/swiss-army-knife`](https://github.com/glyph-cat/swiss-army-knife)
  - An internal implementation of "Watcher" still remains, but it is optimized for Cotton Box only (behavior and API can change suddenly), so it no longer makes sense to expose the `Watcher` API from this package.
- `.watch` and `.wait` no longer includes event type.
- State manager names remain optional, but if not provided, automatic names will no longer be generated either.
- Internal performance optimizations.

### cotton-box-react
- This package now has the following external dependencies:
  - [`@glyph-cat/foundation`](https://www.npmjs.com/package/@glyph-cat/foundation)
  - [`@glyph-cat/type-checking`](https://www.npmjs.com/package/@glyph-cat/type-checking)
- This package now requires React 19 (or above) to work
- There is now a bundle specifically for React Native that excludes SSR logic which is only used for web (dead code in the case of React Native).
  - No changes are required to take advantage of this optimization
  - Web compilers (eg: babel, webpack) and React Native bundler (Metro) will be able to automatically select the correct bundle when compiling.
- Added new hook `useSimpleStateValueOnly`. It is similar to `useSimpleStateValue` but does not support any additional options or selectors.
- `useSimpleStateValueOnly` and `useSimpleStateValue` returns the `never` type when used with `StateManager` or `AsyncStateManager`. They are designed to be used with `SimpleStateManager` or `SimpleFiniteStateManager` only.
- Removed previously deprecated APIs:
  - `useSimpleStateValueWithReactiveSelector`
  - `useStateValueWithReactiveSelector`
- Internal performance optimizations.
