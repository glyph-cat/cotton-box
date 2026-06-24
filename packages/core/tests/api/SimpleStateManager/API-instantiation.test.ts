import { SimpleStateManager } from 'cotton-box'
import { IUserState } from '../../test-helpers'

let TestState: SimpleStateManager<IUserState>
afterEach(() => { TestState?.dispose() })

test('No additional options', () => {
  const defaultState: IUserState = {
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  }
  TestState = new SimpleStateManager(defaultState)
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
})

test('With additional options', () => {
  const defaultState: IUserState = {
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  }
  TestState = new SimpleStateManager(defaultState, {
    name: 'numbers',
  })
  expect(TestState.name).toBe('numbers')
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
})
