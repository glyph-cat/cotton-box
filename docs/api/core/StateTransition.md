# StateTransition

> import { MarkdownWrapper } from '@site/src/components/markdown-wrapper'
import * as DocConstants from '@site/src/constants/doc'
import { DataType, TypeDisplay } from '@site/src/components/type-display'

# StateTransition

## Overview

<TypeDisplay>{DataType.type}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_TYPE_DESC_STATE_TRANSITION}</MarkdownWrapper>

```ts
type StateTransition<State> = [fromState: State, toState: State]
```
