import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'

export default function App(): JSX.Element {
  const firstName = useStateValue(UserState, (state) => state.firstName)
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

const UserState = new StateManager<IUserState>({
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
