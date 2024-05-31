import { StateManager } from 'cotton-box'
import { useInitState, useStateValue } from 'cotton-box-react'

export default function App(): JSX.Element {
  const isInitializing = useInitState(UserState)
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

function SubComponent(): JSX.Element {
  const user = useStateValue(UserState)
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

const UserState = new StateManager<IUserState>(null, {
  lifecycle: {
    async init({ commit }) {
      await delay(1000)
      commit({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: null,
      })
    },
  }
})

function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
