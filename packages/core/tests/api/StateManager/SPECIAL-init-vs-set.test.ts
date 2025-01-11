import { CleanupManager, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { StateManager } }: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  test('commit', async () => {

    const TestState = new StateManager(0)
    cleanupManager.append(TestState.dispose)
    const initPromise = TestState.init(async ({ commit }) => {
      await TestUtils.delay(10)
      commit(101)
    })

    TestState.set(41)
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
    expect(TestState.get()).toBe(0)

    await initPromise
    expect(TestState.get()).toBe(101)

    TestState.set(42)
    expect(TestState.get()).toBe(42)

  })

  test('commitNoop', async () => {

    const TestState = new StateManager(0)
    cleanupManager.append(TestState.dispose)
    const initPromise = TestState.init(async ({ commitNoop }) => {
      await TestUtils.delay(10)
      commitNoop()
    })

    TestState.set(41)
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
    expect(TestState.get()).toBe(0)

    await initPromise
    expect(TestState.get()).toBe(0)

    TestState.set(42)
    expect(TestState.get()).toBe(42)

  })

})
