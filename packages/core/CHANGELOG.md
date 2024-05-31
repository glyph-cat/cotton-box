# Changelog

* The `wait` method now will only wait for the state to match or evaluator to return true, without checking if the state is currently initializing.
* Added new method `waitForInit` to `StateManager` and `AsyncStateManager`
* Added new method `reinitialize` to `StateManager` and `AsyncStateManager`
* `currentState` is now exposed in the `lifecycle.init` callback
* New property `isInitializing` exposed for `StateManager` and `AsyncStateManager`
