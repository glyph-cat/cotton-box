import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { act, customRenderHook } from 'custom-react-hook-tester'

const stateManagersToTestWith = {
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
} as const

type HookProps = { active: boolean }

let teardownFunctions: Array<Fn>
const collectForTeardown = (fn: Fn) => teardownFunctions.push(fn)
beforeEach(() => { teardownFunctions = [] })
afterEach(() => { teardownFunctions = null! })

for (const StateManagerTypeKey in stateManagersToTestWith) {

  const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]
  const isAsyncStateManager = StateManagerTypeKey === 'AsyncStateManager'

  describe(StateManagerTypeKey, () => {

    describe('Only test initial value', () => {

      test('active=(default)', () => {
        const TestState = new StateManagerType(42)
        collectForTeardown(TestState.dispose)
        const hook = customRenderHook(() => useStateValue(TestState, (s) => s.toString()))
        const { result } = hook
        collectForTeardown(hook.unmount)
        expect(result.current).toBe(42)
      })

      test('active=true', () => {
        const TestState = new StateManagerType(42)
        collectForTeardown(TestState.dispose)
        const hook = customRenderHook(() => useStateValue(TestState, (s) => s.toString(), true))
        const { result } = hook
        collectForTeardown(hook.unmount)
        expect(result.current).toBe(42)
      })

      test('active=false', () => {
        const TestState = new StateManagerType(42)
        collectForTeardown(TestState.dispose)
        const hook = customRenderHook(() => useStateValue(TestState, (s) => s.toString(), false))
        const { result } = hook
        collectForTeardown(hook.unmount)
        expect(result.current).toBe(42)
      })

    })

    describe('Test state changes', () => {

      test('active = true -> false -> true', async () => {

        const TestState = new StateManagerType(42)
        collectForTeardown(TestState.dispose)

        const hook = customRenderHook<HookProps, string>(({ active }) => {
          return useStateValue(TestState, (s) => s.toString(), active)
        }, {
          initialProps: {
            active: true,
          },
        })
        const { rerender, result, meta } = hook
        collectForTeardown(hook.unmount)

        // Check initial state
        expect(result.current).toBe('42')
        expect(meta.renderCount).toBe(1)

        // Set active=false
        rerender({ active: false })
        expect(result.current).toBe('42')
        expect(meta.renderCount).toBe(2)

        // Perform state change
        await act(async () => { await TestState.set((s) => s + 1) })
        expect(result.current).toBe('42')
        expect(meta.renderCount).toBe(2)

        // Set active=true
        rerender({ active: true })
        expect(result.current).toBe('43')
        expect(meta.renderCount).toBe(3)

      })

      test('active = false -> true -> false', async () => {

        const TestState = new StateManagerType(42)
        collectForTeardown(TestState.dispose)

        const hook = customRenderHook<HookProps, string>(({ active }) => {
          return useStateValue(TestState, (s) => s.toString(), active)
        }, {
          initialProps: {
            active: false,
          },
        })
        const { rerender, result, meta } = hook
        collectForTeardown(hook.unmount)

        // Check initial state
        expect(result.current).toBe('42')
        expect(meta.renderCount).toBe(1)

        // Perform state change
        await act(async () => { await TestState.set((s) => s + 1) })
        expect(result.current).toBe('42')
        expect(meta.renderCount).toBe(1)

        // Set active=true
        rerender({ active: true })
        expect(result.current).toBe('43')
        expect(meta.renderCount).toBe(2)

        // Set active=false
        rerender({ active: false })
        expect(result.current).toBe('43')
        expect(meta.renderCount).toBe(3)

        // Perform state change again
        await act(async () => { await TestState.set((s) => s + 1) })
        expect(result.current).toBe('43')
        expect(meta.renderCount).toBe(3)

      })

    })

  })

}
