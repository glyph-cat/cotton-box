import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {
    const spiedValues: Array<string> = []
    // Callbacks are expected to be queued and executed in order. So parallel
    // calls will be executed one line after another and nested calls will be
    // executed after their parent.
    const TestState = new StateManager('a')
    cleanupManager.append(TestState.dispose)
    TestState.set((s1) => {
      TestState.set((s2) => {
        TestState.set((s3) => {
          TestState.set('e')
          spiedValues.push(s3) // spiedValues[2]
          return s3 + 'd'
        })
        spiedValues.push(s2) // spiedValues[1]
        return s2 + 'c'
      })
      spiedValues.push(s1) // spiedValues[0]
      return s1 + 'b'
    })
    expect(TestState.get()).toBe('e')
    expect(spiedValues).toStrictEqual(['a', 'ab', 'abc'])
  })

})
