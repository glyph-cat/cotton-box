import useIsBrowser from '@docusaurus/useIsBrowser'
import { DocConstants } from '@site/src/constants'
import { stringMap } from '@site/src/utils/string-map'
import type { Props as CodeBlockProps } from '@theme/CodeBlock'
import ElementContent from '@theme/CodeBlock/Content/Element'
import StringContent from '@theme/CodeBlock/Content/String'
import React, { isValidElement } from 'react'

/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join('') : children
}

export default function CodeBlock({
  children: rawChildren,
  ...props
}: CodeBlockProps): JSX.Element {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser()
  const children = stringMap(maybeStringifyChildren(rawChildren), {
    CORE_PACKAGE_NAME: DocConstants.CORE_PACKAGE_NAME,
    REACT_PACKAGE_NAME: DocConstants.REACT_PACKAGE_NAME,
  }, false).data
  const CodeBlockComp = typeof children === 'string' ? StringContent : ElementContent
  return (
    <CodeBlockComp key={String(isBrowser)} {...props}>
      {children}
    </CodeBlockComp>
  )
}
