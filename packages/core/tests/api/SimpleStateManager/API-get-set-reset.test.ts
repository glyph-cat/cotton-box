import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', () => {

    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }

    const TestState = new SimpleStateManager(defaultState)
    cleanupManager.append(TestState.dispose)

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

    let spiedDefaultState: IUserState = null
    let stateToSet2: IUserState = null
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
