import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { renderSuspenseTester } from 'custom-react-hook-tester'
import { act } from 'react'
import { TestUtils } from '../test-helpers'

jest.useRealTimers()

let teardownFunctions: Array<Fn>
const collectForTeardown = (fn: Fn) => teardownFunctions.push(fn)
beforeEach(() => { teardownFunctions = [] })
afterEach(() => { teardownFunctions = null! })

const hooksToTestWith = {
  useStateValue,
} as const

const stateManagersToTestWith = {
  StateManager,
  AsyncStateManager,
} as const

for (const hookName in hooksToTestWith) {
  describe(hookName, () => {
    const useHook = hooksToTestWith[hookName as keyof typeof hooksToTestWith]
    for (const StateManagerTypeKey in stateManagersToTestWith) {
      const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]
      test(StateManagerTypeKey, async () => {

        const TestState = new StateManagerType(null, {
          lifecycle: {
            async init({ commitNoop }) {
              await TestUtils.delay(10)
              commitNoop()
            },
          },
          suspense: true,
        })
        collectForTeardown(TestState.dispose)

        const hook = renderSuspenseTester(() => useHook(TestState, TestUtils.mockSelector))
        const { meta } = hook
        collectForTeardown(hook.unmount)

        expect(meta.isSuspended()).toBeTrue()

        await act(async () => { await TestUtils.delay(10) })
        expect(meta.isSuspended()).toBeFalse()

        act(() => {
          TestState.init(async ({ commitNoop }) => {
            await TestUtils.delay(10)
            commitNoop()
          })
        })
        expect(meta.isSuspended()).toBeTrue()

        await act(async () => { await TestUtils.delay(10) })
        expect(meta.isSuspended()).toBeFalse()

      })

    }
  })
}
