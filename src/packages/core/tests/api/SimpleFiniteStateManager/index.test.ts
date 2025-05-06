import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { TestConfig, wrapper } from '../../test-wrapper'

enum DummyState {
  CREATED = 1,
  STARTING,
  STARTED,
  STOPPED,
  DISPOSED,
}

wrapper(({ Lib: {
  SimpleFiniteStateManager,
  InvalidStateTransitionError,
} }: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  test('Happy path', () => {

    const TestState = new SimpleFiniteStateManager(DummyState.CREATED, [
      [DummyState.CREATED, DummyState.STARTING],
      [DummyState.CREATED, DummyState.DISPOSED],
      [DummyState.STARTING, DummyState.STARTED],
      [DummyState.STARTED, DummyState.STOPPED],
      [DummyState.STOPPED, DummyState.STARTED],
      [DummyState.STOPPED, DummyState.DISPOSED],
    ], {
      serializeState(state) {
        return DummyState[state] ?? String(state)
      },
    })
    cleanupManager.append(TestState.dispose)
    expect(() => {
      expect(TestState.get()).toBe(DummyState.CREATED)
      TestState.set(DummyState.STARTING)
      expect(TestState.get()).toBe(DummyState.STARTING)
      TestState.set(DummyState.STARTED)
      expect(TestState.get()).toBe(DummyState.STARTED)
      TestState.set(DummyState.STOPPED)
      expect(TestState.get()).toBe(DummyState.STOPPED)
      TestState.set(DummyState.STARTED)
      expect(TestState.get()).toBe(DummyState.STARTED)
      TestState.set(DummyState.STOPPED)
      expect(TestState.get()).toBe(DummyState.STOPPED)
      TestState.set(DummyState.DISPOSED)
      expect(TestState.get()).toBe(DummyState.DISPOSED)
    }).not.toThrow()

  })

  test('Invalid state transition', () => {

    const TestState = new SimpleFiniteStateManager(DummyState.CREATED, [
      [DummyState.CREATED, DummyState.STARTING],
      [DummyState.CREATED, DummyState.DISPOSED],
      [DummyState.STARTING, DummyState.STARTED],
      [DummyState.STARTED, DummyState.STOPPED],
      [DummyState.STOPPED, DummyState.STARTED],
      [DummyState.STOPPED, DummyState.DISPOSED],
    ], {
      serializeState(state) {
        return DummyState[state] ?? String(state)
      },
    })
    cleanupManager.append(TestState.dispose)
    expect(() => {
      TestState.set(DummyState.STOPPED)
    }).toThrow(new InvalidStateTransitionError(
      DummyState[DummyState.CREATED],
      DummyState[DummyState.STOPPED],
      TestState.name,
    ))

  })

  test('No state transitions defined', () => {

    const TestState = new SimpleFiniteStateManager(DummyState.CREATED, [], {
      serializeState(state) {
        return DummyState[state] ?? String(state)
      },
    })
    cleanupManager.append(TestState.dispose)
    expect(() => {
      TestState.set(DummyState.STARTED)
    }).toThrow(new InvalidStateTransitionError(
      DummyState[DummyState.CREATED],
      DummyState[DummyState.STARTED],
      TestState.name,
    ))

  })

  test('trySet', () => {

    const TestState = new SimpleFiniteStateManager(DummyState.CREATED, [
      [DummyState.CREATED, DummyState.STARTING],
      [DummyState.CREATED, DummyState.DISPOSED],
      [DummyState.STARTING, DummyState.STARTED],
      [DummyState.STARTED, DummyState.STOPPED],
      [DummyState.STOPPED, DummyState.STARTED],
      [DummyState.STOPPED, DummyState.DISPOSED],
    ], {
      serializeState(state) {
        return DummyState[state] ?? String(state)
      },
    })
    cleanupManager.append(TestState.dispose)

    expect(TestState.trySet(DummyState.STARTED)).toBe(false)
    expect(TestState.trySet(DummyState.STARTING)).toBe(true)

  })

})
