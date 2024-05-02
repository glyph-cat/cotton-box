import { Link } from '@site/src/components/custom-link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

export type MDXAProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export default function MDXA(props: MDXAProps): JSX.Element {
  return <Link {...props} />
}
