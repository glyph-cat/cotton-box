import { CleanupManager, IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { AsyncStateManager, StateManagerVisibility } }: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  test('No additional options', async () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new AsyncStateManager(defaultState)
    cleanupManager.append(TestState.dispose)
    expect(TestState.isInitializing.get()).toBe(false)
    expect(TestState.type).toBe(3)
    expect(TestState.name).toBe(undefined)
    expect(Object.is(await TestState.get(), defaultState)).toBe(true)
    expect(await TestState.get()).toStrictEqual({
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
    expect(TestState.clientOnly).toBe(false)
    expect(TestState.visibility).toBe(StateManagerVisibility.ENVIRONMENT)
    expect(TestState.suspense).toBe(false)
  })

  test('With additional options', async () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new AsyncStateManager(defaultState, {
      name: 'numbers',
      clientOnly: true,
      visibility: StateManagerVisibility.EXPOSED,
    })
    cleanupManager.append(TestState.dispose)
    expect(TestState.isInitializing.get()).toBe(false)
    expect(TestState.type).toBe(3)
    expect(TestState.name).toBe('numbers')
    expect(Object.is(await TestState.get(), defaultState)).toBe(true)
    expect(await TestState.get()).toStrictEqual({
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
    expect(TestState.clientOnly).toBe(true)
    expect(TestState.visibility).toBe(StateManagerVisibility.EXPOSED)
    expect(TestState.suspense).toBe(false)
  })

  describe('lifecycle.init', () => {

    test('commit', async () => {
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const didSet = jest.fn()
      let spiedDefaultState: unknown
      const stateToCommit: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 41,
      }
      const TestState = new AsyncStateManager(defaultState, {
        lifecycle: {
          init({ defaultState: $defaultState, commit }) {
            spiedDefaultState = $defaultState
            commit(stateToCommit)
          },
          didSet,
        },
      })
      cleanupManager.append(TestState.dispose)
      await TestState.wait(() => true) // Wait for init to complete
      expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
      expect(Object.is(await TestState.get(), stateToCommit)).toBe(true)
      expect(await TestState.get()).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 41,
      })
      expect(didSet).not.toHaveBeenCalled()
    })

    test('commitNoop', async () => {
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const didSet = jest.fn()
      let spiedDefaultState: unknown
      const TestState = new AsyncStateManager(defaultState, {
        lifecycle: {
          init({ defaultState: $defaultState, commitNoop }) {
            spiedDefaultState = $defaultState
            commitNoop()
          },
          didSet,
        },
      })
      cleanupManager.append(TestState.dispose)
      await TestState.wait(() => true) // Wait for init to complete
      expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
      expect(spiedDefaultState).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(Object.is(await TestState.get(), defaultState)).toBe(true)
      expect(await TestState.get()).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(didSet).not.toHaveBeenCalled()
    })

  })

})
