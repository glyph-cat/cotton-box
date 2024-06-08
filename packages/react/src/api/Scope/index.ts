import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { ReactNode, createContext, createElement, useContext } from 'react'
import { $ } from '../../abstractions'

type IStateManagerScopeContext = Record<number, SimpleStateManager<any> | StateManager<any>>

const StateManagerScopeContext = createContext<IStateManagerScopeContext>({})

/**
 * {:TSDOC_DESC_STATE_MANAGER_SCOPE_PROVIDER_PROPS:}
 * @see -{:DOCS_API_REACT_URL:}/StateManagerScopeProviderProps
 * @public
 */
export interface StateManagerScopeProviderProps {
  /**
   * {:TSDOC_PROP_STATE_MANAGER_SCOPE_CHILDREN:}
   */
  children: ReactNode
  /**
   * {:TSDOC_PROP_STATE_MANAGER_SCOPE_STATES:}
   */
  with: Array<SimpleStateManager<any> | StateManager<any> | AsyncStateManager<any>>
}

/**
 * {:TSDOC_DESC_STATE_MANAGER_SCOPE_PROVIDER:}
 * @see -{:DOCS_API_REACT_URL:}/StateManagerScopeProvider
 * @public
 */
export function StateManagerScopeProvider({
  children,
  with: stateManagers,
}: StateManagerScopeProviderProps): JSX.Element {
  const currentContext = useContext(StateManagerScopeContext)
  const nextContext = { ...currentContext }
  for (const stateManager of stateManagers) {
    // @ts-expect-error Because we forcefully overwritten the type property in the first place
    nextContext[(stateManager as $).scopeId] = stateManager
  }
  return createElement(StateManagerScopeContext.Provider, {
    value: nextContext,
  }, children)
}

/**
 * {:TSDOC_DESC_USE_SCOPED:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER_FOR_USE_SCOPE:}
 * @see -{:DOCS_API_REACT_URL:}/useScoped
 * @returns -{:RETURN_DESC_USE_SCOPED:}
 * @public
 */
export function useScoped<State>(stateManager: AsyncStateManager<State>): AsyncStateManager<State>

/**
 * {:TSDOC_DESC_USE_SCOPED:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER_FOR_USE_SCOPE:}
 * @see -{:DOCS_API_REACT_URL:}/useScoped
 * @returns -{:RETURN_DESC_USE_SCOPED:}
 * @public
 */
export function useScoped<State>(stateManager: StateManager<State>): StateManager<State>

/**
 * {:TSDOC_DESC_USE_SCOPED:}
 * @param stateManager - {:TSDOC_PARAM_DESC_STATE_MANAGER_FOR_USE_SCOPE:}
 * @see -{:DOCS_API_REACT_URL:}/useScoped
 * @returns -{:RETURN_DESC_USE_SCOPED:}
 * @public
 */
export function useScoped<State>(stateManager: SimpleStateManager<State>): SimpleStateManager<State>

export function useScoped<State>(
  stateManager: SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State>
): SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State> {
  const currentContext = useContext(StateManagerScopeContext)
  const scopedStateManager = currentContext?.[(stateManager as $).scopeId]
  return (scopedStateManager as SimpleStateManager<State> | StateManager<State> | AsyncStateManager<State>) ?? stateManager
}
