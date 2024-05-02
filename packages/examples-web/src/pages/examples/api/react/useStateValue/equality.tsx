import { Equality, StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { useCallback, useState } from 'react'

export default function App(): JSX.Element {
  const [shouldUseObjectIs, setUseObjectIs] = useState(true)
  const user = useStateValue(
    UserState,
    null,
    shouldUseObjectIs ? Object.is : Equality.shallowCompareObject
  )
  // KIV: note - this one is not causing infinite render because it does not have a selector
  const setEqualityObjectIs = useCallback(() => {
    setUseObjectIs(true)
  }, [])
  const setEqualityShallowCompareObject = useCallback(() => {
    setUseObjectIs(false)
  }, [])
  console.log('App is rendering...')
  return (
    <div>
      <h1>Hello, {user.firstName} {user.lastName}!</h1>
      <h2>Your lucky number is {user.luckyNumber ?? '...'}</h2>
      <button onClick={setStateBySpreadingOnly}>Set state by spreading only</button>
      <button onClick={setEqualityObjectIs} disabled={shouldUseObjectIs}>
        Use <code>Object.is</code>
      </button>
      <button onClick={setEqualityShallowCompareObject} disabled={!shouldUseObjectIs}>
        Use <code>Equality.shallowCompareObject</code>
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
