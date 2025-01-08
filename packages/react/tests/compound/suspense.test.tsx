import { act, JSX } from 'react'
import { SuspenseTester } from '../suspense-tester'
import { CleanupManager, TestUtils } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({
  Lib: { StateManager, AsyncStateManager },
  ReactLib: {
    useStateValue,
  },
}: TestConfig) => {

  jest.useRealTimers()

  const hooksToTestWith = {
    useStateValue,
  } as const

  const stateManagersToTestWith = {
    StateManager,
    AsyncStateManager,
  } as const

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  for (const hookName in hooksToTestWith) {
    describe(hookName, () => {
      const useHook = hooksToTestWith[hookName]
      for (const StateManagerTypeKey in stateManagersToTestWith) {
        const StateManagerType = stateManagersToTestWith[StateManagerTypeKey]
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
          cleanupManager.append(TestState.dispose)

          const suspenseTester = new SuspenseTester((): JSX.Element => {
            useHook(TestState, TestUtils.mockSelector)
            return null
          }, cleanupManager)

          expect(suspenseTester.componentIsUnderSuspense).toBe(true)

          await act(async () => { await TestUtils.delay(10) })
          expect(suspenseTester.componentIsUnderSuspense).toBe(false)

          act(() => {
            TestState.init(async ({ commitNoop }) => {
              await TestUtils.delay(10)
              commitNoop()
            })
          })
          expect(suspenseTester.componentIsUnderSuspense).toBe(true)

          await act(async () => { await TestUtils.delay(10) })
          expect(suspenseTester.componentIsUnderSuspense).toBe(false)

        })

      }
    })
  }

})
