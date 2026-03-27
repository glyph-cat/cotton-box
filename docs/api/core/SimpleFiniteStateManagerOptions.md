# SimpleStateManagerOptions

> import { MarkdownWrapper } from '@site/src/components/markdown-wrapper'
import { ObjectShapeDefinition } from '@site/src/components/object-shape-definition'
import { DataType, TypeDisplay } from '@site/src/components/type-display'
import * as DocConstants from '@site/src/constants/doc'

# SimpleStateManagerOptions

## Overview

<TypeDisplay>{DataType.interface}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_DESC_OPTIONS_SIMPLE_FINITE}</MarkdownWrapper>

## Properties

<ObjectShapeDefinition
  data={[
    {
      name: 'name',
      type: DataType.string,
      defaultValue: `[\`undefined\`](${DocConstants.TYPE_REFERENCE_URL_UNDEFINED})`,
      description: DocConstants.TSDOC_DESC_OPTIONS_NAME,
    },
    {
      name: 'serializeState',
      type: DataType.Function,
      defaultValue: '`String(...)`',
      description: DocConstants.TSDOC_DESC_OPTIONS_SERIALIZE_STATE,
    },
  ]}
/>
