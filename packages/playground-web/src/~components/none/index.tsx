import { ReactNode } from 'react'
import styles from './index.module.css'

export default function NoComponent(): ReactNode {
  return (
    <div className={styles.label}>
      Open the web inspector and navigate to the console to see the outputs.
    </div>
  )
}
