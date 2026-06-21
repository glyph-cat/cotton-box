import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { HookTester } from '@glyph-cat/react-test-utils'
import { useState } from 'react'
import { TestConfig, wrapper } from '../../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager },
  ReactLib: { useSimpleStateValue },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  describe('Only test initial value', () => {

    const flagScenarioHooks = [
      [
        'active=(default)',
        (TestState: any) => useSimpleStateValue(TestState, (s: number) => s.toString()),
      ],
      [
        'active=true',
        (TestState: any) => useSimpleStateValue(TestState, (s: number) => s.toString(), true),
      ],
      [
        'active=false',
        (TestState: any) => useSimpleStateValue(TestState, (s: number) => s.toString(), false),
      ],
    ] as const

    for (const [flagScenario, useHook] of flagScenarioHooks) {
      test(flagScenario, () => {
        const TestState = new SimpleStateManager(42)
        cleanupManager.append(TestState.dispose)
        const hookTester = new HookTester({
          useHook: () => useHook(TestState),
          values: {
            main(state) { return state },
          },
        }, cleanupManager)
        expect(hookTester.get('main')).toBe('42')
      })
    }

  })

  describe('Test state changes', () => {

    test('active = true -> false -> true', () => {

      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)

      const hookTester = new HookTester({
        useHook: () => {
          const [active, setActiveState] = useState(true)
          const state = useSimpleStateValue(TestState, (s) => s.toString(), active)
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
      expect(hookTester.get('main')).toBe('42')
      expect(hookTester.renderCount).toBe(1)

      // Set active=false
      hookTester.action('setActiveFalse')
      expect(hookTester.get('main')).toBe('42')
      expect(hookTester.renderCount).toBe(2)

      // Perform state change
      hookTester.action('increment')
      expect(hookTester.get('main')).toBe('42')
      expect(hookTester.renderCount).toBe(2)

      // Set active=true
      hookTester.action('setActiveTrue')
      expect(hookTester.get('main')).toBe('43')
      expect(hookTester.renderCount).toBe(3)

    })

    test('active = false -> true -> false', () => {

      const TestState = new SimpleStateManager(42)
      cleanupManager.append(TestState.dispose)

      const hookTester = new HookTester({
        useHook: () => {
          const [active, setActiveState] = useState(false)
          const state = useSimpleStateValue(TestState, (s) => s.toString(), active)
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
      expect(hookTester.get('main')).toBe('42')
      expect(hookTester.renderCount).toBe(1)

      // Perform state change
      hookTester.action('increment')
      expect(hookTester.get('main')).toBe('42')
      expect(hookTester.renderCount).toBe(1)

      // Set active=true
      hookTester.action('setActiveTrue')
      expect(hookTester.get('main')).toBe('43')
      expect(hookTester.renderCount).toBe(2)

      // Set active=false
      hookTester.action('setActiveFalse')
      expect(hookTester.get('main')).toBe('43')
      expect(hookTester.renderCount).toBe(3)

      // Perform state change again
      hookTester.action('increment')
      expect(hookTester.get('main')).toBe('43')
      expect(hookTester.renderCount).toBe(3)

    })

  })

})
