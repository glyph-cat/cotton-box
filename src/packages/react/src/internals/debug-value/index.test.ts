import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { StateManagerVisibility } from 'cotton-box'
import { evaluateDebugValueVisibility } from '.'

let cleanupManager: CleanupManager
beforeEach(() => { cleanupManager = new CleanupManager() })
afterEach(() => { cleanupManager.run() })

describe(evaluateDebugValueVisibility.name, () => {

  describe('ENVIRONMENT', () => {

    let originalNodeEnv: typeof process.env.NODE_ENV
    beforeEach(() => { originalNodeEnv = process.env.NODE_ENV })
    afterEach(() => {
      // @ts-expect-error because we are forcing a test
      process.env.NODE_ENV = originalNodeEnv
    })

    test('production', () => {
      // @ts-expect-error because we are forcing a test
      process.env.NODE_ENV = 'production'
      expect(evaluateDebugValueVisibility(StateManagerVisibility.ENVIRONMENT)).toBe(false)
    })

    test('test', () => {
      // @ts-expect-error because we are forcing a test
      process.env.NODE_ENV = 'test'
      expect(evaluateDebugValueVisibility(StateManagerVisibility.ENVIRONMENT)).toBe(true)
    })

    test('development', () => {
      // @ts-expect-error because we are forcing a test
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
