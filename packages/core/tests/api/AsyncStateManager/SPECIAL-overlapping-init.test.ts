import { CleanupManager, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { AsyncStateManager } }: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)
  TestUtils.spyOnConsoleError()

  test('Main', () => {
    const TestState = new AsyncStateManager('a')
    cleanupManager.append(TestState.dispose)
    TestState.init(async ({ commitNoop }) => {
      await TestUtils.delay(10)
      commitNoop()
    })
    TestState.init(async ({ commitNoop }) => {
      commitNoop()
    })
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(buildEnv === 'prod' ? 0 : 1)
  })

})
