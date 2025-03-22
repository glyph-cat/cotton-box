import { JSX } from 'react'
import Markdown, { Options } from 'react-markdown'
import { Link } from '../custom-link'

export interface MarkdownWrapperProps extends Options {
  unwrapParagraph?: boolean
}

export function MarkdownWrapper({
  children,
  unwrapParagraph,
  ...otherProps
}: MarkdownWrapperProps): JSX.Element {
  return (
    <Markdown
      components={{ 'a': Link }}
      {...otherProps}
      disallowedElements={unwrapParagraph
        ? ['p', ...(otherProps?.disallowedElements || [])]
        : otherProps.disallowedElements
      }
      unwrapDisallowed={otherProps?.unwrapDisallowed ?? unwrapParagraph}
    >
      {children}
    </Markdown>
  )
}
