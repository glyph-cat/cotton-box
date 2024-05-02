import { useCallback, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CleanupManager, HookInterface, IUserState, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { AsyncStateManager, SimpleStateManager, StateManager, Equality },
  ReactLib: { useStateValueWithReactiveSelector },
}: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  const stateManagersToTestWith = {
    SimpleStateManager,
    StateManager,
    AsyncStateManager,
  } as const

  type StateManagerType = typeof SimpleStateManager<IUserState> | typeof StateManager<IUserState> | typeof AsyncStateManager<IUserState>

  for (const StateManagerTypeKey in stateManagersToTestWith) {

    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey] as StateManagerType
    const isAsyncStateManager = StateManagerTypeKey === 'AsyncStateManager'

    describe(StateManagerTypeKey, () => {

      describe('Ordinary tests', () => {

        describe('Client-side', () => {

          const testSelector = (s: IUserState) => s.luckyNumber

          test('Without equalityFn', async () => {

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookInterface = new HookInterface({
              cleanupManager: cleanupManager,
              useHook: () => useStateValueWithReactiveSelector(TestState, testSelector),
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
            if (isAsyncStateManager) {
              await hookInterface.action('setValue')
            } else {
              hookInterface.actionSync('setValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.action('setSameValue')
            } else {
              hookInterface.actionSync('setSameValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.action('setValueByFunction')
            } else {
              hookInterface.actionSync('setValueByFunction')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.action('setFirstName')
            } else {
              hookInterface.actionSync('setFirstName')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.action('reset')
            } else {
              hookInterface.actionSync('reset')
            }
            expect(hookInterface.get('main')).toBe(42)
            expect(hookInterface.renderCount).toBe(4)

          })

          test('With equalityFn', async () => {

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookInterface = new HookInterface({
              cleanupManager: cleanupManager,
              useHook: () => useStateValueWithReactiveSelector(
                TestState,
                testSelector,
                Equality.shallowCompareObject,
              ),
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
            if (isAsyncStateManager) {
              await hookInterface.action('setValue')
            } else {
              hookInterface.actionSync('setValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.action('setSameValue')
            } else {
              hookInterface.actionSync('setSameValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.action('setValueByFunction')
            } else {
              hookInterface.actionSync('setValueByFunction')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.action('setFirstName')
            } else {
              hookInterface.actionSync('setFirstName')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.action('reset')
            } else {
              hookInterface.actionSync('reset')
            }
            expect(hookInterface.get('main')).toBe(42)
            expect(hookInterface.renderCount).toBe(4)

          })

        })

        test('Server-side', () => {
          const defaultState: IUserState = {
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          }
          const TestState = new StateManagerType(defaultState)
          cleanupManager.append(TestState.dispose)
          const testSelector = (s: IUserState) => s.firstName
          function TestComponent(): JSX.Element {
            const firstName = useStateValueWithReactiveSelector(TestState, testSelector)
            return <span>Hello, {firstName}!</span>
          }
          const output = renderToStaticMarkup(<TestComponent />)
          expect(output).toBe('<span>Hello, John!</span>')
        })

      })

      test('Change selector and expect a different returned value', async () => {

        const defaultState: IUserState = {
          firstName: 'John',
          lastName: 'Smith',
          luckyNumber: 42,
        }
        const TestState = new StateManagerType(defaultState)
        cleanupManager.append(TestState.dispose)

        const hookInterface = new HookInterface({
          cleanupManager: cleanupManager,
          useHook: () => {
            const [key, setKey] = useState<keyof IUserState>('luckyNumber')
            const state = useStateValueWithReactiveSelector(
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
        if (isAsyncStateManager) {
          await hookInterface.action('selectFirstName')
        } else {
          hookInterface.actionSync('selectFirstName')
        }
        expect(hookInterface.get('main')).toBe('John')
        expect(hookInterface.renderCount).toBe(2)

        // Set value again and expect no re-renders
        if (isAsyncStateManager) {
          await hookInterface.action('selectLastName')
        } else {
          hookInterface.actionSync('selectLastName')
        }
        expect(hookInterface.get('main')).toBe('Smith')
        expect(hookInterface.renderCount).toBe(3)

      })

      describe('Miscellaneous', () => {

        const objectIs = Object.is
        beforeEach(() => { Object.is = jest.fn(Object.is) })
        afterEach(() => { Object.is = objectIs })

        test('Equality should fallback to `Object.is` if is falsy value', async () => {

          const defaultState: IUserState = {
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          }
          const TestState = new StateManagerType(defaultState)
          cleanupManager.append(TestState.dispose)

          const hookInterface = new HookInterface({
            cleanupManager,
            useHook: () => useStateValueWithReactiveSelector(TestState, TestUtils.mockSelector, null),
            values: {
              main(state) { return state },
            },
            actions: {
              setValue() {
                TestState.set(defaultState)
              },
            },
          })

          if (isAsyncStateManager) {
            await hookInterface.action('setValue')
          } else {
            hookInterface.actionSync('setValue')
          }
          expect(hookInterface.renderCount).toBe(1)
          expect(Object.is).toHaveBeenCalledWith(defaultState, defaultState)

        })

      })

    })
  }

})

