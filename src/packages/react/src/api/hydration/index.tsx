import type { AsyncStateManager, StateManager, StateManagerLifecycle } from 'cotton-box'
import { ReactNode, use } from 'react'
import { IS_CLIENT_ENV } from '../../constants'
import { HydrationMap, HydrationMapContext } from './internals'

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
 * This does nothing on the client and state managers will hydrate through `lifecycle.init`.
 * @public
 */
export function HydrateStateManager<State>({
  children,
  values,
}: HydrateStateManagerProps<State>): ReactNode {
  if (IS_CLIENT_ENV) {
    return children
  } else {
    const parentHydrationMap = use(HydrationMapContext)
    const childHydrationMap = parentHydrationMap ?? new HydrationMap()
    for (const [stateManager, hydrate] of values) {
      const clonedStateManager = stateManager.internalClone()
      clonedStateManager.internalHydrateSSR(hydrate)
      childHydrationMap.set(stateManager, clonedStateManager)
    }
    return (
      <HydrationMapContext value={childHydrationMap}>
        {children}
      </HydrationMapContext>
    )
  }
  // TODO: How is `HydrateForClient` even needed?
  // `lifecycle.init` is automatic and should have been sufficient.
  // TOFIX: Never run server logic for RN build
  // const HydrationComponent = IS_CLIENT_ENV
  //   ? HydrateForClient
  //   : HydrateForServer
  // return <HydrationComponent {...props} />
}

// function HydrateForClient<State>({
//   children,
//   values,
// }: HydrateStateManagerProps<State>): ReactNode {
//   for (const [stateManager, hydrate] of values) {
//     if (stateManager.isInternalHydrated) { continue }
//     stateManager.internalHydrate(hydrate)
//   }
//   return <>{children}</> // Early exit, client-side only.
// }

// function HydrateForServer<State>({
//   children,
//   values,
// }: HydrateStateManagerProps<State>): ReactNode {
//   const parentHydrationMap = use(HydrationMapContext)
//   const childHydrationMap = parentHydrationMap ?? new HydrationMap()
//   for (const [stateManager, hydrate] of values) {
//     const clonedStateManager = stateManager.internalClone()
//     clonedStateManager.internalHydrate(hydrate)
//     childHydrationMap.set(stateManager, clonedStateManager)
//   }
//   return (
//     <HydrationMapContext value={childHydrationMap}>
//       {children}
//     </HydrationMapContext>
//   )
// }
