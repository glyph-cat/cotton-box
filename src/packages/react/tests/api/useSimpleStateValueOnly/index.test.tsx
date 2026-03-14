import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { HookTester } from '@glyph-cat/react-test-utils'
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { $0 } from '../../../src/abstractions'
import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager },
  ReactLib: { useSimpleStateValueOnly, hasState, NO_STATE },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  let TestState: $0<IUserState>
  afterEach(() => { TestState?.dispose() })
  const defaultState: IUserState = Object.freeze({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })

  describe('null', () => {

    test('Client-side', () => {
      const hookTester = new HookTester({
        useHook: () => useSimpleStateValueOnly(null),
        values: {
          main(state) { console.log('state', state); return state },
        },
      }, cleanupManager)
      expect(hookTester.get('main')).toBe(NO_STATE)
    })

    test('Server-side', () => {
      function TestComponent(): ReactNode {
        const state = useSimpleStateValueOnly(null)
        return String(hasState(state))
      }
      renderToStaticMarkup(<TestComponent />)
      const output = renderToStaticMarkup(<TestComponent />)
      expect(output).toBe('false')
    })

  })

  describe('undefined', () => {

    test('Client-side', () => {
      const hookTester = new HookTester({
        useHook: () => useSimpleStateValueOnly(undefined),
        values: {
          main(state) { return state },
        },
      }, cleanupManager)
      expect(hookTester.get('main')).toBe(NO_STATE)
    })

    test('Server-side', () => {
      function TestComponent(): ReactNode {
        const state = useSimpleStateValueOnly(undefined)
        return String(hasState(state))
      }
      renderToStaticMarkup(<TestComponent />)
      const output = renderToStaticMarkup(<TestComponent />)
      expect(output).toBe('false')
    })

  })

  describe('Happy Path', () => {

    test('Client-side', () => {

      TestState = new SimpleStateManager(defaultState)

      const hookTester = new HookTester({
        useHook: () => useSimpleStateValueOnly(TestState),
        values: {
          main(state) { return state },
        },
        actions: {
          setValue() {
            TestState.set({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
          },
          setValueByFunction() {
            TestState.set((s) => ({
              ...s,
              luckyNumber: s.luckyNumber + 1,
            }))
          },
          setSameValue() {
            TestState.set((s) => s)
          },
          reset: TestState.reset,
        },
      }, cleanupManager)

      // Check initial state
      expect(Object.is(hookTester.get('main'), defaultState)).toBe(true)
      expect(hookTester.get('main')).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(hookTester.renderCount).toBe(1)

      // Set value normally
      hookTester.action('setValue')
      expect(hookTester.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
      expect(hookTester.renderCount).toBe(2)

      // Set value again and expect no re-renders
      hookTester.action('setSameValue')
      expect(hookTester.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
      expect(hookTester.renderCount).toBe(2)

      // Set value by function
      hookTester.action('setValueByFunction')
      expect(hookTester.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 102,
      })
      expect(hookTester.renderCount).toBe(3)

      // Reset
      hookTester.action('reset')
      expect(hookTester.get('main')).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(hookTester.renderCount).toBe(4)

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

  })

})
