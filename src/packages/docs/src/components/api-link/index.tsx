import CodeInline from '@theme/CodeInline'
import { JSX } from 'react'
import { Link } from '../custom-link'

export interface ApiLinkProps {
  children: string
  href: string
}

export function ApiLink({
  children,
  href,
}: ApiLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <CodeInline>
        {children}
      </CodeInline>
    </Link>
  )
}
