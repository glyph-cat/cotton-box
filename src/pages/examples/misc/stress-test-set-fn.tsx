import { hookstate, useHookstate } from '@hookstate/core'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useSimpleStateValueOnly, useStateValue } from 'cotton-box-react'
import { createContext, ReactNode, useContext, useMemo, useState, useSyncExternalStore } from 'react'
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
      <BareBonesTestComponent />
      <SimpleStateManagerTestComponent />
      {/* <StateManagerTestComponent /> */}
      {/* <AsyncStateManagerTestComponent /> */}
      {/* <ReactTestComponent /> */}
      {/* <RecoilTestComponent /> */}
      {/* <ReduxTestComponent /> */}
      {/* <ZustandTestComponent /> */}
      {/* <HookstateTestComponent /> */}
      {/* <ReactRelinkTestComponent /> */}
    </SetStateContext.Provider>
  )
}

type StateManagerType = keyof typeof DEFAULT_SET_STATE_CONTEXT

const DEFAULT_SET_STATE_CONTEXT = {
  StateManager: null,
  // AsyncStateManager: null,
  React: null,
  // Recoil: null,
  Redux: null,
  Zustand: null,
  HookState: null,
  // ReactRelink: null,
  SimpleStateManager: null,
} as const

type ISetStateContext = Record<StateManagerType, Function>
const SetStateContext = createContext<ISetStateContext>(null)

const createTestHandler = (ctx: ISetStateContext, iterations: number) => async () => {
  for (const key in ctx) {
    const setState = (() => {
      switch (key as StateManagerType) {
        // case 'SimpleStateManager': return TestSimpleStateManager.set
        case 'SimpleStateManager': return BareBonesStateManager.set
        // case 'StateManager': return TestStateManager.set
        // case 'AsyncStateManager': return TestAsyncStateManager.set
        // case 'Zustand': return useZustandState.setState
        // case 'HookState': return TestHookState.set
        // case 'ReactRelink': return TestRelinkState.set
        default: return ctx[key]
      }
    })()
    if (!setState) { console.warn(`Skipped for now: ${key}`); continue } // TODO: [Low priority]
    const startTime = performance.now()
    if (
      key as StateManagerType === 'AsyncStateManager' as any // temp
      // || key as StateManagerType === 'ReactRelink'
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

function ControlComponent(): ReactNode {
  const ctx = useContext(SetStateContext)
  return (
    <div>
      <h1>Speed Test</h1>
      <button onClick={useMemo(() => createTestHandler(ctx, 100000), [ctx])}>
        {'Iterations: 100000'}
      </button>
      <button onClick={useMemo(() => createTestHandler(ctx, 200000), [ctx])}>
        {'Iterations: 200000'}
      </button>
      <button onClick={useMemo(() => createTestHandler(ctx, 300000), [ctx])}>
        {'Iterations: 300000'}
      </button>
    </div>
  )
}

const BareBonesStateManager = new SimpleStateManager(0)
function BareBonesTestComponent(): ReactNode {
  // const state = useSimpleStateValueOnly(BareBonesStateManager)
  const state = useSyncExternalStore(
    BareBonesStateManager.watch,
    BareBonesStateManager.get,
    BareBonesStateManager.get,
  )
  return <h2><code>SimpleStateManager</code> (Bare Bones): {state}</h2>
}

const TestSimpleStateManager = new SimpleStateManager(0)
function SimpleStateManagerTestComponent(): ReactNode {
  const state = useSimpleStateValueOnly(TestSimpleStateManager)
  return <h2><code>SimpleStateManager</code>: {state}</h2>
}

const TestStateManager = new StateManager(0)
function StateManagerTestComponent(): ReactNode {
  const state = useStateValue(TestStateManager)
  return <h2><code>StateManager</code>: {state}</h2>
}

// const TestAsyncStateManager = new AsyncStateManager(0)
// function AsyncStateManagerTestComponent(): ReactNode {
//   const state = useStateValue(TestAsyncStateManager)
//   return <h2><code>AsyncStateManager</code>: {state}</h2>
// }

function ReactTestComponent(): ReactNode {
  const [state, setState] = useState(0)
  useContext(SetStateContext).React = setState
  return <h2>React <code>useState</code>: {state}</h2>
}

// const RecoilAtom = atom({ key: 'test', default: 0 })
// function RecoilTestComponentBase(): ReactNode {
//   const [state, setState] = useRecoilState(RecoilAtom)
//   useContext(SetStateContext).Recoil = setState
//   return <h2>Recoil: {state}</h2>
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
  return <h2>Redux: {state}</h2>
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
  return <h2>Zustand: {state}</h2>
}

const TestHookState = hookstate(0)
function HookstateTestComponent(): ReactNode {
  const state = useHookstate(TestHookState)
  return <h2>Hookstate: {state.get()}</h2>
}

// const TestRelinkState = new RelinkSource({ key: 'test', default: 0 })
// function ReactRelinkTestComponent(): ReactNode {
//   const state = useRelinkValue(TestRelinkState)
//   return <h2><code>react-relink</code>: {state}</h2>
// }
