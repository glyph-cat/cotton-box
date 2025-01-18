import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { StateChangeEventType } from '../../../src'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {

    const TestState = new StateManager(42)
    cleanupManager.append(TestState.dispose)

    const numbers: Array<[number, StateChangeEventType]> = []
    const unwatch1 = TestState.watch((...args) => { numbers.push(args) })

    // Make sure there are no issues when calling `dispose` multiple times.
    TestState.dispose()
    TestState.dispose()

    // Make sure `unwatch` callback has the same type/signature even after dispose.
    const unwatch2 = TestState.watch((...args) => { numbers.push(args) })
    expect(typeof unwatch2).toBe('function')

    // Expect no state changes after disposal
    TestState.set(n => n + 1)
    expect(numbers).toStrictEqual([])

    // Make sure there are no issues when calling `unwatch` even after disposed.
    unwatch1()
    unwatch2()

  })

})
