import { Nullable } from '@glyph-cat/foundation'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { ReactNode, useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'

const componentCount = 100
const testDuration = 1000 // ms

const TestSlice = createSlice({
  name: 'test',
  initialState: { i: -1 },
  reducers: {
    increment: (_, action) => ({ i: action.payload }),
  },
})

const TestStore = configureStore({
  reducer: {
    test: TestSlice.reducer,
  },
})

export default function App(): ReactNode {
  return (
    <Provider store={TestStore}>
      <Content />
    </Provider>
  )
}

function Content(): ReactNode {

  const [score, setScore] = useState<Nullable<number>>(null)
  const dispatch = useDispatch()
  const startTest = useCallback((): void => {
    let i = 0
    const startTime = performance.now()
    flushSync(() => {
      do {
        dispatch(TestSlice.actions.increment(++i))
      } while ((performance.now() - startTime) < testDuration)
    })
    const trueDelta = performance.now() - startTime
    const opsPerSecond = Math.floor(1000 * i / trueDelta)
    setScore(opsPerSecond)
  }, [])

  return (
    <>
      <h1>Redux</h1>
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
  const state = useSelector((s) => (s as any).test) as { i: number }
  return (
    <div
      style={{
        aspectRatio: 1,
        display: 'grid',
        backgroundColor: '#80808080',
        placeItems: 'center',
        fontSize: '14pt',
      }}
    >
      {state.i}
    </div>)
}
