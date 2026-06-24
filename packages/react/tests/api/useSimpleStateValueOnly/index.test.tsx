import { SimpleStateManager } from 'cotton-box'
import { useSimpleStateValueOnly } from 'cotton-box-react'
import { act, customRenderHook, CustomRenderHookResult } from 'custom-react-hook-tester'
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { IUserState } from '../../test-helpers'

let TestState: SimpleStateManager<IUserState>
afterEach(() => { TestState?.dispose() })

let hook: CustomRenderHookResult<unknown, IUserState>
afterEach(() => { hook?.unmount() })

const defaultState: IUserState = Object.freeze({
  firstName: 'John',
  lastName: 'Smith',
  luckyNumber: 42,
})

test('Client-side', () => {

  TestState = new SimpleStateManager(defaultState)

  hook = customRenderHook(() => useSimpleStateValueOnly(TestState))
  const { result, meta } = hook

  // Check initial state
  expect(result.current).toShareObjectReferenceWith(defaultState)
  expect(result.current).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(meta.renderCount).toBe(1)

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
  expect(meta.renderCount).toBe(1)

  // Set value again and expect no re-renders
  act(() => { TestState.set((s) => s) })
  expect(result.current).toStrictEqual({
    firstName: 'Jane',
    lastName: 'Clover',
    luckyNumber: 101,
  })
  expect(meta.renderCount).toBe(2)

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
  expect(meta.renderCount).toBe(3)

  // Reset
  act(() => { TestState.reset() })
  expect(result.current).toStrictEqual({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
  expect(meta.renderCount).toBe(4)

})

test('Server-side', () => {

  TestState = new SimpleStateManager(defaultState)

  function TestComponent(): ReactNode {
    const value = useSimpleStateValueOnly(TestState)
    return <span>Hello, {value.firstName} {value.lastName}!</span>
  }

  const output = renderToStaticMarkup(<TestComponent />)
  expect(output).toBe('<span>Hello, John Smith!</span>')

})
