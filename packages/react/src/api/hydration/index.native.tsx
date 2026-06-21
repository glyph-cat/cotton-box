import { ReactNode } from 'react'
import type { HydrateStateManagerProps } from '.'

// KIV: downgraded to '@rollup/plugin-node-resolve' v13.3.0 to accommodate this.

export function HydrateStateManager<State>({
  children,
}: HydrateStateManagerProps<State>): ReactNode {
  return children
}
