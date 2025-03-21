import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'

function App(): JSX.Element {
  const luckyNumber = useStateValue(UserState, (state) => state.luckyNumber)
  console.log('App is rendering...')
  return (
    <>
      <h1>Lucky number: {luckyNumber}</h1>
      <button onClick={setName}>Set name</button>
      <button onClick={setLuckyNumber}>Set lucky number</button>
    </>
  )
}

export default App

interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

const UserState = new StateManager<IUserState>({
  firstName: 'John',
  lastName: 'Smith',
  luckyNumber: 42,
})

function setName(): void {
  const names: Array<string> = ['Adam', 'Bob', 'Carlo', 'David', 'Eric']
  UserState.set((previousState) => ({
    ...previousState,
    firstName: names[Math.floor(Math.random() * names.length)],
  }))
}

function setLuckyNumber(): void {
  UserState.set((previousState) => ({
    ...previousState,
    luckyNumber: Math.round(Math.random() * 100),
  }))
}
