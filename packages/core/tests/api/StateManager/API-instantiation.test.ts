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
  expect(Object.is(TestState.get(), defaultState)).toBe(true)
  expect(TestState.get()).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(Object.is(TestState.defaultState, defaultState)).toBe(true)
  expect(TestState.defaultState).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(TestState.visibility).toBeUndefined()
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
    expect(Object.is(TestState.get(), stateToCommit)).toBe(true)
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
    expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
    expect(spiedDefaultState).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    })
    expect(Object.is(TestState.get(), defaultState)).toBe(true)
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
