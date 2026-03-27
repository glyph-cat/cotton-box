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
