import { Equality, StateManager } from 'cotton-box'
import { useStateValueWithReactiveSelector } from 'cotton-box-react'
import { useCallback, useState } from 'react'

const selector = (state: IUserState) => [state.firstName, state.lastName]

// KIV: temp note expect infinite loop when using `Object.Is`

export default function App(): JSX.Element {
  const [shouldUseObjectIs, setUseObjectIs] = useState(false)
  const name = useStateValueWithReactiveSelector(
    UserState,
    selector,
    shouldUseObjectIs ? Object.is : Equality.shallowCompareArray,
  )
  const setEqualityObjectIs = useCallback(() => {
    setUseObjectIs(true)
  }, [])
  const setEqualityShallowCompareArray = useCallback(() => {
    setUseObjectIs(false)
  }, [])
  console.log('App is rendering...')
  return (
    <div>
      <h1>Hello, {name.join(' ')}!</h1>
      <button onClick={setStateBySpreadingOnly}>Set state by spreading only</button>
      <button onClick={setEqualityObjectIs} disabled={shouldUseObjectIs}>
        Use <code>Object.is</code>
      </button>
      <button onClick={setEqualityShallowCompareArray} disabled={!shouldUseObjectIs}>
        Use <code>Equality.shallowCompareArray</code>
      </button>
    </div>
  )
}

interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

const UserState = new StateManager<IUserState>({
  firstName: 'John',
  lastName: 'Smith',
  luckyNumber: null,
})

function setStateBySpreadingOnly(): void {
  UserState.set((previousState) => ({ ...previousState }))
}
