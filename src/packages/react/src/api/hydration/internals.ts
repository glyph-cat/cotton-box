import type { AsyncStateManager, StateManager } from 'cotton-box'
import { createContext, use } from 'react'
import { Nullable } from '../../abstractions'
import { IS_CLIENT_ENV } from '../../constants'

// Key = original state manager, Value = isolated/static state manager on server-side
export class HydrationMap<State> extends Map<StateManager<State> | AsyncStateManager<State>, StateManager<State> | AsyncStateManager<State>> { }

export const HydrationMapContext = createContext<Nullable<HydrationMap<any>>>(null)

export function useResolveHydrationStateManager<State>(
  stateManager: StateManager<State> | AsyncStateManager<State>,
): StateManager<State> | AsyncStateManager<State> {
  if (IS_CLIENT_ENV) {
    return stateManager // Early exit, client-side only.
  }
  // NOTE: If not `StateManager` or `AsyncStateManager`, `hydrationMap` should not
  // contain the substitute state manager.
  return use(HydrationMapContext)?.get(stateManager) ?? stateManager
}
