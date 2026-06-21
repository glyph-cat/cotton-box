import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let TestState: InstanceType<typeof SimpleStateManager<number>>
  afterEach(() => { TestState?.dispose() })

  test('Main', async () => {

    TestState = new SimpleStateManager(42)

    const payload1: Array<[number]> = []
    const payload2: Array<[number]> = []
    const unwatch1 = TestState.watch((...args) => { payload1.push(args) })
    const unwatch2 = TestState.watch((...args) => { payload2.push(args) })

    TestState.set(10)
    TestState.set((n) => n * 2)
    TestState.reset()
    expect(payload1).toStrictEqual([[10], [20], [42]])
    expect(payload2).toStrictEqual([[10], [20], [42]])

    // Make sure there are no issues when calling `unwatch` multiple times.
    unwatch1(); unwatch2()
    unwatch1(); unwatch2()

    TestState.set(23)
    expect(payload1).toStrictEqual([[10], [20], [42]])
    expect(payload2).toStrictEqual([[10], [20], [42]])

  })

})
