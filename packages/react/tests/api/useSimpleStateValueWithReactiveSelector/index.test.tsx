import { useCallback, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CleanupManager, HookInterface, IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager },
  ReactLib: { useSimpleStateValueWithReactiveSelector },
}: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  describe('Ordinary tests', () => {

    test('Client-side', () => {

      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const TestState = new SimpleStateManager(defaultState)
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookInterface({
        cleanupManager: cleanupManager,
        useHook: () => useSimpleStateValueWithReactiveSelector(TestState, (s) => s.luckyNumber),
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
          setFirstName() {
            TestState.set((s) => ({
              ...s,
              firstName: 'David',
            }))
          },
          reset: TestState.reset,
        },
      })

      // Check initial state
      expect(hookInterface.get('main')).toBe(42)
      expect(hookInterface.renderCount).toBe(1)

      // Set value normally
      hookInterface.actionSync('setValue')
      expect(hookInterface.get('main')).toBe(101)
      expect(hookInterface.renderCount).toBe(2)

      // Set value again and expect no re-renders
      hookInterface.actionSync('setSameValue')
      expect(hookInterface.get('main')).toBe(101)
      expect(hookInterface.renderCount).toBe(2)

      // Set value by function
      hookInterface.actionSync('setValueByFunction')
      expect(hookInterface.get('main')).toBe(102)
      expect(hookInterface.renderCount).toBe(3)

      // Set value for property not included by selector and expect no re-renders
      hookInterface.actionSync('setFirstName')
      expect(hookInterface.get('main')).toBe(102)
      expect(hookInterface.renderCount).toBe(3)

      // Reset
      hookInterface.actionSync('reset')
      expect(hookInterface.get('main')).toBe(42)
      expect(hookInterface.renderCount).toBe(4)

    })

    test('Server-side', () => {
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const TestState = new SimpleStateManager(defaultState)
      cleanupManager.append(TestState.dispose)
      function TestComponent(): JSX.Element {
        const firstName = useSimpleStateValueWithReactiveSelector(TestState, (s) => s.firstName)
        return <span>Hello, {firstName}!</span>
      }
      const output = renderToStaticMarkup(<TestComponent />)
      expect(output).toBe('<span>Hello, John!</span>')
    })

  })

  test('Change selector and expect a different returned value', () => {

    const defaultState: IUserState = {
      firstName: 'John',
      lastName: 'Smith',
      luckyNumber: 42,
    }
    const TestState = new SimpleStateManager(defaultState)
    cleanupManager.append(TestState.dispose)

    const hookInterface = new HookInterface({
      cleanupManager: cleanupManager,
      useHook: () => {
        const [key, setKey] = useState<keyof IUserState>('luckyNumber')
        const state = useSimpleStateValueWithReactiveSelector(
          TestState,
          useCallback((s: IUserState) => { return s[key] }, [key])
        )
        return { setKey, state }
      },
      values: {
        main({ state }) { return state },
      },
      actions: {
        selectFirstName({ setKey }) {
          setKey('firstName')
        },
        selectLastName({ setKey }) {
          setKey('lastName')
        },
        reset: TestState.reset,
      },
    })

    // Check initial state
    expect(hookInterface.get('main')).toBe(42)
    expect(hookInterface.renderCount).toBe(1)

    // Set value normally
    hookInterface.actionSync('selectFirstName')
    expect(hookInterface.get('main')).toBe('John')
    expect(hookInterface.renderCount).toBe(2)

    // Set value again and expect no re-renders
    hookInterface.actionSync('selectLastName')
    expect(hookInterface.get('main')).toBe('Smith')
    expect(hookInterface.renderCount).toBe(3)

  })

})
