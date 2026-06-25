import { Nullable } from '@glyph-cat/foundation'
import { SimpleStateManager } from 'cotton-box'
import { createDefaultUserState, IUserState } from '../../test-helpers'

let TestState: SimpleStateManager<IUserState>
afterEach(() => { TestState?.dispose() })

let defaultState: IUserState = null!
beforeEach(() => { defaultState = createDefaultUserState() })
afterEach(() => { defaultState = null! })

test('Main', () => {

  TestState = new SimpleStateManager(defaultState)

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

  TestState.reset()
  expect(TestState.get()).toBe(defaultState)
  expect(TestState.get()).toShareObjectReferenceWith(defaultState)

})
