import { CleanupManager, Nullable, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { AsyncStateManager } }: TestConfig) => {

  jest.useRealTimers()

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)
  TestUtils.spyOnConsoleError()

  test('commit', async () => {
    const TestState = new AsyncStateManager(0)
    cleanupManager.append(TestState.dispose)
    let commitRef = Nullable<(state: number) => void>()
    await TestState.init(({ commit }) => {
      commitRef = commit
      commit(1)
    })
    const watchCallback = jest.fn()
    cleanupManager.append(TestState.isInitializing.watch(watchCallback))
    commitRef(2)
    expect(watchCallback).not.toHaveBeenCalled()
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

  test('commitNoop', async () => {
    const TestState = new AsyncStateManager(0)
    cleanupManager.append(TestState.dispose)
    let commitRef = Nullable<() => void>()
    await TestState.init(({ commitNoop }) => {
      commitRef = commitNoop
      commitNoop()
    })
    const watchCallback = jest.fn()
    cleanupManager.append(TestState.isInitializing.watch(watchCallback))
    commitRef()
    expect(watchCallback).not.toHaveBeenCalled()
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

})
