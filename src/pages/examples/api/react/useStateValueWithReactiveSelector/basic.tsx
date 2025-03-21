import { StateManager } from 'cotton-box'
import { useStateValueWithReactiveSelector } from 'cotton-box-react'

const selector = (state: IUserState) => state.luckyNumber

export default function App(): JSX.Element {
  const luckyNumber = useStateValueWithReactiveSelector(UserState, selector)
  console.log('App is rendering...')
  return (
    <div>
      <h1>Lucky number: {luckyNumber ?? '...'}</h1>
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
