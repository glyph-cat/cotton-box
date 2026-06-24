import { Nullable } from '@glyph-cat/foundation'
import { StateManager } from 'cotton-box'
import { IUserState } from '../../test-helpers'

let TestState: StateManager<IUserState>
afterEach(() => { TestState?.dispose() })

test('No additional options', () => {
  const defaultState: IUserState = {
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  }
  TestState = new StateManager(defaultState)
  expect(TestState.isInitializing.get()).toBe(false)
  expect(TestState.name).toBeUndefined()
  expect(TestState.get()).toShareObjectReferenceWith(defaultState)
  expect(TestState.get()).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(TestState.defaultState).toShareObjectReferenceWith(defaultState)
  expect(TestState.defaultState).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(TestState.suspense).toBe(false)
})

describe('lifecycle.init', () => {

  test('commit', async () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const didSet = jest.fn()
    const stateToCommit: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 41,
    }
    TestState = new StateManager(defaultState, {
      lifecycle: {
        init({ commit }) {
          commit(stateToCommit)
        },
        didSet,
      },
    })
    expect(TestState.get()).toShareObjectReferenceWith(stateToCommit)
    expect(TestState.get()).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 41,
    })
    expect(didSet).not.toHaveBeenCalled()
    let spiedCurrentState: Nullable<IUserState> = null
    await TestState.init(({ commit, currentState }) => {
      spiedCurrentState = currentState
      commit(currentState)
    })
    expect(spiedCurrentState).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 41,
    })
  })

  test('commitNoop', async () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const didSet = jest.fn()
    let spiedDefaultState: Nullable<IUserState> = null
    TestState = new StateManager(defaultState, {
      lifecycle: {
        init({ defaultState: $defaultState, commitNoop }) {
          spiedDefaultState = $defaultState
          commitNoop()
        },
        didSet,
      },
    })
    expect(spiedDefaultState).toShareObjectReferenceWith(defaultState)
    expect(spiedDefaultState).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    })
    expect(TestState.get()).toShareObjectReferenceWith(defaultState)
    expect(TestState.get()).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    })
    expect(didSet).not.toHaveBeenCalled()
    // `currentState` is not tested here because it is the same for `commit`.
    // Besides, `commitNoop` does not change the state, so it becomes pointless to test.
  })

})
