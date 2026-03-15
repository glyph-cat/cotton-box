import CodeInline from '@theme/CodeInline'
import { ReactNode } from 'react'
import { Link } from '../custom-link'
import { LabeledItem } from '../labeled-item'

export interface InheritedFromProps {
  name: string
  href: string
}

export function InheritedFrom({
  name,
  href,
}: InheritedFromProps): ReactNode {
  return (
    <p>
      <LabeledItem label='Inherited from'>
        <Link href={href}>
          <CodeInline>
            {name}
          </CodeInline>
        </Link>
      </LabeledItem>
    </p>
  )
}
