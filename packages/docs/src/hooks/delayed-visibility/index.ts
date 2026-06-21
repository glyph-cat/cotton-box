import { useEffect, useReducer } from 'react'

const visibilityReducer = () => true

export function useDelayedVisibility(): boolean {
  const [visible, setVisibilityTrue] = useReducer(visibilityReducer, false)
  useEffect(setVisibilityTrue, [setVisibilityTrue])
  return visible
}
