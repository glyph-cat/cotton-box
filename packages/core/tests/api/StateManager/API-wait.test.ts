import { CleanupManager, Nullable, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  describe('State is already anticipated value', () => {

    test('Wait by value', async () => {
      const TestState = new StateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue = Nullable<number>()
      const cb = async () => {
        waitedValue = await TestState.wait(42)
      }
      await cb()
      expect(waitedValue).toBe(42)
    })

    test('Wait by evaluator', async () => {
      const TestState = new StateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue = Nullable<number>()
      let spiedDefaultState = Nullable<number>()
      const cb = async () => {
        waitedValue = await TestState.wait((state, defaultState) => {
          spiedDefaultState = defaultState
          return state % 2 === 0
        })
      }
      await cb()
      expect(waitedValue).toBe(42)
      expect(spiedDefaultState).toBe(42)
    })

  })

  describe('State is currently not the anticipated value', () => {

    test('Wait by value', async () => {
      const TestState = new StateManager(41)
      cleanupManager.append(TestState.dispose)
      let waitedValue = Nullable<number>()
      const cb = async () => {
        waitedValue = await TestState.wait(42)
      }
      const cbPromise = cb()
      expect(waitedValue).toBe(null)
      TestState.set(42)
      await cbPromise
      expect(waitedValue).toBe(42)
    })

    test('Wait by evaluator', async () => {
      const TestState = new StateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue = Nullable<number>()
      let spiedDefaultState = Nullable<number>()
      const cb = async () => {
        waitedValue = await TestState.wait((state, defaultState) => {
          spiedDefaultState = defaultState
          return state % 2 !== 0
        })
      }
      const cbPromise = cb()
      expect(waitedValue).toBe(null)
      expect(spiedDefaultState).toBe(42)
      TestState.set(41)
      await cbPromise
      expect(waitedValue).toBe(41)
    })

  })

  describe('Wait should not resolve if state is initializing', () => {

    jest.useRealTimers()

    test('commit', async () => {

      const TestState = new StateManager(42)
      cleanupManager.append(TestState.dispose)

      let isWaitPromiseResolved = false
      TestState.init(async ({ commit }) => {
        await TestUtils.delay(10)
        commit(41)
      })

      const cb = async () => {
        await TestState.wait(41)
        isWaitPromiseResolved = true
      }; cb()
      expect(isWaitPromiseResolved).toBe(false)

      await TestUtils.delay(10)
      expect(isWaitPromiseResolved).toBe(true)

    })

    test('commitNoop', async () => {

      const TestState = new StateManager(0)
      cleanupManager.append(TestState.dispose)

      let isWaitPromiseResolved = false
      TestState.init(async ({ commitNoop }) => {
        await TestUtils.delay(10)
        commitNoop()
      })

      const cb = async () => {
        await TestState.wait(0)
        isWaitPromiseResolved = true
      }; cb()
      expect(isWaitPromiseResolved).toBe(false)

      await TestUtils.delay(10)
      expect(isWaitPromiseResolved).toBe(true)

    })

  })

})
