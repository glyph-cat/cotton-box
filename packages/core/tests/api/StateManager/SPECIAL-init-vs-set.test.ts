/* eslint-disable no-console */
import { StateManager } from 'cotton-box'
import { TestUtils } from '../../test-helpers'

jest.useRealTimers()

let TestState: StateManager<number>
afterEach(() => { TestState?.dispose() })

test('commit', async () => {

  TestState = new StateManager(0)
  const initPromise = TestState.init(async ({ commit }) => {
    await TestUtils.delay(10)
    commit(101)
  })

  TestState.set(41)
  expect(console.error).toHaveBeenCalledOnceInProduction()
  expect(TestState.get()).toBe(0)

  await initPromise
  expect(TestState.get()).toBe(101)

  TestState.set(42)
  expect(TestState.get()).toBe(42)

})

test('commitNoop', async () => {

  TestState = new StateManager(0)
  const initPromise = TestState.init(async ({ commitNoop }) => {
    await TestUtils.delay(10)
    commitNoop()
  })

  TestState.set(41)
  expect(console.error).toHaveBeenCalledOnceInProduction()
  expect(TestState.get()).toBe(0)

  await initPromise
  expect(TestState.get()).toBe(0)

  TestState.set(42)
  expect(TestState.get()).toBe(42)

})
