import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'

function App(): JSX.Element {
  const counter = useStateValue(CounterState)
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increaseCounter}>
        Increase counter
      </button>
      <button onClick={setRandomNumber}>
        Set random number
      </button>
      <button onClick={CounterState.reset}>
        Reset counter
      </button>
    </div>
  )
}

export default App

const CounterState = new StateManager(0)

function increaseCounter(): void {
  CounterState.set(counter => counter + 1)
}

function setRandomNumber(): void {
  CounterState.set(Math.round(Math.random() * 100))
}
