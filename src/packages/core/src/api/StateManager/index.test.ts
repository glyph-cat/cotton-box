import { StateManager, StateManagerLifecycle } from '.'
import { IUserState, MockStorage, TestUtils } from '../../../tests/test-helpers'

const mockStorage = new MockStorage()

let TestState: StateManager<IUserState>
afterEach(() => { TestState?.dispose() })

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
  TestState = new StateManager({
    firstName: '',
    lastName: '',
    luckyNumber: 0,
  }, { lifecycle })
  return lifecycle
}

test('Bugfix: `didReset` gets called upon initialization via `commit`', () => {

  let lifecycle: StateManagerLifecycle<IUserState>

  lifecycle = initTestState()

  TestState.set({
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

  TestState.dispose()
  lifecycle = initTestState()

  expect(TestState.get()).toStrictEqual({
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

})
