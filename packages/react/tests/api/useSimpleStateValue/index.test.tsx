import { SimpleStateManager as $0 } from 'cotton-box'
import { JSX } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CleanupManager, HookTester, IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { SimpleStateManager },
  ReactLib: { useSimpleStateValue },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.performCleanup() })

  describe('Without selector', () => {

    test('Client-side', () => {

      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const TestState = new SimpleStateManager(defaultState)
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookTester({
        cleanupManager,
        useHook: () => useSimpleStateValue(TestState),
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
      })

      // Check initial state
      expect(Object.is(hookInterface.get('main'), defaultState)).toBe(true)
      expect(hookInterface.get('main')).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(hookInterface.renderCount).toBe(1)

      // Set value normally
      hookInterface.actionSync('setValue')
      expect(hookInterface.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
      expect(hookInterface.renderCount).toBe(2)

      // Set value again and expect no re-renders
      hookInterface.actionSync('setSameValue')
      expect(hookInterface.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 101,
      })
      expect(hookInterface.renderCount).toBe(2)

      // Set value by function
      hookInterface.actionSync('setValueByFunction')
      expect(hookInterface.get('main')).toStrictEqual({
        firstName: 'Jane',
        lastName: 'Clover',
        luckyNumber: 102,
      })
      expect(hookInterface.renderCount).toBe(3)

      // Reset
      hookInterface.actionSync('reset')
      expect(hookInterface.get('main')).toStrictEqual({
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      })
      expect(hookInterface.renderCount).toBe(4)

    })

    describe('Server-side', () => {

      let TestState: $0<IUserState>
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }

      const flagScenarios = [
        ['active=(default)', (): JSX.Element => {
          const value = useSimpleStateValue(TestState)
          return <span>Hello, {value.firstName} {value.lastName}!</span>
        }],
        ['active=true', (): JSX.Element => {
          const value = useSimpleStateValue(TestState, null, true)
          return <span>Hello, {value.firstName} {value.lastName}!</span>
        }],
        ['active=false', (): JSX.Element => {
          const value = useSimpleStateValue(TestState, null, false)
          return <span>Hello, {value.firstName} {value.lastName}!</span>
        }],
      ] as const

      for (const [flagScenario, TestComponent] of flagScenarios) {
        test(flagScenario, () => {
          TestState = new SimpleStateManager(defaultState)
          cleanupManager.append(TestState.dispose)
          const output = renderToStaticMarkup(<TestComponent />)
          expect(output).toBe('<span>Hello, John Smith!</span>')
        })
      }

    })

  })

  describe('With selector', () => {

    test('Client-side', () => {

      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }
      const TestState = new SimpleStateManager(defaultState)
      cleanupManager.append(TestState.dispose)

      const hookInterface = new HookTester({
        cleanupManager: cleanupManager,
        useHook: () => useSimpleStateValue(TestState, (s) => s.luckyNumber),
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

    describe('Server-side', () => {

      let TestState: $0<IUserState>
      const defaultState: IUserState = {
        firstName: 'John',
        lastName: 'Smith',
        luckyNumber: 42,
      }

      const flagScenarios = [
        ['active=(default)', (): JSX.Element => {
          const firstName = useSimpleStateValue(TestState, (s) => s.firstName)
          return <span>Hello, {firstName}!</span>
        }],
        ['active=true', (): JSX.Element => {
          const firstName = useSimpleStateValue(TestState, (s) => s.firstName, true)
          return <span>Hello, {firstName}!</span>
        }],
        ['active=false', (): JSX.Element => {
          const firstName = useSimpleStateValue(TestState, (s) => s.firstName, false)
          return <span>Hello, {firstName}!</span>
        }],
      ] as const

      for (const [flagScenario, TestComponent] of flagScenarios) {
        test(flagScenario, () => {
          TestState = new SimpleStateManager(defaultState)
          cleanupManager.append(TestState.dispose)
          const output = renderToStaticMarkup(<TestComponent />)
          expect(output).toBe('<span>Hello, John!</span>')
        })
      }

    })

  })

})
