import { StateChangeEventType } from '../../../src'
import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  describe('State is already anticipated value', () => {

    test('Wait by value', async () => {
      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: number = null
      const cb = async () => {
        waitedValue = await TestState.wait(42)
      }
      await cb()
      expect(waitedValue).toBe(42)
    })

    test('Wait by evaluator', async () => {
      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: number = null
      let spiedDefaultState: number = null
      let spiedEventType: StateChangeEventType = null
      const cb = async () => {
        waitedValue = await TestState.wait((state, defaultState, eventType) => {
          spiedDefaultState = defaultState
          spiedEventType = eventType
          return state % 2 === 0
        })
      }
      await cb()
      expect(waitedValue).toBe(42)
      expect(spiedDefaultState).toBe(42)
      expect(spiedEventType).toBeNull()
    })

  })

  describe('State is currently not the anticipated value', () => {

    test('Wait by value', async () => {
      const TestState = new SimpleStateManager(41)
      cleanupManager.append(TestState.dispose)
      let waitedValue: number = null
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
      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)
      let waitedValue: number = null
      let spiedDefaultState: number = null
      let spiedEventType: StateChangeEventType = null
      const cb = async () => {
        waitedValue = await TestState.wait((state, defaultState, eventType) => {
          spiedDefaultState = defaultState
          spiedEventType = eventType
          return state % 2 !== 0
        })
      }
      const cbPromise = cb()
      expect(waitedValue).toBe(null)
      expect(spiedDefaultState).toBe(42)
      TestState.set(41)
      await cbPromise
      expect(waitedValue).toBe(41)
      expect(spiedEventType).toBe(StateChangeEventType.SET)
    })

  })

})
