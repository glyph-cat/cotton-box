# Quick Start

> import CODE_EXAMPLE from '!!raw-loader!@site/src/examples/learn/react/quick-start'
import { ApiLink } from '@site/src/components/api-link'
import { SimpleWebPlayground } from '@site/src/components/live-playground'

# Quick Start

Let's begin by importing <ApiLink href='../../api/react/useStateValue'>useStateValue</ApiLink> from `'cotton-box-react'`.
```js

```

Then, we can pass our State Manager to the hook.
```js
const state = useStateValue(ExampleState)
```

The example below shows how we can read from `CounterState` from inside a React component.

<SimpleWebPlayground code={CODE_EXAMPLE} />
