import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValue } from 'cotton-box-react'
import { act, customRenderHook, CustomRenderHookResult } from 'custom-react-hook-tester'
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createDefaultUserState, IUserState } from '../../test-helpers'

let TestState: SimpleStateManager<IUserState>
afterEach(() => { TestState?.dispose() })

let defaultState: IUserState = null!
beforeEach(() => { defaultState = createDefaultUserState() })
afterEach(() => { defaultState = null! })

describe('Without selector', () => {

  let hook: CustomRenderHookResult<unknown, IUserState>
  afterEach(() => { hook?.unmount() })

  test('Client-side', () => {

    TestState = new SimpleStateManager(defaultState)

    hook = customRenderHook(() => useSimpleStateValue(TestState))
    const { result, getMetadata } = hook

    // Check initial state
    expect(result.current).toShareObjectReferenceWith(defaultState)
    expect(result.current).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    })
    expect(getMetadata().renderCount).toBe(1)

    // Set value normally
    act(() => {
      TestState.set({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
    })
    expect(result.current).toStrictEqual({
      firstName: 'Jane',
      lastName: 'Clover',
      luckyNumber: 101,
    })
    expect(getMetadata().renderCount).toBe(2)

    // Set value again and expect no re-renders
    act(() => { TestState.set((s) => s) })
    expect(result.current).toStrictEqual({
      firstName: 'Jane',
      lastName: 'Clover',
      luckyNumber: 101,
    })
    expect(getMetadata().renderCount).toBe(2)

    // Set value by function
    act(() => {
      TestState.set((s) => ({
        ...s,
        luckyNumber: s.luckyNumber + 1,
      }))
    })
    expect(result.current).toStrictEqual({
      firstName: 'Jane',
      lastName: 'Clover',
      luckyNumber: 102,
    })
    expect(getMetadata().renderCount).toBe(3)

    // Reset
    act(() => { TestState.reset() })
    expect(result.current).toStrictEqual({
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    })
    expect(getMetadata().renderCount).toBe(4)

  })

  describe('Server-side', () => {

    const flagScenarios = [
      ['active=(default)', (): ReactNode => {
        const value = useSimpleStateValue(TestState)
        return <span>Hello, {value.firstName} {value.lastName}!</span>
      }],
      ['active=true', (): ReactNode => {
        const value = useSimpleStateValue(TestState, null, true)
        return <span>Hello, {value.firstName} {value.lastName}!</span>
      }],
      ['active=false', (): ReactNode => {
        const value = useSimpleStateValue(TestState, null, false)
        return <span>Hello, {value.firstName} {value.lastName}!</span>
      }],
    ] as const

    for (const [flagScenario, TestComponent] of flagScenarios) {
      test(flagScenario, () => {
        TestState = new SimpleStateManager(defaultState)
        const output = renderToStaticMarkup(<TestComponent />)
        expect(output).toBe('<span>Hello, John Smith!</span>')
      })
    }

  })

})

describe('With selector', () => {

  let hook: CustomRenderHookResult<unknown, IUserState['luckyNumber']>
  afterEach(() => { hook?.unmount() })

  test('Client-side', () => {

    TestState = new SimpleStateManager(defaultState)

    hook = customRenderHook(() => useSimpleStateValue(TestState, (s) => s.luckyNumber))
    const { result, getMetadata } = hook

    // Check initial state
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(1)

    // Set value normally
    act(() => {
      TestState.set({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
    })
    expect(result.current).toBe(101)
    expect(getMetadata().renderCount).toBe(2)

    // Set value again and expect no re-renders
    act(() => { TestState.set((s) => s) })
    expect(result.current).toBe(101)
    expect(getMetadata().renderCount).toBe(2)

    // Set value by function
    act(() => {
      TestState.set((s) => ({
        ...s,
        luckyNumber: s.luckyNumber + 1,
      }))
    })
    expect(result.current).toBe(102)
    expect(getMetadata().renderCount).toBe(3)

    // Set value for property not included by selector and expect no re-renders
    act(() => {
      TestState.set((s) => ({
        ...s,
        firstName: 'David',
      }))
    })
    expect(result.current).toBe(102)
    expect(getMetadata().renderCount).toBe(3)

    // Reset
    act(() => { TestState.reset() })
    expect(result.current).toBe(42)
    expect(getMetadata().renderCount).toBe(4)

  })

  describe('Server-side', () => {

    const flagScenarios = [
      ['active=(default)', (): ReactNode => {
        const firstName = useSimpleStateValue(TestState, (s) => s.firstName)
        return <span>Hello, {firstName}!</span>
      }],
      ['active=true', (): ReactNode => {
        const firstName = useSimpleStateValue(TestState, (s) => s.firstName, true)
        return <span>Hello, {firstName}!</span>
      }],
      ['active=false', (): ReactNode => {
        const firstName = useSimpleStateValue(TestState, (s) => s.firstName, false)
        return <span>Hello, {firstName}!</span>
      }],
    ] as const

    for (const [flagScenario, TestComponent] of flagScenarios) {
      test(flagScenario, () => {
        TestState = new SimpleStateManager(defaultState)
        const output = renderToStaticMarkup(<TestComponent />)
        expect(output).toBe('<span>Hello, John!</span>')
      })
    }

  })

})
