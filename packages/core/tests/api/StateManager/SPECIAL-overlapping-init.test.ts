/* eslint-disable no-console */
import { StateManager } from 'cotton-box'
import { TestUtils } from '../../test-helpers'

let TestState: StateManager<string>
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
  expect(console.error).toHaveBeenCalledOnceInProduction()
})
