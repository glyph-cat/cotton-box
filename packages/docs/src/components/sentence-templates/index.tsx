import CodeInline from '@theme/CodeInline'
import { MarkdownWrapper } from '../markdown-wrapper'
import { DocConstants } from '@site/src/constants'

export interface DoesNotTakeAnyParametersProps {
  name: string
}

export function DoesNotTakeAnyParameters({
  name,
}: DoesNotTakeAnyParametersProps): JSX.Element {
  return (
    <p>
      <CodeInline>{name}</CodeInline> does not take any parameters.
    </p>
  )
}

interface DoesNotReturnAnythingProps {
  name: string
}

function DoesNotReturnAnything({
  name,
}: DoesNotReturnAnythingProps): JSX.Element {
  return (
    <p>
      <CodeInline>{name}</CodeInline> does not return anything.
    </p>
  )
}

export interface ReturnsProps {
  name: string
  children: string
}

export function Returns({
  name,
  children,
}: ReturnsProps): JSX.Element {
  if (children === DocConstants.TYPE_UNDEFINED) {
    return <DoesNotReturnAnything name={name} />
  } else {
    const childStack = children.split('')
    childStack[0] = childStack[0].toLowerCase()
    return (
      <MarkdownWrapper>
        {`\`${name}\` returns ${childStack.join('')}`}
      </MarkdownWrapper>
    )
  }
}
