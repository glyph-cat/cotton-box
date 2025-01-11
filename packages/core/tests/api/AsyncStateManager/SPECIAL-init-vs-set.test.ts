import { CleanupManager, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { AsyncStateManager } }: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  describe('No pending changes', () => {

    test('commit', async () => {

      const TestState = new AsyncStateManager(0)
      cleanupManager.append(TestState.dispose)
      const initPromise = TestState.init(async ({ commit }) => {
        await TestUtils.delay(10)
        commit(101)
      })

      TestState.set(41)
      expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
      expect(TestState.getSync()).toBe(0)

      await initPromise
      expect(TestState.getSync()).toBe(101)

      TestState.set(42)
      expect(TestState.getSync()).toBe(42)

    })

    test('commitNoop', async () => {

      const TestState = new AsyncStateManager(0)
      cleanupManager.append(TestState.dispose)
      const initPromise = TestState.init(async ({ commitNoop }) => {
        await TestUtils.delay(10)
        commitNoop()
      })

      TestState.set(41)
      expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
      expect(TestState.getSync()).toBe(0)

      await initPromise
      expect(TestState.getSync()).toBe(0)

      TestState.set(42)
      expect(TestState.getSync()).toBe(42)

    })


  })

  describe('Has pending changes', () => {

    test('commit', async () => {

      const TestState = new AsyncStateManager(0)
      cleanupManager.append(TestState.dispose)

      TestState.set(async () => { await TestUtils.delay(10); return 1 })
      setTimeout(() => {
        TestState.init(async ({ commit }) => {
          await TestUtils.delay(10)
          commit(101)
        })
      }, 10)

      expect(TestState.getSync()).toBe(0)

      // Expect init to not take effect yet
      await TestUtils.delay(10)
      expect(TestState.getSync()).toBe(1)

      await TestUtils.delay(10)
      expect(TestState.getSync()).toBe(101)

    })

    test('commitNoop', async () => {

      const TestState = new AsyncStateManager(0)
      cleanupManager.append(TestState.dispose)

      let isInitCalled = false
      TestState.set(async () => { await TestUtils.delay(10); return 1 })
      setTimeout(() => {
        TestState.init(async ({ commitNoop }) => {
          await TestUtils.delay(10)
          commitNoop()
          isInitCalled = true
        })
      }, 10)

      await TestUtils.delay(10)
      expect(isInitCalled).toBe(false)

      await TestUtils.delay(10)
      expect(isInitCalled).toBe(true)

    })

  })

})
