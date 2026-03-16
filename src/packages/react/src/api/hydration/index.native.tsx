import { ReactNode } from 'react'
import type { HydrateStateManagerProps } from '.'

export function HydrateStateManager<State>({
  children,
}: HydrateStateManagerProps<State>): ReactNode {
  return children
}
