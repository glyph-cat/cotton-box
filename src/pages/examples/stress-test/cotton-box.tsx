import { Nullable } from '@glyph-cat/foundation'
import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValueOnly } from 'cotton-box-react'
import { ReactNode, useCallback, useState } from 'react'
import { flushSync } from 'react-dom'

const componentCount = 100
const testDuration = 1000 // ms

const TestState = new SimpleStateManager<{ i: number }>({ i: -1 })

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
    const trueDelta = performance.now() - startTime
    const opsPerSecond = Math.floor(1000 * i / trueDelta)
    setScore(opsPerSecond)
  }, [])

  return (
    <>
      <h1>Cotton Box</h1>
      <p>State updates per second: {score ?? '-/-'}</p>
      <button onClick={startTest}>Start</button>
      <br />
      <br />
      <div
        style={{
          display: 'grid',
          gap: 10,
          gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
        }}
      >
        {(() => {
          const stack = []
          for (let i = 0; i < componentCount; i++) {
            stack.push(<TestComponent key={i} />)
          }
          return stack
        })()}
      </div>
    </>
  )

}

function TestComponent(): ReactNode {
  const state = useSimpleStateValueOnly(TestState)
  return (
    <div style={{
      aspectRatio: 1,
      display: 'grid',
      backgroundColor: '#80808080',
      placeItems: 'center',
      fontSize: '14pt',
    }}>
      {state.i}
    </div>)
}
