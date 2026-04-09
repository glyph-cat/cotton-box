import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import { ReactNode } from 'react'

export interface PackageManagerCommandProps {
  children: string
  title?: string
}

export function PackageManagerCommand({
  children,
  title,
}: PackageManagerCommandProps): ReactNode {
  children = children['props'] ? children['props']['children'] : children
  if (Array.isArray(children)) { children = children.join('') }
  const npmInstallCommand = /npm install/
  return (
    <Tabs groupId='language'>
      <TabItem value='npm' label='NPM' default>
        <CodeBlock language='sh' title={title}>
          {children}
        </CodeBlock>
      </TabItem>
      <TabItem value='yarn' label='Yarn' default>
        <CodeBlock language='sh' title={title}>
          {children.replace(npmInstallCommand, 'yarn add')}
        </CodeBlock>
      </TabItem>
      <TabItem value='pnpm' label='PNPM' default>
        <CodeBlock language='sh' title={title}>
          {children.replace(npmInstallCommand, 'pnpm add')}
        </CodeBlock>
      </TabItem>
      <TabItem value='bun' label='Bun' default>
        <CodeBlock language='sh' title={title}>
          {children.replace(npmInstallCommand, 'bun add')}
        </CodeBlock>
      </TabItem>
      <TabItem value='deno' label='Deno' default>
        <CodeBlock language='sh' title={title}>
          {children.replace(npmInstallCommand, 'deno add').split(' ')
            .map((chunk, index) => {
              if (index < 2) { return chunk }
              return `npm:${chunk}`
            }).join(' ')
          }
        </CodeBlock>
      </TabItem>
    </Tabs>
  )
}
