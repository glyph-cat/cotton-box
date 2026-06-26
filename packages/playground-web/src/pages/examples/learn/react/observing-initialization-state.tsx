import { StateManager } from 'cotton-box'
import { useSimpleStateValue, useStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'

export default function App(): ReactNode {
  const isInitializing = useSimpleStateValue(UserState.isInitializing)
  return (
    <>
      <button onClick={UserState.reinitialize}>Reinitialize</button>
      {isInitializing
        ? <div>Loading...</div>
        : <SubComponent />
      }
    </>
  )
}

function SubComponent(): ReactNode {
  const user = useStateValue(UserState)
  if (!user) { return <>Loading...</> }
  return (
    <div>
      <h1>Hello, {user.firstName} {user.lastName}!</h1>
    </div>
  )
}

interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

const UserState = new StateManager<IUserState | null>(null, {
  lifecycle: {
    async init({ commit }) {
      await delay(1000)
      commit({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 0,
      })
    },
  }
})

function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
