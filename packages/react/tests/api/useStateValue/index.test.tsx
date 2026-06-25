import { objectIsShallowEqual } from '@glyph-cat/equality'
import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { act, customRenderHook } from 'custom-react-hook-tester'
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createDefaultUserState, IUserState } from '../../test-helpers'

const stateManagersToTestWith = {
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
} as const

let defaultState: IUserState = null!
beforeEach(() => { defaultState = createDefaultUserState() })
afterEach(() => { defaultState = null! })

let teardownFunctions: Array<Fn>
const collectForTeardown = (fn: Fn) => teardownFunctions.push(fn)
beforeEach(() => { teardownFunctions = [] })
afterEach(() => { teardownFunctions = null! })

for (const StateManagerTypeKey in stateManagersToTestWith) {

  const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]

  describe(StateManagerTypeKey, () => {

    describe('Without selector', () => {

      describe('Client-side', () => {

        test('Without equalityFn', async () => {

          const TestState = new StateManagerType(defaultState)
          collectForTeardown(TestState.dispose)

          const hook = customRenderHook(() => useStateValue(TestState))
          const { result, meta } = hook
          collectForTeardown(hook.unmount)

          // Check initial state
          expect(result.current).toShareObjectReferenceWith(defaultState)
          expect(result.current).toStrictEqual({
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          })
          expect(meta.renderCount).toBe(1)

          // Set value normally
          await act(async () => {
            await TestState.set({
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
          expect(meta.renderCount).toBe(2)

          // Set value again and expect no re-renders
          await act(async () => { await TestState.set((s) => s) })
          expect(result.current).toStrictEqual({
            firstName: 'Jane',
            lastName: 'Clover',
            luckyNumber: 101,
          })
          expect(meta.renderCount).toBe(2)

          // Set value by function
          await act(async () => {
            await TestState.set((s) => ({
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
          await act(async () => { await TestState.reset() })
          expect(result.current).toStrictEqual({
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          })
          expect(meta.renderCount).toBe(4)

        })

        test('With equalityFn', async () => {

          const TestState = new StateManagerType(defaultState)
          collectForTeardown(TestState.dispose)

          const hook = customRenderHook(() => useStateValue(TestState, null, objectIsShallowEqual))
          const { result, meta } = hook
          collectForTeardown(hook.unmount)

          // Check initial state
          expect(result.current).toShareObjectReferenceWith(defaultState)
          expect(result.current).toStrictEqual({
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          })
          expect(meta.renderCount).toBe(1)

          // Set value normally
          await act(async () => {
            await TestState.set({
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
          expect(meta.renderCount).toBe(2)

          // Set value again and expect no re-renders
          await act(async () => { await TestState.set((s) => s) })
          expect(result.current).toStrictEqual({
            firstName: 'Jane',
            lastName: 'Clover',
            luckyNumber: 101,
          })
          expect(meta.renderCount).toBe(2)

          // Set value by function
          await act(async () => {
            await TestState.set((s) => ({
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
          await act(async () => { await TestState.reset() })
          expect(result.current).toStrictEqual({
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          })
          expect(meta.renderCount).toBe(4)

        })

      })

      test('Server-side', () => {
        const TestState = new StateManagerType(defaultState)
        function TestComponent(): ReactNode {
          const value = useStateValue(TestState)
          return <span>Hello, {value.firstName} {value.lastName}!</span>
        }
        const output = renderToStaticMarkup(<TestComponent />)
        expect(output).toBe('<span>Hello, John Smith!</span>')
      })

    })

    describe('With selector', () => {

      describe('Client-side', () => {

        test('Without equalityFn', async () => {

          const TestState = new StateManagerType(defaultState)
          collectForTeardown(TestState.dispose)

          const hook = customRenderHook(() => useStateValue(TestState, (s) => s.luckyNumber))
          const { result, meta } = hook
          collectForTeardown(hook.unmount)

          // Check initial state
          expect(result.current).toBe(42)
          expect(meta.renderCount).toBe(1)

          // Set value normally
          await act(async () => {
            await TestState.set({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
          })
          expect(result.current).toBe(101)
          expect(meta.renderCount).toBe(2)

          // Set value again and expect no re-renders
          await act(async () => { await TestState.set((s) => s) })
          expect(result.current).toBe(101)
          expect(meta.renderCount).toBe(2)

          // Set value by function
          await act(async () => {
            await TestState.set((s) => ({
              ...s,
              luckyNumber: s.luckyNumber + 1,
            }))
          })
          expect(result.current).toBe(102)
          expect(meta.renderCount).toBe(3)

          // Set value for property not included by selector and expect no re-renders
          await act(async () => {
            await TestState.set((s) => ({
              ...s,
              firstName: 'David',
            }))
          })
          expect(result.current).toBe(102)
          expect(meta.renderCount).toBe(3)

          // Reset
          await act(async () => { await TestState.reset() })
          expect(result.current).toBe(42)
          expect(meta.renderCount).toBe(4)

        })

        test('With equalityFn', async () => {

          const TestState = new StateManagerType(defaultState)
          collectForTeardown(TestState.dispose)

          const hook = customRenderHook(() => useStateValue(
            TestState,
            (s) => s.luckyNumber,
            objectIsShallowEqual,
          ))
          const { result, meta } = hook
          collectForTeardown(hook.unmount)

          // Check initial state
          expect(result.current).toBe(42)
          expect(meta.renderCount).toBe(1)

          // Set value normally
          await act(async () => {
            await TestState.set({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
          })
          expect(result.current).toBe(101)
          expect(meta.renderCount).toBe(2)

          // Set value again and expect no re-renders
          await act(async () => { await TestState.set((s) => s) })
          expect(result.current).toBe(101)
          expect(meta.renderCount).toBe(2)

          // Set value by function
          await act(async () => {
            await TestState.set((s) => ({
              ...s,
              luckyNumber: s.luckyNumber + 1,
            }))
          })
          expect(result.current).toBe(102)
          expect(meta.renderCount).toBe(3)

          // Set value for property not included by selector and expect no re-renders
          await act(async () => {
            await TestState.set((s) => ({
              ...s,
              firstName: 'David',
            }))
          })
          expect(result.current).toBe(102)
          expect(meta.renderCount).toBe(3)

          // Reset
          await act(async () => { await TestState.reset() })
          expect(result.current).toBe(42)
          expect(meta.renderCount).toBe(4)

        })

      })

      test('Server-side', () => {
        const TestState = new StateManagerType(defaultState)
        function TestComponent(): ReactNode {
          const firstName = useStateValue(TestState, (s) => s.firstName)
          return <span>Hello, {firstName}!</span>
        }
        const output = renderToStaticMarkup(<TestComponent />)
        expect(output).toBe('<span>Hello, John!</span>')
      })

    })

    describe('Miscellaneous', () => {

      const objectIs = Object.is
      beforeEach(() => { Object.is = jest.fn(Object.is) })
      afterEach(() => { Object.is = objectIs })

      test('Equality should fallback to `Object.is` if is falsy value', async () => {

        const TestState = new StateManagerType(defaultState)

        const hook = customRenderHook(() => useStateValue(TestState, null, null))
        const { meta } = hook
        collectForTeardown(hook.unmount)

        await act(async () => { await TestState.set(defaultState) })
        expect(meta.renderCount).toBe(1)
        expect(Object.is).toHaveBeenCalledWith(defaultState, defaultState)

      })

    })

  })

}
