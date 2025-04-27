import { DocConstants } from '@site/src/constants'
import { ElementType, JSX } from 'react'
import { ApiLink } from '../api-link'
import { LabeledItem } from '../labeled-item'
import labeledItemStyles from '../labeled-item/index.module.css'

export enum DataType {
  any,
  boolean,
  string,
  Function,
  Array,
  class,
  interface,
  type,
  enum,
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
  StateManagerVisibility,
  SimpleStateManagerOptions,
  StateManagerOptions,
  SetStateFn,
  StateSelector,
  WaitEvaluator,
  EqualityFn,
  StateTransition,
  BuildType,
  FunctionComponent,
  ReactNode,
}

export interface TypeDisplayProps {
  children: DataType | Array<DataType>
  containerElement?: ElementType
  typeIsArrayOf?: boolean
}

export function TypeDisplay({
  children,
  containerElement: ContainerElement = 'p',
  typeIsArrayOf,
}: TypeDisplayProps): JSX.Element {

  const possibleTypes = Array.isArray(children) ? children : [children]

  const renderStack = []
  for (let i = 0; i < possibleTypes.length; i++) {
    const type = possibleTypes[i]
    renderStack.push(
      <ApiLink
        key={type}
        href={URLs[type]}
      >
        {DataType[type]}
      </ApiLink>
    )
    if (i < (possibleTypes.length - 1)) {
      renderStack.push(
        <span
          key={i}
          className={labeledItemStyles.label}>
          {i === (possibleTypes.length - 2) ? ' or ' : ', '}
        </span>
      )
    }
  }

  return (
    <ContainerElement>
      <LabeledItem label='Type'>
        {typeIsArrayOf
          ? <>
            <ApiLink href={URLs[DataType.Array]}>Array</ApiLink>
            <span className={labeledItemStyles.label}>{' (of '}</span>
            {renderStack}
            <span className={labeledItemStyles.label}>{')'}</span>
          </>
          : renderStack
        }
      </LabeledItem>
    </ContainerElement>
  )
}

const URLs: Record<DataType, string> = {
  [DataType.any]: DocConstants.TYPE_REFERENCE_URL_ANY,
  [DataType.boolean]: DocConstants.TYPE_REFERENCE_URL_BOOLEAN,
  [DataType.string]: DocConstants.TYPE_REFERENCE_URL_STRING,
  [DataType.Function]: DocConstants.TYPE_REFERENCE_URL_FUNCTION,
  [DataType.Array]: DocConstants.TYPE_REFERENCE_URL_ARRAY,
  [DataType.class]: DocConstants.TYPE_REFERENCE_URL_CLASS,
  [DataType.interface]: DocConstants.TYPE_REFERENCE_URL_INTERFACE,
  [DataType.type]: DocConstants.TYPE_REFERENCE_URL_TYPE,
  [DataType.enum]: DocConstants.TYPE_REFERENCE_URL_ENUM,
  [DataType.StateManagerVisibility]: `${DocConstants.DOCS_API_CORE_URL}/StateManagerVisibility`,
  [DataType.SimpleStateManager]: `${DocConstants.DOCS_API_CORE_URL}/SimpleStateManager`,
  [DataType.StateManager]: `${DocConstants.DOCS_API_CORE_URL}/StateManager`,
  [DataType.AsyncStateManager]: `${DocConstants.DOCS_API_CORE_URL}/AsyncStateManager`,
  [DataType.SimpleStateManagerOptions]: `${DocConstants.DOCS_API_CORE_URL}/SimpleStateManagerOptions`,
  [DataType.StateManagerOptions]: `${DocConstants.DOCS_API_CORE_URL}/StateManagerOptions`,
  [DataType.SetStateFn]: `${DocConstants.DOCS_API_CORE_URL}/SetStateFn`,
  [DataType.StateSelector]: `${DocConstants.DOCS_API_CORE_URL}/StateSelector`,
  [DataType.WaitEvaluator]: `${DocConstants.DOCS_API_CORE_URL}/WaitEvaluator`,
  [DataType.EqualityFn]: `${DocConstants.DOCS_API_CORE_URL}/EqualityFn`,
  [DataType.StateTransition]: `${DocConstants.DOCS_API_CORE_URL}/StateTransition`,
  [DataType.BuildType]: `${DocConstants.DOCS_API_MISC_URL}/BuildType`,
  [DataType.FunctionComponent]: 'https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components',
  [DataType.ReactNode]: 'https://react.dev/learn/typescript#typing-children',
}
