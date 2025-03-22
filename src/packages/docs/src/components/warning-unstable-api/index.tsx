import Admonition from '@theme/Admonition'
import { JSX } from 'react'

export interface WarningUnstableAPIProps {
  /**
   * Extra information
   */
  children?: string
}

export function WarningUnstableAPI({
  children,
}: WarningUnstableAPIProps): JSX.Element {
  return (
    <Admonition type='warning' title='Caution: Unstable API'>
      <p>The accepted parameters, return value and behavior of this function may change, and it might be renamed or entirely removed between minor versions in future releases.</p>
      {children && <p>{children}</p>}
    </Admonition>
  )
}
