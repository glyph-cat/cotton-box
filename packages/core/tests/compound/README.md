Tests on similar methods of different State Manager types can be conducted here.

For example, it would be wasteful to create a test for `.waitForInit` for `StateManager`, and then duplicate the file, rename it, and change the variables so that it tests for `AsyncStateManager` instead.
