import { StateManager, StateManagerVisibility } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'

export default function App(): ReactNode {
  useStateValue(ExampleState)
  return null
}

const ExampleState = new StateManager('Hello, world!', {
  // visibility: StateManagerVisibility.HIDDEN,
})
