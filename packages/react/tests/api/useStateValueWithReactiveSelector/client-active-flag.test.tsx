import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { HookTester } from '@glyph-cat/react-test-utils'
import { useState } from 'react'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager, StateManager, AsyncStateManager },
  ReactLib: { useStateValueWithReactiveSelector },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

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
          ['active=(default)', (TestState) => useStateValueWithReactiveSelector(TestState, s => s.toString())],
          ['active=true', (TestState) => useStateValueWithReactiveSelector(TestState, s => s.toString(), true)],
          ['active=false', (TestState) => useStateValueWithReactiveSelector(TestState, s => s.toString(), false)],
        ] as const

        for (const [flagScenario, useHook] of flagScenarioHooks) {
          test(flagScenario, () => {
            const TestState = new StateManagerType(42)
            cleanupManager.append(TestState.dispose)
            const hookInterface = new HookTester({
              useHook: () => useHook(TestState),
              values: {
                main(state) { return state },
              },
            }, cleanupManager)
            expect(hookInterface.get('main')).toBe('42')
          })
        }

      })

      describe('Test state changes', () => {

        test('active = true -> false -> true', async () => {

          const TestState = new StateManagerType(42)
          cleanupManager.append(TestState.dispose)

          const hookInterface = new HookTester({
            useHook: () => {
              const [active, setActiveState] = useState(true)
              const state = useStateValueWithReactiveSelector(TestState, s => s.toString(), active)
              return { state, setActiveState }
            },
            values: {
              main({ state }) { return state },
            },
            actions: {
              increment() {
                TestState.set((s) => s + 1)
              },
              setActiveTrue({ setActiveState }) {
                setActiveState(true)
              },
              setActiveFalse({ setActiveState }) {
                setActiveState(false)
              },
            }
          }, cleanupManager)

          // Check initial state
          expect(hookInterface.get('main')).toBe('42')
          expect(hookInterface.renderCount).toBe(1)

          // Set active=false
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('setActiveFalse')
          } else {
            hookInterface.action('setActiveFalse')
          }
          expect(hookInterface.get('main')).toBe('42')
          expect(hookInterface.renderCount).toBe(2)

          // Perform state change
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('increment')
          } else {
            hookInterface.action('increment')
          }
          expect(hookInterface.get('main')).toBe('42')
          expect(hookInterface.renderCount).toBe(2)

          // Set active=true
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('setActiveTrue')
          } else {
            hookInterface.action('setActiveTrue')
          }
          expect(hookInterface.get('main')).toBe('43')
          expect(hookInterface.renderCount).toBe(3)

        })

        test('active = false -> true -> false', async () => {

          const TestState = new StateManagerType(42)
          cleanupManager.append(TestState.dispose)

          const hookInterface = new HookTester({
            useHook: () => {
              const [active, setActiveState] = useState(false)
              const state = useStateValueWithReactiveSelector(TestState, s => s.toString(), active)
              return { state, setActiveState }
            },
            values: {
              main({ state }) { return state },
            },
            actions: {
              increment() {
                TestState.set((s) => s + 1)
              },
              setActiveTrue({ setActiveState }) {
                setActiveState(true)
              },
              setActiveFalse({ setActiveState }) {
                setActiveState(false)
              },
            }
          }, cleanupManager)

          // Check initial state
          expect(hookInterface.get('main')).toBe('42')
          expect(hookInterface.renderCount).toBe(1)

          // Perform state change
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('increment')
          } else {
            hookInterface.action('increment')
          }
          expect(hookInterface.get('main')).toBe('42')
          expect(hookInterface.renderCount).toBe(1)

          // Set active=true
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('setActiveTrue')
          } else {
            hookInterface.action('setActiveTrue')
          }
          expect(hookInterface.get('main')).toBe('43')
          expect(hookInterface.renderCount).toBe(2)

          // Set active=false
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('setActiveFalse')
          } else {
            hookInterface.action('setActiveFalse')
          }
          expect(hookInterface.get('main')).toBe('43')
          expect(hookInterface.renderCount).toBe(3)

          // Perform state change again
          if (isAsyncStateManager) {
            await hookInterface.actionAsync('increment')
          } else {
            hookInterface.action('increment')
          }
          expect(hookInterface.get('main')).toBe('43')
          expect(hookInterface.renderCount).toBe(3)

        })

      })

    })

  }

})

