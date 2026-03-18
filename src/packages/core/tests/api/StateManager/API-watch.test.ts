import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', async () => {

    const TestState = new StateManager(42)
    cleanupManager.append(TestState.dispose)

    const payload1: Array<[number]> = []
    const payload2: Array<[number]> = []
    const unwatch1 = TestState.watch((...args) => { payload1.push(args) })
    const unwatch2 = TestState.watch((...args) => { payload2.push(args) })

    TestState.set(10)
    TestState.set((n) => n * 2)
    TestState.reset()
    TestState.init(({ commit }) => { commit(43) })
    expect(payload1).toStrictEqual([[10], [20], [42], [43]])
    expect(payload2).toStrictEqual([[10], [20], [42], [43]])

    // Make sure there are no issues when calling `unwatch` multiple times.
    unwatch1(); unwatch2()
    unwatch1(); unwatch2()

    TestState.set(23)
    expect(payload1).toStrictEqual([[10], [20], [42], [43]])
    expect(payload2).toStrictEqual([[10], [20], [42], [43]])

  })

})
