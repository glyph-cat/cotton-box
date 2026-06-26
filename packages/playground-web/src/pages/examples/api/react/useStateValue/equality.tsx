import { objectIsShallowEqual } from '@glyph-cat/equality'
import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ReactNode, useCallback, useState } from 'react'

export default function App(): ReactNode {
  const [shouldUseObjectIs, setUseObjectIs] = useState(true)
  const user = useStateValue(
    UserState,
    null,
    shouldUseObjectIs ? Object.is : objectIsShallowEqual
  )
  // KIV: note - this one is not causing infinite render because it does not have a selector
  const setEqualityObjectIs = useCallback(() => {
    setUseObjectIs(true)
  }, [])
  const setEqualityObjectIsShallowEqual = useCallback(() => {
    setUseObjectIs(false)
  }, [])
  console.log('App is rendering...')
  return (
    <div>
      <h1>Hello, {user.firstName} {user.lastName}!</h1>
      <h2>Your lucky number is {user.luckyNumber || '...'}</h2>
      <button onClick={setStateBySpreadingOnly}>Set state by spreading only</button>
      <button onClick={setEqualityObjectIs} disabled={shouldUseObjectIs}>
        Use <code>Object.is</code>
      </button>
      <button onClick={setEqualityObjectIsShallowEqual} disabled={!shouldUseObjectIs}>
        Use <code>objectIsShallowEqual</code>
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
  luckyNumber: 0,
})

function setStateBySpreadingOnly(): void {
  UserState.set((previousState) => ({ ...previousState }))
}
