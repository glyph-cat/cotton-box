import { StateChangeEventType } from '../../../src'
import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {

    const TestState = new SimpleStateManager(42)
    cleanupManager.append(TestState.dispose)

    const watchPayload: Array<[number, StateChangeEventType]> = []
    const unwatch1 = TestState.watch((...args) => { watchPayload.push(args) })

    // Make sure there are no issues when calling `dispose` multiple times.
    TestState.dispose()
    TestState.dispose()

    // Make sure `unwatch` callback has the same type/signature even after dispose.
    const unwatch2 = TestState.watch((...args) => { watchPayload.push(args) })
    expect(typeof unwatch2).toBe('function')

    // Expect no state changes after disposal
    TestState.set(n => n + 1)
    expect(watchPayload).toStrictEqual([])

    // Make sure there are no issues when calling `unwatch` even after disposed.
    unwatch1()
    unwatch2()

  })

})
