import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { Nullable } from '@glyph-cat/foundation'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { AsyncStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  describe('State is already anticipated value', () => {

    test('Wait by value', async () => {
      const TestState = new AsyncStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: Nullable<number> = null
      const cb = async () => {
        waitedValue = await TestState.wait(42)
      }
      await cb()
      expect(waitedValue).toBe(42)
    })

    test('Wait by evaluator', async () => {
      const TestState = new AsyncStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: Nullable<number> = null
      let spiedDefaultState: Nullable<number> = null
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
      const TestState = new AsyncStateManager(41)
      cleanupManager.append(TestState.dispose)
      let waitedValue: Nullable<number> = null
      const cb = async () => {
        waitedValue = await TestState.wait(42)
      }
      const cbPromise = cb()
      expect(waitedValue).toBeNull()
      TestState.set(42)
      await cbPromise
      expect(waitedValue).toBe(42)
    })

    test('Wait by evaluator', async () => {
      const TestState = new AsyncStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: Nullable<number> = null
      let spiedDefaultState: Nullable<number> = null
      const cb = async () => {
        waitedValue = await TestState.wait((state, defaultState) => {
          spiedDefaultState = defaultState
          return state % 2 !== 0
        })
      }
      const cbPromise = cb()
      expect(waitedValue).toBeNull()
      expect(spiedDefaultState).toBe(42)
      TestState.set(41)
      await cbPromise
      expect(waitedValue).toBe(41)
    })

  })

})
