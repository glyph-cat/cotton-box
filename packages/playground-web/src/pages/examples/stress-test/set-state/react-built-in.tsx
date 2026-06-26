import { Nullable } from '@glyph-cat/foundation'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

const componentCount = 100
const testDuration = 1000 // ms

const TestContext = createContext<{ i: number }>({ i: -1 })

export default function App(): ReactNode {

  const [score, setScore] = useState<Nullable<number>>(null)
  const [state, setState] = useState<{ i: number }>({ i: -1 })
  const startTest = useCallback(() => {
    let i = 0
    const startTime = performance.now()
    flushSync(() => {
      do {
        setState({ i: ++i })
      } while ((performance.now() - startTime) < testDuration)
    })
    const trueDelta = performance.now() - startTime
    const opsPerSecond = Math.floor(1000 * i / trueDelta)
    setScore(opsPerSecond)
  }, [])

  return (
    <>
      <h1>React</h1>
      <p>State updates per second: {score ?? '-/-'}</p>
      <button onClick={startTest}>Start</button>
      <br />
      <br />
      <TestContext value={state}>
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
      </TestContext>
    </>
  )

}

function TestComponent(): ReactNode {
  const state = useContext(TestContext)
  return (
    <div style={{
      aspectRatio: 1,
      display: 'grid',
      backgroundColor: '#80808080',
      placeItems: 'center',
      fontSize: '14pt',
    }}>
      {state.i}
    </div>
  )
}
