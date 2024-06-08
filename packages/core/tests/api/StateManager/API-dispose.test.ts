import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  test('Main', () => {

    const TestState = new StateManager(42)
    cleanupManager.append(TestState.dispose)

    const numbers: Array<number> = []
    const unwatch1 = TestState.watch((num) => { numbers.push(num) })

    // Make sure there are no issues when calling `dispose` multiple times.
    TestState.dispose()
    TestState.dispose()

    // Make sure `unwatch` callback has the same type/signature even after dispose.
    const unwatch2 = TestState.watch((num) => { numbers.push(num) })
    expect(typeof unwatch2).toBe('function')

    // Expect no state changes after disposal
    TestState.set(n => n + 1)
    expect(numbers).toStrictEqual([])

    // Make sure there are no issues when calling `unwatch` even after disposed.
    unwatch1()
    unwatch2()

  })

})
