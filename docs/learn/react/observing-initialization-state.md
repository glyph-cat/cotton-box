# Observing Initialization State

> To determine if a state is initializing, we can use the `.isInitializing` property. It is a  <ApiLink href='../../api/core/StateManagerInitArgs'>ReadOnlyStateManager</ApiLink> where only the `.get`, `.watch` and `.wait` methods are available.

# Observing Initialization State

To determine if a state is initializing, we can use the `.isInitializing` property. It is a  <ApiLink href='../../api/core/StateManagerInitArgs'>ReadOnlyStateManager</ApiLink> where only the `.get`, `.watch` and `.wait` methods are available.

In React, we would <ApiLink href='../../api/react/useSimpleStateValue'>useSimpleStateValue</ApiLink> to subscribe to the changes of this read-only State Manager as demonstrated in the example below:

## Example

<SimpleWebPlayground code={CODE_EXAMPLE} />
