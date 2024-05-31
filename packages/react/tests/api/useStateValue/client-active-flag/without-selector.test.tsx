import { useState } from 'react'
import { CleanupManager, UNSAFE_HookInterface } from '../../../test-helpers'
import { TestConfig, wrapper } from '../../../test-wrapper'

wrapper(({
  Lib: { AsyncStateManager, SimpleStateManager, StateManager },
  ReactLib: { useStateValue },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  const stateManagersToTestWith = {
    SimpleStateManager,
    StateManager,
    AsyncStateManager,
  } as const

  type StateManagerType = typeof SimpleStateManager<number> | typeof StateManager<number> | typeof AsyncStateManager<number>

  for (const StateManagerTypeKey in stateManagersToTestWith) {

    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey] as StateManagerType
    const isAsyncStateManager = StateManagerTypeKey === 'AsyncStateManager'

    describe(StateManagerTypeKey, () => {

      describe('Only test initial value', () => {

        const flagScenarioHooks = [
          ['active=(default)', (TestState) => useStateValue(TestState)],
          ['active=true', (TestState) => useStateValue(TestState, null, true)],
          ['active=false', (TestState) => useStateValue(TestState, null, false)],
        ] as const

        for (const [flagScenario, useHook] of flagScenarioHooks) {
          test(flagScenario, () => {
            const TestState = new StateManagerType(42)
            cleanupManager.append(TestState.dispose)
            const hookInterface = new UNSAFE_HookInterface({
              cleanupManager,
              useHook: () => useHook(TestState),
              values: {
                main(state) { return state },
              },
            })
            expect(hookInterface.get('main')).toBe(42)
          })
        }

      })

      describe('Test state changes', () => {

        test('active = true -> false -> true', async () => {

          const TestState = new StateManagerType(42)
          cleanupManager.append(TestState.dispose)

          const hookInterface = new UNSAFE_HookInterface({
            cleanupManager,
            useHook: () => {
              const [active, setActiveState] = useState(true)
              const state = useStateValue(TestState, null, active)
              return { state, setActiveState }
            },
            values: {
              main({ state }) { return state },
            },
            actions: {
              async increment() {
                await TestState.set((s) => s + 1)
              },
              setActiveTrue({ setActiveState }) {
                setActiveState(true)
              },
              setActiveFalse({ setActiveState }) {
                setActiveState(false)
              },
            }
          })

          // Check initial state
          expect(hookInterface.get('main')).toBe(42)
          expect(hookInterface.renderCount).toBe(1)

          // Set active=false
          if (isAsyncStateManager) {
            await hookInterface.action('setActiveFalse')
          } else {
            hookInterface.actionSync('setActiveFalse')
          }
          expect(hookInterface.get('main')).toBe(42)
          expect(hookInterface.renderCount).toBe(2)

          // Perform state change
          if (isAsyncStateManager) {
            await hookInterface.action('increment')
          } else {
            hookInterface.actionSync('increment')
          }
          expect(hookInterface.get('main')).toBe(42)
          expect(hookInterface.renderCount).toBe(2)

          // Set active=true
          if (isAsyncStateManager) {
            await hookInterface.action('setActiveTrue')
          } else {
            hookInterface.actionSync('setActiveTrue')
          }
          expect(hookInterface.get('main')).toBe(43)
          expect(hookInterface.renderCount).toBe(3)

        })

        test('active = false -> true -> false', async () => {

          const TestState = new StateManagerType(42)
          cleanupManager.append(TestState.dispose)

          const hookInterface = new UNSAFE_HookInterface({
            cleanupManager,
            useHook: () => {
              const [active, setActiveState] = useState(false)
              const state = useStateValue(TestState, null, active)
              return { state, setActiveState }
            },
            values: {
              main({ state }) { return state },
            },
            actions: {
              async increment() {
                await TestState.set((s) => s + 1)
              },
              setActiveTrue({ setActiveState }) {
                setActiveState(true)
              },
              setActiveFalse({ setActiveState }) {
                setActiveState(false)
              },
            }
          })

          // Check initial state
          expect(hookInterface.get('main')).toBe(42)
          expect(hookInterface.renderCount).toBe(1)

          // Perform state change
          if (isAsyncStateManager) {
            await hookInterface.action('increment')
          } else {
            hookInterface.actionSync('increment')
          }
          expect(hookInterface.get('main')).toBe(42)
          expect(hookInterface.renderCount).toBe(1)

          // Set active=true
          if (isAsyncStateManager) {
            await hookInterface.action('setActiveTrue')
          } else {
            hookInterface.actionSync('setActiveTrue')
          }
          expect(hookInterface.get('main')).toBe(43)
          expect(hookInterface.renderCount).toBe(2)

          // Set active=false
          if (isAsyncStateManager) {
            await hookInterface.action('setActiveFalse')
          } else {
            hookInterface.actionSync('setActiveFalse')
          }
          expect(hookInterface.get('main')).toBe(43)
          expect(hookInterface.renderCount).toBe(3)

          // Perform state change again
          if (isAsyncStateManager) {
            await hookInterface.action('increment')
          } else {
            hookInterface.actionSync('increment')
          }
          expect(hookInterface.get('main')).toBe(43)
          expect(hookInterface.renderCount).toBe(3)

        })

      })

    })

  }

})
