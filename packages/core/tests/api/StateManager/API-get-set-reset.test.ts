import type { StateManagerDidSetArgs } from '../../../../core/src'
import { CleanupManager, IUserState, Nullable } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { StateManager } }: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  test('Main', () => {

    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }

    const didSetArgs: Array<StateManagerDidSetArgs<IUserState>> = []
    const didReset = jest.fn()

    const TestState = new StateManager(defaultState, {
      lifecycle: {
        didSet(args) { didSetArgs.push(args) },
        didReset,
      }
    })
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
    expect(didSetArgs[0]).toStrictEqual({
      state: stateToSet1,
      previousState: defaultState,
      defaultState,
    })
    expect(didReset).not.toHaveBeenCalled()

    let spiedDefaultState = Nullable<IUserState>()
    let stateToSet2 = Nullable<IUserState>()
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
    expect(didSetArgs[1]).toStrictEqual({
      state: stateToSet2,
      previousState: stateToSet1,
      defaultState,
    })
    expect(didReset).not.toHaveBeenCalled()

    TestState.reset()
    expect(TestState.get()).toBe(defaultState)
    expect(Object.is(TestState.get(), defaultState)).toBe(true)
    expect(didSetArgs.length).toBe(2) // No change compared to previous one.
    expect(didReset).toHaveBeenCalledTimes(1)

  })

})
