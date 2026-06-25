import { Nullable } from '@glyph-cat/foundation'
import { isThenable } from '@glyph-cat/type-checking'
import { AsyncStateManager } from 'cotton-box'
import type { StateManagerDidSetArgs } from '../../../../core/src'
import { createDefaultUserState, IUserState } from '../../test-helpers'

let TestState: AsyncStateManager<IUserState>
afterEach(async () => { await TestState?.dispose() })

let defaultState: IUserState = null!
beforeEach(() => { defaultState = createDefaultUserState() })
afterEach(() => { defaultState = null! })

test('Main', async () => {

  const didSetArgs: Array<StateManagerDidSetArgs<IUserState>> = []
  const didReset = jest.fn()

  TestState = new AsyncStateManager(defaultState, {
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
  const stateSnapshot1 = TestState.get()
  expect(isThenable(stateSnapshot1)).toBeTrue()
  expect(await stateSnapshot1).toShareObjectReferenceWith(stateToSet1)
  expect(await stateSnapshot1).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 101,
  })
  expect(TestState.getSync()).toShareObjectReferenceWith(stateToSet1)
  expect(TestState.getSync()).toStrictEqual({
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
  await TestState.set((currentState, defaultStateFromFn) => {
    spiedDefaultState = defaultStateFromFn
    const nextState: IUserState = {
      ...currentState,
      luckyNumber: currentState.luckyNumber + 1,
    }
    stateToSet2 = nextState
    return nextState
  })
  expect(spiedDefaultState).toShareObjectReferenceWith(defaultState)
  const stateSnapshot2 = TestState.get()
  expect(isThenable(stateSnapshot2)).toBeTrue()
  expect(await stateSnapshot2).toShareObjectReferenceWith(stateToSet2)
  expect(await stateSnapshot2).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 102,
  })
  expect(TestState.getSync()).toShareObjectReferenceWith(stateToSet2)
  expect(TestState.getSync()).toStrictEqual({
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

  await TestState.reset()
  const stateSnapshot3 = TestState.get()
  expect(isThenable(stateSnapshot3)).toBeTrue()
  expect(await stateSnapshot3).toBe(defaultState)
  expect(await stateSnapshot3).toShareObjectReferenceWith(defaultState)
  expect(TestState.getSync()).toBe(defaultState)
  expect(TestState.getSync()).toShareObjectReferenceWith(defaultState)
  expect(didSetArgs.length).toBe(2) // No change compared to previous one.
  expect(didReset).toHaveBeenCalledTimes(1)

})
