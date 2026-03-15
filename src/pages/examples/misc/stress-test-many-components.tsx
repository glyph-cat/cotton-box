import { hookstate, useHookstate } from '@hookstate/core'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useSimpleStateValue, useStateValue } from 'cotton-box-react'
import { ComponentType, createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { create } from 'zustand'
// import { RelinkSource, useRelinkValue } from 'react-relink'
// import { atom, RecoilRoot, useRecoilState } from 'recoil'

export default function App(): ReactNode {
  return (
    <SetStateContext.Provider value={useMemo(() => ({
      ...DEFAULT_SET_STATE_CONTEXT,
    }), [])}>
      <ControlComponent />
      <MultiRender component={SimpleStateManagerTestComponent} />
      <MultiRender component={StateManagerTestComponent} />
      <MultiRender component={AsyncStateManagerTestComponent} />
      <MultiRender component={ReactTestComponent} />
      {/* <MultiRender component={RecoilTestComponent} /> */}
      <MultiRender component={ReduxTestComponent} />
      <MultiRender component={ZustandTestComponent} />
      <MultiRender component={HookstateTestComponent} />
      {/* <MultiRender component={ReactRelinkTestComponent} /> */}
    </SetStateContext.Provider>
  )
}

type StateManagerType = keyof typeof DEFAULT_SET_STATE_CONTEXT

const DEFAULT_SET_STATE_CONTEXT = {
  SimpleStateManager: null,
  StateManager: null,
  AsyncStateManager: null,
  React: null,
  Recoil: null,
  Redux: null,
  Zustand: null,
  HookState: null,
  ReactRelink: null,
} as const

const SetStateContext = createContext<Record<StateManagerType, Function>>(null)

function ControlComponent(): ReactNode {
  const ctx = useContext(SetStateContext)
  const beginTest = useCallback(async () => {
    for (const key in ctx) {
      const setState = (() => {
        switch (key as StateManagerType) {
          case 'SimpleStateManager': return TestSimpleStateManager.set
          case 'StateManager': return TestStateManager.set
          case 'AsyncStateManager': return TestAsyncStateManager.set
          case 'Zustand': return useZustandState.setState
          case 'HookState': return TestHookState.set
          // case 'ReactRelink': return TestRelinkState.set
          default: return ctx[key]
        }
      })()
      if (!setState) { console.warn(`Skipped for now: ${key}`); continue } // TODO: [Low priority]
      const startTime = performance.now()
      const possiblyAPromise = setState((c: number) => c + 1)
      if (
        key as StateManagerType === 'AsyncStateManager' ||
        key as StateManagerType === 'ReactRelink'
      ) {
        await possiblyAPromise
      }
      const duration = Math.round(performance.now() - startTime)
      console.log(`${key}: ${duration}ms`)
    }
  }, [ctx])
  return (
    <button onClick={beginTest}>
      Set states
    </button>
  )
}

interface MultiRenderProps {
  component: ComponentType
}

const count = 10000

function MultiRender({
  component: TestComponent,
}: MultiRenderProps): ReactNode {
  const renderStack = []
  for (let i = 0; i < count; i++) {
    renderStack.push(<TestComponent key={i} />)
  }
  return <>{renderStack}</>
}

const TestSimpleStateManager = new SimpleStateManager(0)
function SimpleStateManagerTestComponent(): ReactNode {
  const state = useSimpleStateValue(TestSimpleStateManager)
  // return <h2><code>SimpleStateManager</code>: {state}</h2>
  return null
}

const TestStateManager = new StateManager(0)
function StateManagerTestComponent(): ReactNode {
  const state = useStateValue(TestStateManager)
  // return <h2><code>StateManager</code>: {state}</h2>
  return null
}

const TestAsyncStateManager = new AsyncStateManager(0)
function AsyncStateManagerTestComponent(): ReactNode {
  const state = useStateValue(TestAsyncStateManager)
  // return <h2><code>AsyncStateManager</code>: {state}</h2>
  return null
}

function ReactTestComponent(): ReactNode {
  const [state, setState] = useState(0)
  useContext(SetStateContext).React = setState
  // return <h2>React <code>useState</code>: {state}</h2>
  return null
}

// const RecoilAtom = atom({ key: 'test', default: 0 })
// function RecoilTestComponentBase(): ReactNode {
//   const [state, setState] = useRecoilState(RecoilAtom)
//   useContext(SetStateContext).Recoil = setState
//   // return <h2>Recoil: {state}</h2>
//   return null
// }
// function RecoilTestComponent(): ReactNode {
//   return (
//     <RecoilRoot>
//       <RecoilTestComponentBase />
//     </RecoilRoot>
//   )
// }

const TestSlice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (s) => s + 1
  },
})
const TestStore = configureStore({
  reducer: {
    test: TestSlice.reducer,
  },
})
function ReduxTestComponentBase(): ReactNode {
  const state = useSelector(s => s['test']) as number
  const dispatch = useDispatch()
  useContext(SetStateContext).Redux = () => {
    dispatch(TestSlice.actions.increment())
  }
  // return <h2>Redux: {state}</h2>
  return null
}
function ReduxTestComponent(): ReactNode {
  return (
    <Provider store={TestStore}>
      <ReduxTestComponentBase />
    </Provider>
  )
}

const useZustandState = create(() => 0)
function ZustandTestComponent(): ReactNode {
  const state = useZustandState()
  // return <h2>Zustand: {state}</h2>
  return null
}

const TestHookState = hookstate(0)
function HookstateTestComponent(): ReactNode {
  const state = useHookstate(TestHookState)
  // return <h2>Hookstate: {state.get()}</h2>
  return null
}

// const TestRelinkState = new RelinkSource({ key: 'test', default: 0 })
// function ReactRelinkTestComponent(): ReactNode {
//   const state = useRelinkValue(TestRelinkState)
//   // return <h2><code>react-relink</code>: {state}</h2>
//   return null
// }
