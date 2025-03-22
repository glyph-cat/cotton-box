import CodeInline from '@theme/CodeInline'
import { JSX } from 'react'
import { Link } from '../custom-link'
import { LabeledItem } from '../labeled-item'

export interface InheritedFromProps {
  name: string
  href: string
}

export function InheritedFrom({
  name,
  href,
}: InheritedFromProps): JSX.Element {
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
