import { useHistory } from '@docusaurus/router'
import { AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent, useCallback } from 'react'

const URL_REGEX = /^http:\/\/localhost:3000\/?/ // TODO: [critical] Change URL

// Reference: https://docusaurus.io/docs/markdown-features/links
// "Markdown file references only work when the source and target files are
// processed by the same plugin instance..."
// Even though all links have '.mdx', some of them are not stripped off when
// passed to the <a> element when using docusaurus' <Link> component.

// Hacky drop-in replacement:

export type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export function Link({
  children,
  href,
  ...otherProps
}: LinkProps): JSX.Element {

  const { push } = useHistory()

  const containsOrigin = URL_REGEX.test(href)
  const isSameOrigin = containsOrigin || /^(\.|\/)/.test(href)

  // TODO: [critical] Replace portion after # with lowercase letters

  href = href.replace(/\.mdx?$/, '')
  if (containsOrigin) { href = href.replace(URL_REGEX, '/') }

  const onClick = useCallback((e: MouseEvent) => {
    if (isSameOrigin) {
      // metaKey for open in new tab
      // shiftKey for add to reading list, at least in Safari
      if (!e.metaKey && !e.shiftKey) {
        push(href)
        e.preventDefault()
      }
    }
  }, [href, isSameOrigin, push])

  return (
    <a
      href={href}
      onClick={onClick}
      {...isSameOrigin ? {} : {
        target: '_blank',
        rel: 'noreferrer',
      }}
      {...otherProps}
    >
      {children}
    </a>
  )
}
