import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'

export default function App(): ReactNode {
  const firstName = useSimpleStateValue(UserState, (state) => state.firstName)
  console.log('App is rendering...')
  return (
    <div>
      <h1>Hello, {firstName}!</h1>
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
