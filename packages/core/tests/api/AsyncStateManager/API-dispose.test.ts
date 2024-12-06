import { StateChangeEventType } from '../../../src'
import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { AsyncStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  test('Main', async () => {

    const TestState = new AsyncStateManager(42)
    cleanupManager.append(TestState.dispose)

    const numbers1: Array<[number, StateChangeEventType]> = []
    const numbers2: Array<[number, StateChangeEventType]> = []
    const unwatch1 = TestState.watch((...args) => { numbers1.push(args) })

    // Make sure there are no issues when calling `dispose` multiple times.
    await TestState.dispose()
    await TestState.dispose()

    // Make sure `unwatch` callback has the same type/signature even after dispose.
    const unwatch2 = TestState.watch((...args) => { numbers2.push(args) })
    expect(typeof unwatch2).toBe('function')

    // Expect no state changes after disposal
    await TestState.set(n => n + 1)
    expect(numbers1).toStrictEqual([])
    expect(numbers2).toStrictEqual([])

    // Make sure there are no issues when calling `unwatch` even after disposed.
    unwatch1()
    unwatch2()

  })

})
