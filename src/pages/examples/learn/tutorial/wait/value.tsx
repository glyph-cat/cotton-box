import { StateManager } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  (async function () {
    let intervalCount = 0
    const CounterState = new StateManager(0)
    const intervalRef = setInterval(() => {
      // Generate random number between 40 to 50
      const randomNumber = 40 + Math.round(Math.random() * 10)
      console.log(`randomNumber: ${randomNumber}`)
      CounterState.set(randomNumber)
      intervalCount++
    }, 1000)
    await CounterState.wait(42)
    clearInterval(intervalRef)
    console.log(`Promise resolved after ${intervalCount} attempts`)
  })()
  // #endregion example
}

export { default } from '~components/none'
