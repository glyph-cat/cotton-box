import { StateManager, StateManagerVisibility } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { JSX } from 'react'

export default function App(): JSX.Element {
  useStateValue(ExampleState)
  return null
}

const ExampleState = new StateManager('Hello, world!', {
  // visibility: StateManagerVisibility.HIDDEN,
})
