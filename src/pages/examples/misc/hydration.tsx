import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { HydrateStateManager } from 'packages/react/src/api/hydration'
import { ReactNode, useEffect, useReducer } from 'react'

export default function App(): ReactNode {
  const [f, forceUpdate] = useReducer((c) => c + 1, 0)
  useEffect(() => {
    setTimeout(() => {
      forceUpdate()
      console.log('forceUpdate')
    }, 1000)
  }, [])
  return (
    <HydrateStateManager
      ////@ts-expect-error
      // .filter((_, i) => i <= f)
      values={[
        [ExampleState, ({ commit }) => { console.log('commit(1)'); commit(1) }],
        [ExampleState2, ({ commit }) => { console.log('commit(42)'); commit(42) }],
      ]}
    >
      <Component />
      <br />
      <span>{f}</span>
    </HydrateStateManager>
  )
}

function Component(): ReactNode {
  const value = useStateValue(ExampleState)
  const value2 = useStateValue(ExampleState2)
  return <>
    <span>{value}</span>
    <br />
    <span>{value2}</span>
  </>
}

const ExampleState = new StateManager(0, {
  lifecycle: {
    init({ commit }) {
      commit(1)
    },
  },
})

const ExampleState2 = new StateManager(3, {
  lifecycle: {
    init({ commit }) {
      commit(42)
    },
  },
})
