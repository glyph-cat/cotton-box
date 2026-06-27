# useStateValue

> <TypeDisplay>{DataType.Function}</TypeDisplay>

# useStateValue

## Overview

<TypeDisplay>{DataType.Function}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_DESC_USE_STATE_VALUE}</MarkdownWrapper>

```js
const state = useStateValue(stateManager)
```
<details>
  <summary>Overloads (+4)</summary>
  <>
    ```js
    const state = useStateValue(stateManager, selector)
    ```
    ```js
    const state = useStateValue(stateManager, selector, active)
    ```
    ```js
    const state = useStateValue(stateManager, selector, equalityFn)
    ```
    ```js
    const state = useStateValue(stateManager, selector, equalityFn, active)
    ```
  </>
</details>

## Parameters

<ObjectShapeDefinition data={[
  {
    name: 'stateManager',
    type: [
      DataType.SimpleStateManager,
      DataType.StateManager,
      DataType.AsyncStateManager,
      DataType.SimpleFiniteStateManager,
    ],
    description: DocConstants.TSDOC_PARAM_DESC_STATE_MANAGER,
  },
  {
    name: 'selector',
    type: DataType.StateSelector,
    defaultValue: '`null`',
    description: DocConstants.TSDOC_PARAM_DESC_SELECTOR,
  },
  {
    name: 'equalityFn',
    type: DataType.EqualityFn,
    defaultValue: `[\`Object.is\`](${DocConstants.API_REFERENCE_URL_OBJECT_IS})`,
    description: DocConstants.TSDOC_PARAM_DESC_EQUALITY_FN,
  },
  {
    name: 'active',
    type: DataType.boolean,
    defaultValue: '`true`',
    description: DocConstants.TSDOC_PARAM_DESC_ACTIVE,
  },
]} />

## Examples

### Basic

<SimpleWebPlayground code={CODE_EXAMPLE_BASIC} />

### With selector

<SimpleWebPlayground code={CODE_EXAMPLE_SELECTOR} />

### Custom equality checking

<SimpleWebPlayground code={CODE_EXAMPLE_EQUALITY} />

### Conditionally watch for changes

<SimpleWebPlayground code={CODE_EXAMPLE_ACTIVE} />
