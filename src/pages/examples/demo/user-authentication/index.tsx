import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'
import styles from './index.module.css'

interface IUserState {
  username: string
  avatarUrl: string
}

const UserState = new StateManager<IUserState>({
  username: '',
  avatarUrl: '',
}, {
  lifecycle: {
    // ...
  },
})

export default function App(): ReactNode {
  return <></>
}
