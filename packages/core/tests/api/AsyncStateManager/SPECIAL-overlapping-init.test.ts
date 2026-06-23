/* eslint-disable no-console */
import { AsyncStateManager } from 'cotton-box'
import { TestUtils } from '../../test-helpers'

let TestState: AsyncStateManager<string>
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
  expect(console.error).toHaveBeenCalledOnceInProduction()
})
