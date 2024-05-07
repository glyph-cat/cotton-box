# Changelog

* Passing `StateManager` and `AsyncStateManager` to `useSimpleStateValue` and `useSimpleStateValueWithReactiveSelector` will *not* cause an error to be thrown. This is the same behavior as v0.0.0. Instead, rely on TypeScript's type-checking to prevent passing the wrong State Manager type. This change is made to reduce some runtime overhead in the hooks by not having to validate the State Manager types.
