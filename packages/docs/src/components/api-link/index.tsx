import CodeInline from '@theme/CodeInline'
import { ReactNode } from 'react'
import { Link } from '../custom-link'

export interface ApiLinkProps {
  children: string
  href: string
}

export function ApiLink({
  children,
  href,
}: ApiLinkProps): ReactNode {
  return (
    <Link href={href}>
      <CodeInline>
        {children}
      </CodeInline>
    </Link>
  )
}
