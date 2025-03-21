import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { JSX, useCallback, useState } from 'react'

export default function App(): JSX.Element {
  const [active, setActive] = useState(true)
  const toggleActiveness = useCallback(() => { setActive(a => !a) }, [])
  const user = useSimpleStateValue(UserState, null, active)
  console.log('App is rendering...')
  return (
    <div>
      <h1>Hello, {user.firstName} {user.lastName}!</h1>
      <h2>Your lucky number is {user.luckyNumber ?? '...'}</h2>
      <button onClick={rollLuckyNumber}>Roll lucky number</button>
      <button onClick={toggleActiveness}>
        {active ? 'Pause watching' : 'Start watching'}
      </button>
    </div>
  )
}

interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

const UserState = new SimpleStateManager<IUserState>({
  firstName: 'John',
  lastName: 'Smith',
  luckyNumber: null,
})

function rollLuckyNumber(): void {
  UserState.set((previousState) => ({
    ...previousState,
    luckyNumber: Math.round(Math.random() * 100),
  }))
}
