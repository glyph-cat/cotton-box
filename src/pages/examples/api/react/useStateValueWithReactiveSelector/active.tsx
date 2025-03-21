import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValueWithReactiveSelector } from 'cotton-box-react'
import { JSX, useCallback, useState } from 'react'

const selector = (state: IUserState) => state.luckyNumber

export default function App(): JSX.Element {
  const [active, setActive] = useState(true)
  const toggleActiveness = useCallback(() => { setActive(a => !a) }, [])
  const luckyNumber = useSimpleStateValueWithReactiveSelector(UserState, selector, active)
  console.log('App is rendering...')
  return (
    <div>
      <h1>Lucky number: {luckyNumber ?? '...'}</h1>
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
