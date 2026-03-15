import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { HookTester } from '@glyph-cat/react-test-utils'
import { act } from 'react'
import { TestUtils } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({
  Lib: { StateManager, AsyncStateManager },
  ReactLib: { useSimpleStateValue },
}: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

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

      const hookTester = new HookTester({
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
      }, cleanupManager)

      expect(hookTester.get('isInitializing')).toBe(true)
      await hookTester.actionAsync('completeFirstInit')
      expect(hookTester.get('isInitializing')).toBe(false)

      hookTester.action('initAgain')
      expect(hookTester.get('isInitializing')).toBe(true)
      await act(async () => { await TestUtils.delay(10) })
      expect(hookTester.get('isInitializing')).toBe(false)

    })
  }

})
