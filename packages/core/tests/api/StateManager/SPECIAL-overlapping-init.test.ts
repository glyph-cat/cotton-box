/* eslint-disable no-console */
import { TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ buildEnv, Lib: { StateManager } }: TestConfig) => {

  let TestState: InstanceType<typeof StateManager<string>>
  afterEach(() => { TestState?.dispose() })

  test('Main', () => {
    TestState = new StateManager('a')
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
