import { useHistory } from '@docusaurus/router'
import { DocConstants } from '@site/src/constants'
import { AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent, ReactNode, useCallback } from 'react'

// Reference: https://docusaurus.io/docs/markdown-features/links
// "Markdown file references only work when the source and target files are
// processed by the same plugin instance..."
// Even though all links have '.mdx', some of them are not stripped off when
// passed to the <a> element when using docusaurus' <Link> component.

// Hacky drop-in replacement:

export type LinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { href: string }

export function Link({
  children,
  href,
  ...otherProps
}: LinkProps): ReactNode {

  const { push } = useHistory()

  // If link references to origin of docs site, then use `push` instead
  // Original reference localhost origin: /^http:\/\/localhost:3000\/?/

  // KIV: Formerly in violation of CodeQL 'js/incomplete-sanitization'
  const normalizedOrigin = typeof window !== 'undefined'
    ? window.location.origin
    : DocConstants.GLYPH_CAT_GITHUB_IO

  // Apparently slashes in 'https://' are automatically escaped
  const URL_REGEX = new RegExp(`^${normalizedOrigin}\\/?`)

  const containsOrigin = String(href).includes(normalizedOrigin)
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
