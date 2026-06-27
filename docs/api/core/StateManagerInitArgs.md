# StateManagerInitArgs

> <TypeDisplay>{DataType.interface}</TypeDisplay>

# StateManagerInitArgs

## Overview

<TypeDisplay>{DataType.interface}</TypeDisplay>

<MarkdownWrapper>{DocConstants.TSDOC_DESC_STATE_MANAGER_INIT_ARGS}</MarkdownWrapper>

## Properties

<ObjectShapeDefinition
  hideOptional
  data={[
    {
      name: 'currentState',
      type: DataType.any,
      description: DocConstants.COMMON_DESC_CURRENT_STATE,
    },
    {
      name: 'defaultState',
      type: DataType.any,
      description: DocConstants.COMMON_DESC_DEFAULT_STATE,
    },
    {
      name: 'commit',
      type: DataType.Function,
      description: DocConstants.TSDOC_DESC_INIT_COMMIT,
    },
    {
      name: 'commitNoop',
      type: DataType.Function,
      description: DocConstants.TSDOC_DESC_INIT_COMMIT_NOOP,
    },
  ]} 
/>
