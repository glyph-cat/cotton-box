import type { AsyncStateManager, StateManager, StateManagerLifecycle } from 'cotton-box'
import { JSX, ReactNode, useContext } from 'react'
import { HydrationMap, HydrationMapContext } from './internal'

/**
 * @public
 */
export interface HydrateStateManagerProps<State> {
  children?: ReactNode
  values: Array<[
    stateManager: StateManager<State> | AsyncStateManager<State>,
    hydrate: Required<StateManagerLifecycle<State>>['init'],
  ]>
}

/**
 * Experimental API for hydration when server-side rendering is involved.
 * @public
 */
export function HydrateStateManager<State>(
  props: HydrateStateManagerProps<State>
): JSX.Element {
  const HydrationComponent = typeof window !== 'undefined'
    ? HydrateForClient
    : HydrateForServer
  return <HydrationComponent {...props} />
}

function HydrateForClient<State>({
  children,
  values,
}: HydrateStateManagerProps<State>): JSX.Element {
  for (const [stateManager, hydrate] of values) {
    if (stateManager.isInternalHydrated) { continue }
    stateManager.internalHydrate(hydrate)
  }
  return <>{children}</> // Early exit, client-side only.
}

function HydrateForServer<State>({
  children,
  values,
}: HydrateStateManagerProps<State>): JSX.Element {
  const parentHydrationMap = useContext(HydrationMapContext) ?? new HydrationMap()
  const childHydrationMap = new HydrationMap(parentHydrationMap)
  for (const [stateManager, hydrate] of values) {
    const clonedStateManager = stateManager.internalClone()
    clonedStateManager.internalHydrate(hydrate)
    childHydrationMap.set(stateManager, clonedStateManager)
  }
  return (
    <HydrationMapContext value={childHydrationMap}>
      {children}
    </HydrationMapContext>
  )
}
