# ReadOnlyStateManager

> import { MarkdownWrapper } from '@site/src/components/markdown-wrapper'
import * as DocConstants from '@site/src/constants/doc'
import { DataType, TypeDisplay } from '@site/src/components/type-display'

# ReadOnlyStateManager

## Overview

<TypeDisplay>{DataType.type}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_TYPE_DESC_READONLY_STATE_MANAGER}</MarkdownWrapper>

```ts
type ReadOnlyStateManager<State> = Pick<SimpleStateManager<State>, 'name' | 'get' | 'watch' | 'wait'>
```
