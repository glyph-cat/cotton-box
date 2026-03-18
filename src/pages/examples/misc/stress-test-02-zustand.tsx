import { Nullable } from '@glyph-cat/foundation'
import { ReactNode, useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { create } from 'zustand'

const componentCount = 100
const testDuration = 1000 // ms

const useTestState = create<{ i: number }>(() => ({ i: -1 }))

// Score: 85334, 87191

export default function App(): ReactNode {

  const [score, setScore] = useState<Nullable<number>>(null)
  const startTest = useCallback((): void => {
    let i = 0
    const startTime = performance.now()
    flushSync(() => {
      do {
        useTestState.setState({ i: ++i })
      } while ((performance.now() - startTime) < testDuration)
    })
    setScore(i)
  }, [])

  return (
    <>
      <h1>Zustand</h1>
      <p>Operations per second: {score ?? '-/-'}</p>
      <button onClick={startTest}>Start</button>
      <br />
      {(() => {
        const stack = []
        for (let i = 0; i < componentCount; i++) {
          stack.push(<TestComponent key={i} />)
        }
        return stack
      })()}
    </>
  )

}

function TestComponent(): ReactNode {
  const state = useTestState()
  return <>{JSON.stringify(state)}</>
}
