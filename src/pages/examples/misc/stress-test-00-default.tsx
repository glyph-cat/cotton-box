import { Nullable } from '@glyph-cat/foundation'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

const componentCount = 100
const testDuration = 1000 // ms

const TestContext = createContext<{ i: number }>({ i: -1 })

// Score: 3501443, 4243610

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
    setScore(i)
  }, [])

  return (
    <>
      <h1>React</h1>
      <p>Operations per second: {score ?? '-/-'}</p>
      <button onClick={startTest}>Start</button>
      <br />
      <TestContext value={state}>
        <Container />
      </TestContext>
    </>
  )

}

function Container(): ReactNode {
  return (
    <>
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
  const state = useContext(TestContext)
  return <>{JSON.stringify(state)}</>
}
