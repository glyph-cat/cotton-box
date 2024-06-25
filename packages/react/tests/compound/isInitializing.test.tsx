import { act } from 'react'
import { CleanupManager, HookTester, TestUtils } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({
  Lib: { StateManager, AsyncStateManager },
  ReactLib: { useSimpleStateValue },
}: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  const stateManagersToTestWith = {
    StateManager,
    AsyncStateManager,
  } as const

  for (const StateManagerTypeKey in stateManagersToTestWith) {

    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey]
    test(StateManagerTypeKey, async () => {

      let commitNoopRef: (() => void) = null
      const TestState = new StateManagerType(null, {
        lifecycle: {
          init({ commitNoop }) {
            commitNoopRef = commitNoop
          },
        },
      })
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookTester({
        cleanupManager,
        useHook: () => useSimpleStateValue(TestState.isInitializing),
        values: {
          isInitializing(state) { return state },
        },
        actions: {
          completeFirstInit() { commitNoopRef() },
          async initAgain() {
            await TestState.init(async ({ commitNoop }) => {
              await TestUtils.delay(10)
              commitNoop()
            })
          }
        },
      })

      expect(hookInterface.get('isInitializing')).toBe(true)
      await hookInterface.action('completeFirstInit')
      expect(hookInterface.get('isInitializing')).toBe(false)

      hookInterface.actionSync('initAgain')
      expect(hookInterface.get('isInitializing')).toBe(true)
      await act(async () => { await TestUtils.delay(10) })
      expect(hookInterface.get('isInitializing')).toBe(false)

    })
  }

})
