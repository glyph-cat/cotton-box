/* eslint-disable no-console */
import { TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { AsyncStateManager } }: TestConfig) => {

  let TestState: InstanceType<typeof AsyncStateManager<string>>
  afterEach(async () => { await TestState?.dispose() })

  test('Main', () => {
    TestState = new AsyncStateManager('a')
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
