/* eslint-disable no-console */
import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { Fn } from '@glyph-cat/foundation'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { StateManager } }: TestConfig) => {

  jest.useRealTimers()

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('commit', async () => {
    const TestState = new StateManager(0)
    cleanupManager.append(TestState.dispose)
    // Will not be null by the time it is used if test conditions are fulfilled.
    let commitRef: Fn<number> = null!
    TestState.init(({ commit }) => {
      commitRef = commit
      commit(1)
    })
    const watchCallback = jest.fn()
    cleanupManager.append(TestState.isInitializing.watch(watchCallback))
    commitRef(2)
    expect(watchCallback).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

  test('commitNoop', async () => {
    const TestState = new StateManager(0)
    cleanupManager.append(TestState.dispose)
    // Will not be null by the time it is used if test conditions are fulfilled.
    let commitRef: Fn = null!
    TestState.init(({ commitNoop }) => {
      commitRef = commitNoop
      commitNoop()
    })
    const watchCallback = jest.fn()
    cleanupManager.append(TestState.isInitializing.watch(watchCallback))
    commitRef()
    expect(watchCallback).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

})
