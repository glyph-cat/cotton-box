import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { HydrateStateManager } from 'packages/react/src/api/hydration'
import { JSX, useEffect, useReducer } from 'react'

export default function App(): JSX.Element {
  const [f, forceUpdate] = useReducer((c) => c + 1, 0)
  useEffect(() => {
    setTimeout(() => {
      forceUpdate()
      console.log('forceUpdate')
    }, 1000)
  }, [])
  return (
    <HydrateStateManager
      //@ts-expect-error
      values={[
        [ExampleState, ({ commit }) => { console.log('commit(1)'); commit(1) }],
        [ExampleState2, ({ commit }) => { console.log('commit(42)'); commit(42) }],
      ].filter((_, i) => i <= f)}
    >
      <Component />
      <br />
      <span>{f}</span>
    </HydrateStateManager>
  )
}

function Component(): JSX.Element {
  const value = useStateValue(ExampleState)
  const value2 = useStateValue(ExampleState2)
  return <>
    <span>{value}</span>
    <span>{value2}</span>
  </>
}

const ExampleState = new StateManager(0)
const ExampleState2 = new StateManager(3)
