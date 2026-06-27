# useSimpleStateValue

> <TypeDisplay>{DataType.Function}</TypeDisplay>

# useSimpleStateValue

## Overview

<TypeDisplay>{DataType.Function}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_DESC_USE_SIMPLE_STATE_VALUE}</MarkdownWrapper>

```js
const state = useSimpleStateValue(stateManager)
```
<details>
  <summary>Overloads (+2)</summary>
  <>
    ```js
    const state = useSimpleStateValue(stateManager, selector)
    ```
    ```js
    const state = useSimpleStateValue(stateManager, selector, active)
    ```
  </>
</details>

## Parameters

<ObjectShapeDefinition data={[
  {
    name: 'stateManager',
    type: [
      DataType.SimpleStateManager,
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

### Conditionally watch for changes

<SimpleWebPlayground code={CODE_EXAMPLE_ACTIVE} />
