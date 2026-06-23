import { Nullable } from '@glyph-cat/foundation'
import { isThenable } from '@glyph-cat/type-checking'
import { AsyncStateManager } from 'cotton-box'
import type { StateManagerDidSetArgs } from '../../../../core/src'
import { IUserState } from '../../test-helpers'

let TestState: AsyncStateManager<IUserState>
afterEach(async () => { await TestState?.dispose() })

test('Main', async () => {

  const defaultState: IUserState = {
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  }

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
  expect(isThenable(stateSnapshot1)).toBe(true)
  expect(Object.is(await stateSnapshot1, stateToSet1)).toBe(true)
  expect(await stateSnapshot1).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 101,
  })
  expect(Object.is(TestState.getSync(), stateToSet1)).toBe(true)
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
  expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
  const stateSnapshot2 = TestState.get()
  expect(isThenable(stateSnapshot2)).toBe(true)
  expect(Object.is(await stateSnapshot2, stateToSet2)).toBe(true)
  expect(await stateSnapshot2).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 102,
  })
  expect(Object.is(TestState.getSync(), stateToSet2)).toBe(true)
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
  expect(isThenable(stateSnapshot3)).toBe(true)
  expect(await stateSnapshot3).toBe(defaultState)
  expect(Object.is(await stateSnapshot3, defaultState)).toBe(true)
  expect(TestState.getSync()).toBe(defaultState)
  expect(Object.is(TestState.getSync(), defaultState)).toBe(true)
  expect(didSetArgs.length).toBe(2) // No change compared to previous one.
  expect(didReset).toHaveBeenCalledTimes(1)

})
