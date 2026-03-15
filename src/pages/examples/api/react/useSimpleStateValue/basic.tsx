import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'

export default function App(): ReactNode {
  const user = useSimpleStateValue(UserState)
  return (
    <div>
      <h1>Hello, {user.firstName} {user.lastName}!</h1>
      <h2>Your lucky number is {user.luckyNumber || '...'}</h2>
      <button onClick={rollLuckyNumber}>Roll lucky number</button>
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
  luckyNumber: 0,
})

function rollLuckyNumber(): void {
  UserState.set((previousState) => ({
    ...previousState,
    luckyNumber: Math.round(Math.random() * 100),
  }))
}
