/* eslint-disable no-console */
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { AsyncStateManager } }: TestConfig) => {

  jest.useRealTimers()

  let TestState: InstanceType<typeof AsyncStateManager<number>>
  afterEach(async () => { await TestState?.dispose() })

  test('commit', async () => {
    TestState = new AsyncStateManager(0)
    let commitRef: (state: number) => void = null
    await TestState.init(({ commit }) => {
      commitRef = commit
      commit(1)
    })
    const watchCallback = jest.fn()
    commitRef(2)
    expect(watchCallback).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

  test('commitNoop', async () => {
    TestState = new AsyncStateManager(0)
    let commitRef: () => void = null
    await TestState.init(({ commitNoop }) => {
      commitRef = commitNoop
      commitNoop()
    })
    const watchCallback = jest.fn()
    commitRef()
    expect(watchCallback).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

})
