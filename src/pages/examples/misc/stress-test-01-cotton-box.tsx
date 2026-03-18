import { Nullable } from '@glyph-cat/foundation'
import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValueOnly } from 'cotton-box-react'
import { ReactNode, useCallback, useState } from 'react'
import { flushSync } from 'react-dom'

const componentCount = 100
const testDuration = 1000 // ms

const TestState = new SimpleStateManager<{ i: number }>({ i: -1 })

// Score: 81397, 91917

export default function App(): ReactNode {

  const [score, setScore] = useState<Nullable<number>>(null)
  const startTest = useCallback((): void => {
    let i = 0
    const startTime = performance.now()
    flushSync(() => {
      do {
        TestState.set({ i: ++i })
      } while ((performance.now() - startTime) < testDuration)
    })
    setScore(i)
  }, [])

  return (
    <>
      <h1>Cotton Box</h1>
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
  const state = useSimpleStateValueOnly(TestState)
  return <>{JSON.stringify(state)}</>
}
