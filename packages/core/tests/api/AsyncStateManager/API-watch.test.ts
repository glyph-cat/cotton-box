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

    const payload1: Array<[number, StateChangeEventType]> = []
    const payload2: Array<[number, StateChangeEventType]> = []
    const unwatch1 = TestState.watch((...args) => { payload1.push(args) })
    const unwatch2 = TestState.watch((...args) => { payload2.push(args) })

    await TestState.set(10)
    await TestState.set((n) => n * 2)
    await TestState.reset()
    await TestState.init(({ commit }) => { commit(43) })
    expect(payload1).toStrictEqual([
      [10, StateChangeEventType.SET],
      [20, StateChangeEventType.SET],
      [42, StateChangeEventType.RESET],
      [43, StateChangeEventType.INIT],
    ])
    expect(payload2).toStrictEqual([
      [10, StateChangeEventType.SET],
      [20, StateChangeEventType.SET],
      [42, StateChangeEventType.RESET],
      [43, StateChangeEventType.INIT],
    ])

    // Make sure there are no issues when calling `unwatch` multiple times.
    unwatch1(); unwatch2()
    unwatch1(); unwatch2()

    await TestState.set(23)
    expect(payload1).toStrictEqual([
      [10, StateChangeEventType.SET],
      [20, StateChangeEventType.SET],
      [42, StateChangeEventType.RESET],
      [43, StateChangeEventType.INIT],
    ])
    expect(payload2).toStrictEqual([
      [10, StateChangeEventType.SET],
      [20, StateChangeEventType.SET],
      [42, StateChangeEventType.RESET],
      [43, StateChangeEventType.INIT],
    ])

  })

})
