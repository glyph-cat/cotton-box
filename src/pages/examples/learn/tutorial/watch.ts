import { StateManager } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  const CounterState = new StateManager(0)

  const collectedValues: Array<number> = []
  const unwatch = CounterState.watch((state) => {
    collectedValues.push(state)
    if (collectedValues.length >= 10) {
      console.log('Successfully collected 10 numbers')
      clearInterval(intervalRef)
      unwatch()
    }
  })

  const intervalRef = setInterval(() => {
    // Generate random number between 1 to 100
    CounterState.set(1 + Math.floor(Math.random() * 100))
  }, 1000)
  // #endregion example
}

export { default } from '~components/none'
