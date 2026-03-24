import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { Nullable } from '@glyph-cat/foundation'
import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { AsyncStateManager, StateManagerVisibility } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('No additional options', async () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new AsyncStateManager(defaultState)
    cleanupManager.append(TestState.dispose)
    expect(TestState.isInitializing.get()).toBe(false)
    expect(TestState.name).toBeUndefined()
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
    expect(TestState.visibility).toBeUndefined()
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
      visibility: StateManagerVisibility.EXPOSED,
    })
    cleanupManager.append(TestState.dispose)
    expect(TestState.isInitializing.get()).toBe(false)
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
      let spiedDefaultState: Nullable<IUserState> = null
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
      await TestState.isInitializing.wait(false)
      expect(Object.is(spiedDefaultState, defaultState)).toBe(true)
      expect(Object.is(await TestState.get(), stateToCommit)).toBe(true)
      expect(await TestState.get()).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 41,
      })
      expect(didSet).not.toHaveBeenCalled()
      let spiedCurrentState: Nullable<IUserState> = null
      await TestState.init(({ commit, currentState }) => {
        spiedCurrentState = currentState
        commit(currentState)
      })
      expect(spiedCurrentState).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 41,
      })
    })

    test('commitNoop', async () => {
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const didSet = jest.fn()
      let spiedDefaultState: Nullable<IUserState> = null
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
      await TestState.isInitializing.wait(false)
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
      // `currentState` is not tested here because it is the same for `commit`.
      // Besides, `commitNoop` does not change the state, so it becomes pointless to test.
    })

  })

})
