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
    describe(StateManagerTypeKey, () => {

      test('Promise should immediately resolve if state already matches', async () => {

        let isInitializingCompleted = false

        TestState = new StateManagerType(null, {
          lifecycle: {
            async init({ commitNoop }) {
              await TestUtils.delay(10)
              commitNoop()
            },
          },
        })
        cleanupManager.append(TestState.dispose)

        await TestUtils.delay(10) // manually wait for init to complete
        TestState.waitForInit().then(() => { isInitializingCompleted = true })
        await TestUtils.delay(0)
        expect(isInitializingCompleted).toBe(true)

      })

      test('With optional parameter (state not already match)', async () => {

        let isInitializingStarted = false

        TestState = new StateManagerType(null)
        cleanupManager.append(TestState.dispose)

        TestState.waitForInit(true).then(() => { isInitializingStarted = true })
        expect(isInitializingStarted).toBe(false)

        TestState.init(async ({ commitNoop }) => {
          await TestUtils.delay(10)
          commitNoop()
        })
        await TestUtils.delay(0) // wait for next tick
        expect(isInitializingStarted).toBe(true)

      })

    })
  }

})
