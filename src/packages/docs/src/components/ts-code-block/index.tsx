import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import { ReactElement } from 'react'

export interface TSCodeBlockProps {
  children: [tsCode: ReactElement, jsCode: ReactElement]
  title?: string
}

export function TSCodeBlock({
  children,
  title,
}: TSCodeBlockProps): JSX.Element {
  const renderStack = []
  for (const child of children) {
    const className = child.props.children.props.className as string
    if (title && child.props.children.props.metastring?.match(/title="/)) {
      throw new Error('metastring should not have title if it is already specified as a prop')
    }
    if (className.match(/ts/gi)) {
      // TS always as the first tab
      renderStack.unshift(
        <TabItem value='ts' label='TypeScript' default>
          <CodeBlock
            key='ts'
            language='ts'
            metastring={child.props.children.props.metastring}
            title={title}
          >
            {child.props.children.props.children}
          </CodeBlock>
        </TabItem>
      )
    } else if (className.match(/js/gi)) {
      renderStack.push(
        <TabItem value='js' label='JavaScript'>
          <CodeBlock
            key='js'
            language='js'
            metastring={child.props.children.props.metastring}
            title={title}
          >
            {child.props.children.props.children}
          </CodeBlock>
        </TabItem>
      )
    } else {
      throw new Error(`Invalid className: ${className}`)
    }
  }
  return (
    <Tabs groupId='language'>
      {renderStack}
    </Tabs>
  )
}
