import { useState } from 'react'
import { CleanupManager, HookTester } from '../../../test-helpers'
import { TestConfig, wrapper } from '../../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager },
  ReactLib: { useSimpleStateValue },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  describe('Only test initial value', () => {

    const flagScenarioHooks = [
      ['active=(default)', (TestState) => useSimpleStateValue(TestState, s => s.toString())],
      ['active=true', (TestState) => useSimpleStateValue(TestState, s => s.toString(), true)],
      ['active=false', (TestState) => useSimpleStateValue(TestState, s => s.toString(), false)],
    ] as const

    for (const [flagScenario, useHook] of flagScenarioHooks) {
      test(flagScenario, () => {
        const TestState = new SimpleStateManager(42)
        cleanupManager.append(TestState.dispose)
        const hookInterface = new HookTester({
          cleanupManager,
          useHook: () => useHook(TestState),
          values: {
            main(state) { return state },
          },
        })
        expect(hookInterface.get('main')).toBe('42')
      })
    }

  })

  describe('Test state changes', () => {

    test('active = true -> false -> true', () => {

      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookTester({
        cleanupManager,
        useHook: () => {
          const [active, setActiveState] = useState(true)
          const state = useSimpleStateValue(TestState, s => s.toString(), active)
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
      })

      // Check initial state
      expect(hookInterface.get('main')).toBe('42')
      expect(hookInterface.renderCount).toBe(1)

      // Set active=false
      hookInterface.actionSync('setActiveFalse')
      expect(hookInterface.get('main')).toBe('42')
      expect(hookInterface.renderCount).toBe(2)

      // Perform state change
      hookInterface.actionSync('increment')
      expect(hookInterface.get('main')).toBe('42')
      expect(hookInterface.renderCount).toBe(2)

      // Set active=true
      hookInterface.actionSync('setActiveTrue')
      expect(hookInterface.get('main')).toBe('43')
      expect(hookInterface.renderCount).toBe(3)

    })

    test('active = false -> true -> false', () => {

      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookTester({
        cleanupManager,
        useHook: () => {
          const [active, setActiveState] = useState(false)
          const state = useSimpleStateValue(TestState, s => s.toString(), active)
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
      })

      // Check initial state
      expect(hookInterface.get('main')).toBe('42')
      expect(hookInterface.renderCount).toBe(1)

      // Perform state change
      hookInterface.actionSync('increment')
      expect(hookInterface.get('main')).toBe('42')
      expect(hookInterface.renderCount).toBe(1)

      // Set active=true
      hookInterface.actionSync('setActiveTrue')
      expect(hookInterface.get('main')).toBe('43')
      expect(hookInterface.renderCount).toBe(2)

      // Set active=false
      hookInterface.actionSync('setActiveFalse')
      expect(hookInterface.get('main')).toBe('43')
      expect(hookInterface.renderCount).toBe(3)

      // Perform state change again
      hookInterface.actionSync('increment')
      expect(hookInterface.get('main')).toBe('43')
      expect(hookInterface.renderCount).toBe(3)

    })

  })

})
