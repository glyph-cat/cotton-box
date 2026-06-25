import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, StateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { customRenderHook, CustomRenderHookResult } from 'custom-react-hook-tester'
import { act } from 'react'
import { TestUtils } from '../test-helpers'

let hook: CustomRenderHookResult<void, boolean>
afterEach(() => { hook?.unmount() })

let teardownFunctions: Array<Fn>
const collectForTeardown = (fn: Fn) => teardownFunctions.push(fn)
beforeEach(() => { teardownFunctions = [] })
afterEach(() => { teardownFunctions = null! })

const stateManagersToTestWith = {
  StateManager,
  AsyncStateManager,
} as const

for (const StateManagerTypeKey in stateManagersToTestWith) {

  const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]
  test(StateManagerTypeKey, async () => {

    let commitNoopRef: (() => void)

    const TestState = new StateManagerType(null, {
      lifecycle: {
        init({ commitNoop }) {
          commitNoopRef = commitNoop
        },
      },
    })
    collectForTeardown(TestState.dispose)

    hook = customRenderHook(() => useSimpleStateValue(TestState.isInitializing))
    const { result } = hook

    expect(result.current).toBeTrue()
    await act(async () => { commitNoopRef() })
    expect(result.current).toBeFalse()

    await act(async () => {
      await TestState.init(async ({ commitNoop }) => {
        await TestUtils.delay(10)
        commitNoop()
      })
    })
    expect(result.current).toBeTrue()
    await act(async () => { await TestUtils.delay(10) })
    expect(result.current).toBeFalse()

  })
}
