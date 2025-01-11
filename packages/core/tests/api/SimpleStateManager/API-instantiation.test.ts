import { CleanupManager, IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { SimpleStateManager } }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('No additional options', () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new SimpleStateManager(defaultState)
    cleanupManager.append(TestState.dispose)
    expect(TestState.type).toBe('SimpleStateManager')
    expect(TestState.name).toBe('UnnamedStateManager_001')
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
    expect(TestState.clientOnly).toBe(false)
  })

  test('With additional options', () => {
    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new SimpleStateManager(defaultState, {
      name: 'numbers',
      clientOnly: true,
    })
    cleanupManager.append(TestState.dispose)
    expect(TestState.type).toBe('SimpleStateManager')
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
    expect(TestState.clientOnly).toBe(true)
  })

})
