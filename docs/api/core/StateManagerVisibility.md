# StateManagerVisibility

> import { ApiLink } from '@site/src/components/api-link'
import { MarkdownWrapper } from '@site/src/components/markdown-wrapper'
import { DevToolsPreview } from '@site/src/components/special/dev-tools-preview'
import { DataType, TypeDisplay } from '@site/src/components/type-display'
import * as DocConstants from '@site/src/constants/doc'

# StateManagerVisibility

:::danger[Deprecation notice]
This is not a reliable way to hide sensitive values.

While this works for React Dev Tools, the built-in memory inspector in most browsers will still be able to show the value anyway. Please consider storing sensitive information on the server and only expose what's absolutely necessary to the client instead.

Starting from version `1.1.0`, this option will be completely ignored.
:::

## Overview

<TypeDisplay>{DataType.enum}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_DESC_OPTIONS_VISIBILITY_DETAILED}</MarkdownWrapper>

This can be specified in the [`options`](./StateManagerOptions.mdx) parameter in the constructor of the State Manager:
```js

const ExampleState = new StateManager('Hello, world!', {
  visibility: StateManagerVisibility.HIDDEN,
})
```

## Values

| Key           | Value | Description                                              |
| ------------- | :---: | -------------------------------------------------------- |
| `ENVIRONMENT` |  `0`  | {DocConstants.DESC_STATE_MANAGER_VISIBILITY_ENVIRONMENT} |
| `EXPOSED`     |  `1`  | {DocConstants.DESC_STATE_MANAGER_VISIBILITY_EXPOSED}     |
| `HIDDEN`      |  `2`  | {DocConstants.DESC_STATE_MANAGER_VISIBILITY_HIDDEN}      |

<DevToolsPreview />
