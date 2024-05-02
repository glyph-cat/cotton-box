import { hookstate, useHookstate } from '@hookstate/core'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useSimpleStateValue, useStateValue } from 'cotton-box-react'
import { createContext, useContext, useMemo, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RelinkSource, useRelinkValue } from 'react-relink'
import { RecoilRoot, atom, useRecoilState } from 'recoil'
import { create } from 'zustand'

export default function App(): JSX.Element {
  return (
    <SetStateContext.Provider value={useMemo(() => ({
      ...DEFAULT_SET_STATE_CONTEXT,
    }), [])}>
      <ControlComponent />
      <SimpleStateManagerTestComponent />
      <StateManagerTestComponent />
      <AsyncStateManagerTestComponent />
      <ReactTestComponent />
      <RecoilTestComponent />
      <ReduxTestComponent />
      <ZustandTestComponent />
      <HookstateTestComponent />
      <ReactRelinkTestComponent />
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

function ControlComponent(): JSX.Element {
  const ctx = useContext(SetStateContext)
  const beginTest = (iterations: number) => async () => {
    for (const key in ctx) {
      const setState = (() => {
        switch (key as StateManagerType) {
          case 'SimpleStateManager': return TestSimpleStateManager.set
          case 'StateManager': return TestStateManager.set
          case 'AsyncStateManager': return TestAsyncStateManager.set
          case 'Zustand': return useZustandState.setState
          case 'HookState': return TestHookState.set
          case 'ReactRelink': return TestRelinkState.set
          default: return ctx[key]
        }
      })()
      if (!setState) { console.warn(`Skipped for now: ${key}`); continue } // TODO
      const startTime = performance.now()
      if (
        key as StateManagerType === 'AsyncStateManager' ||
        key as StateManagerType === 'ReactRelink'
      ) {
        for (let i = 0; i < iterations; i++) {
          await setState((c: number) => c + 1)
        }
      } else {
        for (let i = 0; i < iterations; i++) {
          setState((c: number) => c + 1)
        }
      }
      const duration = Math.round(performance.now() - startTime)
      console.log(`${key}: ${duration}ms`)
    }
  }
  return (
    <div>
      <h1>Speed Test</h1>
      <button onClick={beginTest(100000)}>Iterations: 100000</button>
      <button onClick={beginTest(200000)}>Iterations: 200000</button>
      <button onClick={beginTest(300000)}>Iterations: 300000</button>
    </div>
  )
}

const TestSimpleStateManager = new SimpleStateManager(0)
function SimpleStateManagerTestComponent(): JSX.Element {
  const state = useSimpleStateValue(TestSimpleStateManager)
  return <h2><code>SimpleStateManager</code>: {state}</h2>
}

const TestStateManager = new StateManager(0)
function StateManagerTestComponent(): JSX.Element {
  const state = useStateValue(TestStateManager)
  return <h2><code>StateManager</code>: {state}</h2>
}

const TestAsyncStateManager = new AsyncStateManager(0)
function AsyncStateManagerTestComponent(): JSX.Element {
  const state = useStateValue(TestAsyncStateManager)
  return <h2><code>AsyncStateManager</code>: {state}</h2>
}

function ReactTestComponent(): JSX.Element {
  const [state, setState] = useState(0)
  useContext(SetStateContext).React = setState
  return <h2>React <code>useState</code>: {state}</h2>
}

const RecoilAtom = atom({ key: 'test', default: 0 })
function RecoilTestComponentBase(): JSX.Element {
  const [state, setState] = useRecoilState(RecoilAtom)
  useContext(SetStateContext).Recoil = setState
  return <h2>Recoil: {state}</h2>
}
function RecoilTestComponent(): JSX.Element {
  return (
    <RecoilRoot>
      <RecoilTestComponentBase />
    </RecoilRoot>
  )
}

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
function ReduxTestComponentBase(): JSX.Element {
  const state = useSelector(s => s['test']) as number
  const dispatch = useDispatch()
  useContext(SetStateContext).Redux = () => {
    dispatch(TestSlice.actions.increment())
  }
  return <h2>Redux: {state}</h2>
}
function ReduxTestComponent(): JSX.Element {
  return (
    <Provider store={TestStore}>
      <ReduxTestComponentBase />
    </Provider>
  )
}

const useZustandState = create(() => 0)
function ZustandTestComponent(): JSX.Element {
  const state = useZustandState()
  return <h2>Zustand: {state}</h2>
}

const TestHookState = hookstate(0)
function HookstateTestComponent(): JSX.Element {
  const state = useHookstate(TestHookState)
  return <h2>Hookstate: {state.get()}</h2>
}

const TestRelinkState = new RelinkSource({ key: 'test', default: 0 })
function ReactRelinkTestComponent(): JSX.Element {
  const state = useRelinkValue(TestRelinkState)
  return <h2><code>react-relink</code>: {state}</h2>
}
