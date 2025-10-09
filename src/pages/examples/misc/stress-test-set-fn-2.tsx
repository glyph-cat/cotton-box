import { hookstate, useHookstate } from '@hookstate/core'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useSimpleStateValue, useStateValue } from 'cotton-box-react'
import { createContext, Fragment, JSX, useContext, useMemo, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { create } from 'zustand'
// import { RelinkSource, useRelinkValue } from 'react-relink'
// import { atom, RecoilRoot, useRecoilState } from 'recoil'

const TD_WIDTH = 48 // px

const iterationChoices = [100000, 200000, 300000] as const
const requiredSamples = ['i', 'ii', 'iii']
const testSubjects = [
  'Zustand',
  'SimpleStateManager',
  'StateManager',
  'useState',
  'HookState',
  'Redux',
]

export default function App(): JSX.Element {
  return (
    <SetStateContext.Provider value={useMemo(() => ({
      ...DEFAULT_SET_STATE_CONTEXT,
    }), [])}>
      <table border={1}>
        <thead>
          <tr>
            <td rowSpan={2} />
            {iterationChoices.map((iterationChoice) => {
              return (
                <td
                  key={iterationChoice}
                  colSpan={requiredSamples.length + 1}
                  style={{ textAlign: 'center' }}
                >
                  {iterationChoice}
                </td>
              )
            })}
          </tr>
          <tr>
            {iterationChoices.map((iterationChoice) => {
              return (
                <Fragment key={iterationChoice}>
                  {requiredSamples.map((label, i) => {
                    return (
                      <td key={i} style={{ textAlign: 'center', width: TD_WIDTH }}>
                        {label}
                      </td>
                    )
                  })}
                  <td style={{ textAlign: 'center', width: TD_WIDTH }}>{'Avg'}</td>
                </Fragment>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {testSubjects.map((name) => {
            return (
              <tr key={name}>
                <td>{name}</td>
                {iterationChoices.map((iterationChoice) => {
                  return (
                    <Fragment key={iterationChoice}>
                      {requiredSamples.map((_label, i) => {
                        return (
                          <td key={i} style={{ textAlign: 'end', width: TD_WIDTH }}>
                            {'0'}
                          </td>
                        )
                      })}
                      <td style={{ textAlign: 'end', width: TD_WIDTH }}>{'0'}</td>
                    </Fragment>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <ControlComponent />
      <SimpleStateManagerTestComponent />
      <StateManagerTestComponent />
      {/* <AsyncStateManagerTestComponent /> */}
      <ReactTestComponent />
      {/* <RecoilTestComponent /> */}
      <ReduxTestComponent />
      <ZustandTestComponent />
      <HookstateTestComponent />
      {/* <ReactRelinkTestComponent /> */}
    </SetStateContext.Provider>
  )
}

type StateManagerType = keyof typeof DEFAULT_SET_STATE_CONTEXT

const DEFAULT_SET_STATE_CONTEXT = {
  SimpleStateManager: null,
  StateManager: null,
  // AsyncStateManager: null,
  React: null,
  // Recoil: null,
  Redux: null,
  Zustand: null,
  HookState: null,
  // ReactRelink: null,
} as const

type ISetStateContext = Record<StateManagerType, Function>
const SetStateContext = createContext<ISetStateContext>(null)

const createTestHandler = (ctx: ISetStateContext, iterations: number) => async () => {
  for (const key in ctx) {
    const setState = (() => {
      switch (key as StateManagerType) {
        case 'SimpleStateManager': return TestSimpleStateManager.set
        case 'StateManager': return TestStateManager.set
        // case 'AsyncStateManager': return TestAsyncStateManager.set
        case 'Zustand': return useZustandState.setState
        case 'HookState': return TestHookState.set
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

function ControlComponent(): JSX.Element {
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

// const TestAsyncStateManager = new AsyncStateManager(0)
// function AsyncStateManagerTestComponent(): JSX.Element {
//   const state = useStateValue(TestAsyncStateManager)
//   return <h2><code>AsyncStateManager</code>: {state}</h2>
// }

function ReactTestComponent(): JSX.Element {
  const [state, setState] = useState(0)
  useContext(SetStateContext).React = setState
  return <h2>React <code>useState</code>: {state}</h2>
}

// const RecoilAtom = atom({ key: 'test', default: 0 })
// function RecoilTestComponentBase(): JSX.Element {
//   const [state, setState] = useRecoilState(RecoilAtom)
//   useContext(SetStateContext).Recoil = setState
//   return <h2>Recoil: {state}</h2>
// }
// function RecoilTestComponent(): JSX.Element {
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

// const TestRelinkState = new RelinkSource({ key: 'test', default: 0 })
// function ReactRelinkTestComponent(): JSX.Element {
//   const state = useRelinkValue(TestRelinkState)
//   return <h2><code>react-relink</code>: {state}</h2>
// }
