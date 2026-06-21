import { Nullable } from '@glyph-cat/foundation'
import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let TestState: InstanceType<typeof SimpleStateManager<IUserState>>
  afterEach(() => { TestState?.dispose() })

  test('Main', () => {

    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }

    TestState = new SimpleStateManager(defaultState)

    const stateToSet1: IUserState = {
      firstName: 'Jane',
      lastName: 'Clover',
      luckyNumber: 101,
    }
    TestState.set(stateToSet1)
    expect(Object.is(TestState.get(), stateToSet1)).toBe(true)
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
    expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
    expect(Object.is(TestState.get(), stateToSet2)).toBe(true)
    expect(TestState.get()).toStrictEqual({
      firstName: 'Jane',
      lastName: 'Clover',
      luckyNumber: 102,
    })

    TestState.reset()
    expect(TestState.get()).toBe(defaultState)
    expect(Object.is(TestState.get(), defaultState)).toBe(true)

  })

})
