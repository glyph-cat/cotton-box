import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

// Yarn FTW

export interface YarnToNPMProps {
  children: string
  title?: string
}

export function YarnToNPM({
  children,
  title,
}: YarnToNPMProps): JSX.Element {
  children = children['props'] ? children['props']['children'] : children
  if (Array.isArray(children)) { children = children.join('') }
  return (
    <Tabs groupId='language'>
      <TabItem value='yarn' label='Yarn' default>
        <CodeBlock language='sh' title={title}>{children}</CodeBlock>
      </TabItem>
      <TabItem value='npm' label='NPM' default>
        <CodeBlock language='sh' title={title}>
          {children.replace(/yarn add/, 'npm install')}
        </CodeBlock>
      </TabItem>
    </Tabs>
  )
}
