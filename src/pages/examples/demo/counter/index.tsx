import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { ReactNode } from 'react'
import styles from './index.module.css'

const CounterState = new StateManager(0)
const bumpCounter = () => { CounterState.set((c) => c + 1) }

export default function App(): ReactNode {
  const counter = useStateValue(CounterState)
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.ringContainer}>
          <button className={styles.bumpButton} onClick={bumpCounter}>
            <Ring value={counter} />
            <div className={styles.counterContainer}>
              <span className={styles.counter}>{counter}</span>
              <span className={styles.counterHint}>Click +1</span>
            </div>
          </button>
        </div>
        <button
          className={styles.resetButton}
          onClick={CounterState.reset}
        >Reset</button>
      </div>
    </div>
  )
}

interface RingProps {
  value: number
  children?: ReactNode
}

const minValue = 0
const maxValue = 10

function Ring({
  value,
  children,
}: RingProps): ReactNode {
  const angle = 360 * value / maxValue
  return (
    <div
      className={styles.ring}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuenow={value}
      role='progressbar'
      style={{ '--angle': `${angle}deg` }}
    >
      <div className={styles.ringCap} />
      <div className={styles.trailingRingCapContainer}>
        <div className={`${styles.ringCap} ${styles.ringCapWithShadow}`} />
      </div>
      {children && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  )
}
