# About tests related to the `active` flag...

Test strategy: Test initial values with default/true/false.

Then, test with:

- true -> false -> true
- false -> true -> false

Tests involving the `active` flag is separated because the logic to test it alone is is quite redundant. For server-side rendering though, it is done in 'index.test.tsx' because we only need to check the rendered value.

For `useSimpleStateValue`, client-active-flag is further splited into different files because this makes updating the test cases easier. You can modify one of the files, then use VS Code's diff editor to apply changes to the other file as you compare them side by side.
