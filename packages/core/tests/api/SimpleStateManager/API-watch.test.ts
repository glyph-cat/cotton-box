import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  test('Main', async () => {

    const TestState = new SimpleStateManager(42)
    cleanupManager.append(TestState.dispose)

    const numbers1: Array<number> = []
    const numbers2: Array<number> = []
    const unwatch1 = TestState.watch((num) => { numbers1.push(num) })
    const unwatch2 = TestState.watch((num) => { numbers2.push(num) })

    TestState.set(10)
    TestState.set((n) => n * 2)
    TestState.reset()
    expect(numbers1).toStrictEqual([10, 20, 42])
    expect(numbers2).toStrictEqual([10, 20, 42])

    // Make sure there are no issues when calling `unwatch` multiple times.
    unwatch1(); unwatch2()
    unwatch1(); unwatch2()

    TestState.set(23)
    expect(numbers1).toStrictEqual([10, 20, 42])
    expect(numbers2).toStrictEqual([10, 20, 42])

  })

})
