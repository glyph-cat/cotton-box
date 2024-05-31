import type { StateManager as $1, AsyncStateManager as $2 } from '../../src'
import { CleanupManager, TestUtils } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

type $ = $1<unknown> | $2<unknown>

wrapper(({ Lib: { StateManager, AsyncStateManager } }: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  let TestState: $
  afterEach(() => { TestState?.dispose() })

  const stateManagersToTestWith = {
    StateManager,
    AsyncStateManager,
  } as const

  for (const StateManagerTypeKey in stateManagersToTestWith) {
    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey]
    test(StateManagerTypeKey, async () => {

      TestState = new StateManagerType(null, {
        lifecycle: {
          async init({ commitNoop }) {
            await TestUtils.delay(10)
            commitNoop()
          },
        },
        suspense: true,
      })
      cleanupManager.append(TestState.dispose)

      // Scenario where State Managers should start off with `isInitializing === false`
      // has already been tested when testing the instantiation process.
      expect(TestState.isInitializing).toBe(true)

      await TestUtils.delay(10)
      expect(TestState.isInitializing).toBe(false)

      TestState.init(async ({ commitNoop }) => {
        await TestUtils.delay(10)
        commitNoop()
      })
      expect(TestState.isInitializing).toBe(true)

      await TestUtils.delay(10)
      expect(TestState.isInitializing).toBe(false)

    })
  }

})
