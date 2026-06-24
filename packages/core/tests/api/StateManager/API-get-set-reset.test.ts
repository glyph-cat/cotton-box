import { Nullable } from '@glyph-cat/foundation'
import { StateManager } from 'cotton-box'
import type { StateManagerDidSetArgs } from '../../../../core/src'
import { IUserState } from '../../test-helpers'

let TestState: StateManager<IUserState>
afterEach(() => { TestState?.dispose() })

test('Main', () => {

  const defaultState: IUserState = {
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  }

  const didSetArgs: Array<StateManagerDidSetArgs<IUserState>> = []
  const didReset = jest.fn()

  TestState = new StateManager(defaultState, {
    lifecycle: {
      didSet(args) { didSetArgs.push(args) },
      didReset,
    }
  })

  const stateToSet1: IUserState = {
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 101,
  }
  TestState.set(stateToSet1)
  expect(TestState.get()).toShareObjectReferenceWith(stateToSet1)
  expect(TestState.get()).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 101,
  })
  expect(didSetArgs[0]).toStrictEqual({
    state: stateToSet1,
    previousState: defaultState,
    defaultState,
  })
  expect(didReset).not.toHaveBeenCalled()

  let spiedDefaultState: Nullable<IUserState> = null
  let stateToSet2: Nullable<IUserState> = null
  TestState.set((currentState, defaultStateFromFn) => {
    spiedDefaultState = defaultStateFromFn
    const nextState: IUserState = {
      ...currentState,
      luckyNumber: currentState.luckyNumber + 1,
    }
    stateToSet2 = nextState
    return nextState
  })
  expect(spiedDefaultState).toShareObjectReferenceWith(defaultState)
  expect(TestState.get()).toShareObjectReferenceWith(stateToSet2)
  expect(TestState.get()).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 102,
  })
  expect(didSetArgs[1]).toStrictEqual({
    state: stateToSet2,
    previousState: stateToSet1,
    defaultState,
  })
  expect(didReset).not.toHaveBeenCalled()

  TestState.reset()
  expect(TestState.get()).toBe(defaultState)
  expect(TestState.get()).toShareObjectReferenceWith(defaultState)
  expect(didSetArgs.length).toBe(2) // No change compared to previous one.
  expect(didReset).toHaveBeenCalledTimes(1)

})
