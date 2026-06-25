import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { act, customRenderHook, CustomRenderHookResult } from 'custom-react-hook-tester'

let TestState: SimpleStateManager<number>
beforeEach(() => { TestState = new SimpleStateManager(42) })
afterEach(() => { TestState?.dispose() })

type HookProps = { active: boolean }
let hook: CustomRenderHookResult<number, HookProps>
afterEach(() => { hook?.unmount() })

describe('Only test initial value', () => {

  test('active=(default)', () => {
    hook = customRenderHook(() => useSimpleStateValue(TestState))
    expect(hook.result.current).toBe(42)
  })

  test('active=true', () => {
    hook = customRenderHook(() => useSimpleStateValue(TestState, null, true))
    expect(hook.result.current).toBe(42)
  })

  test('active=false', () => {
    hook = customRenderHook(() => useSimpleStateValue(TestState, null, false))
    expect(hook.result.current).toBe(42)
  })

})

describe('Test state changes', () => {

  test('active = true -> false -> true', () => {

    hook = customRenderHook(({ active }) => useSimpleStateValue(TestState, null, active), {
      initialProps: {
        active: true as boolean,
      },
    })
    const { rerender, result, getMetadata } = hook

    // Check initial state
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(1)

    // Set active=false
    rerender({ active: false })
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(2)

    // Perform state change
    act(() => { TestState.set((s) => s + 1) })
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(2)

    // Set active=true
    rerender({ active: true })
    expect(result.current).toBe(43)
    expect(getMetadata().renderCount).toBe(3)

  })

  test('active = false -> true -> false', () => {

    hook = customRenderHook(({ active }) => useSimpleStateValue(TestState, null, active), {
      initialProps: {
        active: false as boolean,
      },
    })
    const { rerender, result, getMetadata } = hook

    // Check initial state
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(1)

    // Perform state change
    act(() => { TestState.set((s) => s + 1) })
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(1)

    // Set active=true
    rerender({ active: true })
    expect(result.current).toBe(43)
    expect(getMetadata().renderCount).toBe(2)

    // Set active=false
    rerender({ active: false })
    expect(result.current).toBe(43)
    expect(getMetadata().renderCount).toBe(3)

    // Perform state change again
    act(() => { TestState.set((s) => s + 1) })
    expect(result.current).toBe(43)
    expect(getMetadata().renderCount).toBe(3)

  })

})
