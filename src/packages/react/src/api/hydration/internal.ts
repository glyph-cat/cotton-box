import type { AsyncStateManager, StateManager } from 'cotton-box'
import { createContext, useContext } from 'react'
import { Nullable } from '../../abstractions'

// Key = original state manager, Value = isolated/static state manager on server-side
export class HydrationMap<State> extends Map<StateManager<State> | AsyncStateManager<State>, StateManager<State> | AsyncStateManager<State>> { }

export const HydrationMapContext = createContext<Nullable<HydrationMap<any>>>(null)

export function useResolveHydrationStateManager<State>(
  stateManager: StateManager<State> | AsyncStateManager<State>,
): StateManager<State> | AsyncStateManager<State> {
  const hydrationMap = useContext(HydrationMapContext)
  if (typeof window !== 'undefined') {
    return stateManager // Early exit, client-side only.
  }
  // NOTE: If not `StateManager` or `AsyncStateManager`, it should have been `undefined`.
  return hydrationMap?.get(stateManager) ?? stateManager
}
