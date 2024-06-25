# Changelog

`useInitState` has been removed in favor of a more direct way to find out if a State Manager is initializing:

```diff
- const isInitializing = useInitState(ExampleState)
+ const isInitializing = useSimpleStateValue(ExampleState.isInitializing)
```

The way `useInitState` works internally is also similar to calling `useSimpleStateValue`. By having one less hook means the codebase will have less complexity and becomes easier to maintain.

On top of that, now that `isInitializing` is exposed as a State Manager itself, this means it is also possible to watch for the changes and even use it with other UI libraries/frameworks such as Vue and Angular with significantly less friction.
