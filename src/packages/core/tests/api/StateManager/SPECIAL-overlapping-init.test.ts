/* eslint-disable no-console */
import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { StateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {
    const TestState = new StateManager('a')
    cleanupManager.append(TestState.dispose)
    TestState.init(async ({ commitNoop }) => {
      await TestUtils.delay(10)
      commitNoop()
    })
    TestState.init(async ({ commitNoop }) => {
      commitNoop()
    })
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

})
