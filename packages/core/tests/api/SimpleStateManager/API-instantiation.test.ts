import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let TestState: InstanceType<typeof SimpleStateManager<IUserState>>
  afterEach(() => { TestState?.dispose() })

  test('No additional options', () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    TestState = new SimpleStateManager(defaultState)
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
  })

})
