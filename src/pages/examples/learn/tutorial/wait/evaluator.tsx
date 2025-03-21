import { StateManager } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  (async function () {
    let intervalCount = 0
    const CounterState = new StateManager(0)
    const intervalRef = setInterval(() => {
      // Generate random number between 1 to 100
      const randomNumber = 1 + Math.floor(Math.random() * 100)
      console.log(`randomNumber: ${randomNumber}`)
      CounterState.set(randomNumber)
      intervalCount++
    }, 1000)
    const awaitedValue = await CounterState.wait((state) => {
      return state % 5 === 0
    })
    clearInterval(intervalRef)
    console.log(`Received a number divisible by 5 after ${intervalCount} attempts.`)
    console.log(`The number is ${awaitedValue}`)
  })()
  // #endregion example
}

export { default } from '~components/none'
