/* eslint-disable no-console */
import { AsyncStateManager } from '.'
import { IUserState, MockStorage, TestUtils } from '../../../tests/test-helpers'
import { StateManagerLifecycle } from '../StateManager'

const mockStorage = new MockStorage()

let TestState: AsyncStateManager<IUserState>
afterEach(async () => { await TestState?.dispose() })

const storageKey = 'test-key'

function initTestState(): StateManagerLifecycle<IUserState> {
  const lifecycle: StateManagerLifecycle<IUserState> = {
    init({ commit, commitNoop }) {
      const rawState = mockStorage.getItem(storageKey)
      if (rawState) {
        TestUtils.tryOnly(() => {
          const parsedState = JSON.parse(rawState)
          commit(parsedState)
          return // Early exit
        })
      }
      commitNoop()
    },
    didSet({ state }) {
      mockStorage.setItem(storageKey, JSON.stringify(state))
    },
    didReset: jest.fn(() => {
      mockStorage.removeItem(storageKey)
    }),
  }
  TestState = new AsyncStateManager({
    firstName: '',
    lastName: '',
    luckyNumber: 0,
  }, { lifecycle })
  return lifecycle
}

test('Bugfix: `didReset` gets called upon initialization via `commit`', async () => {

  let lifecycle: StateManagerLifecycle<IUserState>

  lifecycle = initTestState()

  await TestState.set({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(lifecycle.didReset).not.toHaveBeenCalled()
  expect(JSON.parse(mockStorage.getItem(storageKey))).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })

  await TestState.dispose()
  lifecycle = initTestState()

  expect(await TestState.get()).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(console.error).not.toHaveBeenCalled()
  expect(lifecycle.didReset).not.toHaveBeenCalled()
  expect(JSON.parse(mockStorage.getItem(storageKey))).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })

})
