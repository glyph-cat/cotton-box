# Changelog

* The `isInitializing` property of `StateManager` and `AsyncStateManager` is now exposed as a `ReadOnlyStateManager`.
* Removed method `.waitForInit` in favor of calling `….isInitializing.wait(false)` directly.
* State Managers without names will be assigned automatic names (`UnnamedStateManager_001`, `UnnamedStateManager_002`, and so on).
