import { CleanupManager } from '@glyph-cat/cleanup-manager'
import type { StateManagerDidSetArgs } from '../../../../core/src'
import { IUserState, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { AsyncStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Main', async () => {

    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }

    const didSetArgs: Array<StateManagerDidSetArgs<IUserState>> = []
    const didReset = jest.fn()

    const TestState = new AsyncStateManager(defaultState, {
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
    const stateSnapshot1 = TestState.get()
    expect(TestUtils.isThenable(stateSnapshot1)).toBe(true)
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

    let spiedDefaultState: IUserState = null
    let stateToSet2: IUserState = null
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
    expect(TestUtils.isThenable(stateSnapshot2)).toBe(true)
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
    expect(TestUtils.isThenable(stateSnapshot3)).toBe(true)
    expect(await stateSnapshot3).toBe(defaultState)
    expect(Object.is(await stateSnapshot3, defaultState)).toBe(true)
    expect(TestState.getSync()).toBe(defaultState)
    expect(Object.is(TestState.getSync(), defaultState)).toBe(true)
    expect(didSetArgs.length).toBe(2) // No change compared to previous one.
    expect(didReset).toHaveBeenCalledTimes(1)

  })

})
