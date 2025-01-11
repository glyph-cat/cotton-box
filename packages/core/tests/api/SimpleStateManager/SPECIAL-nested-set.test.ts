import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {
    const spiedValues: Array<string> = []
    // This behavior is intended. `SimpleStateManager` does not queue these
    // callbacks. This is exactly what makes it so lightweight. It is not
    // intended to be used for nested `set` calls.
    const TestState = new SimpleStateManager('a')
    cleanupManager.append(TestState.dispose)
    TestState.set((s1) => {
      TestState.set((s2) => {
        TestState.set((s3) => {
          TestState.set('e')
          spiedValues.push(TestState.get()) // spiedValues[0]
          return s3 + 'd'
        })
        spiedValues.push(TestState.get()) // spiedValues[1]
        return s2 + 'c'
      })
      spiedValues.push(TestState.get()) // spiedValues[2]
      return s1 + 'b'
    })
    expect(TestState.get()).toBe('ab')
    expect(spiedValues).toStrictEqual(['e', 'ad', 'ac'])
  })

})
