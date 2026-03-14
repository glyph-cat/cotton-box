import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { SimpleStateManager, StateManagerVisibility } from 'cotton-box'
import {
  evaluateDebugValueVisibility,
  getDebugName,
} from '.'

let cleanupManager: CleanupManager
beforeEach(() => { cleanupManager = new CleanupManager() })
afterEach(() => { cleanupManager.run() })

describe(getDebugName.name, () => {

  test('Happy path', () => {
    const TestStateManager = new SimpleStateManager(0, { name: 'TestStateManager' })
    cleanupManager.append(TestStateManager.dispose)
    expect(getDebugName(TestStateManager)).toBe('TestStateManager')
  })

  test('null', () => {
    expect(getDebugName(null)).toBe('NoState')
  })

  test('undefined', () => {
    expect(getDebugName(undefined)).toBe('NoState')
  })

})

describe(evaluateDebugValueVisibility.name, () => {

  describe('ENVIRONMENT', () => {

    let originalNodeEnv: typeof process.env.NODE_ENV
    beforeEach(() => { originalNodeEnv = process.env.NODE_ENV })
    afterEach(() => { process.env.NODE_ENV = originalNodeEnv })

    test('production', () => {
      process.env.NODE_ENV = 'production'
      expect(evaluateDebugValueVisibility(StateManagerVisibility.ENVIRONMENT)).toBe(false)
    })

    test('test', () => {
      process.env.NODE_ENV = 'test'
      expect(evaluateDebugValueVisibility(StateManagerVisibility.ENVIRONMENT)).toBe(true)
    })

    test('development', () => {
      process.env.NODE_ENV = 'development'
      expect(evaluateDebugValueVisibility(StateManagerVisibility.ENVIRONMENT)).toBe(true)
    })

  })

  test('EXPOSED', () => {
    expect(evaluateDebugValueVisibility(StateManagerVisibility.EXPOSED)).toBe(true)
  })

  test('HIDDEN', () => {
    expect(evaluateDebugValueVisibility(StateManagerVisibility.HIDDEN)).toBe(false)
  })

})
