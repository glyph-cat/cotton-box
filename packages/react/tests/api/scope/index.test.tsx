import { act } from 'react'
import { ReactTestRenderer, create } from 'react-test-renderer'
import { $ } from '../../../src/abstractions'
import { CleanupManager } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

type $$ = $<number>

wrapper(({
  Lib: { SimpleStateManager, StateManager, AsyncStateManager },
  ReactLib: { StateManagerScopeProvider, useScoped },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  let root: ReactTestRenderer
  afterEach(() => { root?.unmount() })

  const stateManagersToTestWith = {
    SimpleStateManager,
    StateManager,
    AsyncStateManager,
  } as const

  interface TestComponentProps { id: string }

  for (const StateManagerTypeKey in stateManagersToTestWith) {

    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey] as $$
    test(StateManagerTypeKey, () => {

      const testStates: Array<$$> = []
      const spiedStateManagers: Record<number, $$> = {}

      // TOFIX: [Low priority] Type incompatibility
      // @ts-expect-error ...
      const MainTestState = new StateManagerType(1)

      for (let i = 1; i < 5; i++) {
        // TOFIX: [Low priority] Type incompatibility
        // @ts-expect-error ...
        const TestState = new StateManagerType(i + 1, {
          scope: MainTestState,
        })
        cleanupManager.append(TestState.dispose)
        testStates.push(TestState)
      }

      function TestComponent({ id }: TestComponentProps): JSX.Element {
        const ScopedTestState = useScoped(MainTestState)
        spiedStateManagers[id] = ScopedTestState
        return null
      }

      act(() => {
        root = create(
          <>
            <TestComponent id='a' />
            <StateManagerScopeProvider with={[testStates[0]]}>
              <TestComponent id='b' />
              <StateManagerScopeProvider with={[testStates[1]]}>
                <TestComponent id='c' />
              </StateManagerScopeProvider>
              <StateManagerScopeProvider with={[testStates[2]]}>
                <TestComponent id='d' />
                <StateManagerScopeProvider with={[testStates[3]]}>
                  <TestComponent id='e' />
                </StateManagerScopeProvider>
              </StateManagerScopeProvider>
            </StateManagerScopeProvider>
          </>
        )
      })

      expect(spiedStateManagers['a'].get(1)).toBe(1)
      expect(spiedStateManagers['b'].get(1)).toBe(2)
      expect(spiedStateManagers['c'].get(1)).toBe(3)
      expect(spiedStateManagers['d'].get(1)).toBe(4)
      expect(spiedStateManagers['e'].get(1)).toBe(5)

      expect(Object.is(spiedStateManagers['a'], MainTestState)).toBe(true)
      expect(Object.is(spiedStateManagers['b'], testStates[0])).toBe(true)
      expect(Object.is(spiedStateManagers['c'], testStates[1])).toBe(true)
      expect(Object.is(spiedStateManagers['d'], testStates[2])).toBe(true)
      expect(Object.is(spiedStateManagers['e'], testStates[3])).toBe(true)

    })
  }

})

