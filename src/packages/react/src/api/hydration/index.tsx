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
 * @example
 * ```tsx
 * import { ReactNode } from 'react'
 *
 * interface AppProps {
 *   counterValueFromDatabase: number
 * }
 *
 * export default function App({ counterValueFromDatabase }: AppProps): ReactNode {
 *   return (
 *     <HydrateStateManager
 *       values={[
 *         [CounterState, ({ commit }) => { commit(counterValueFromDatabase) }]
 *       ]}
 *     >
 *       <Navbar />
 *       <HomeScreen />
 *       <Footer />
 *     </HydrateStateManager>
 *   )
 * }
 * ```
 * @public
 */
export function HydrateStateManager<State>({
  children,
  values,
}: HydrateStateManagerProps<State>): ReactNode {
  // KIV: Checked on 2026-03-20 (1d415a1), bundle is generated correctly.
  // KIV: It just happens so that code is splitted here, '.native.tsx' was never used because unused prop `values,` is still present in the final output. Solution: downgrade to '@rollup/plugin-node-resolve' v13.3.0
  if (IS_CLIENT_ENV) {
    return children
  } else {
    // Inherit hydration map by creating as new instance, because we are calling `.set` below.
    const childHydrationMap = new HydrationMap(use(HydrationMapContext) ?? [])
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
}
