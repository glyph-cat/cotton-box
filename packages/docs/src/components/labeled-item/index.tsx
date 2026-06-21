import { ReactNode } from 'react'
import styles from './index.module.css'

export interface LabeledItemProps {
  label: string
  children: ReactNode
}

export function LabeledItem({
  label,
  children,
}: LabeledItemProps): ReactNode {
  return (
    <>
      <span className={styles.label}>{`${label}: `}</span>
      {children}
    </>
  )
}
