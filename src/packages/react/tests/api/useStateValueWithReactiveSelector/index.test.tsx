import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { HookTester } from '@glyph-cat/react-test-utils'
import { JSX, useCallback, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { IUserState, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { AsyncStateManager, SimpleStateManager, StateManager, Equality },
  ReactLib: { useStateValueWithReactiveSelector },
}: TestConfig) => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

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

            const hookInterface = new HookTester({
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
            }, cleanupManager)

            // Check initial state
            expect(hookInterface.get('main')).toBe(42)
            expect(hookInterface.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValue')
            } else {
              hookInterface.action('setValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setSameValue')
            } else {
              hookInterface.action('setSameValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValueByFunction')
            } else {
              hookInterface.action('setValueByFunction')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setFirstName')
            } else {
              hookInterface.action('setFirstName')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('reset')
            } else {
              hookInterface.action('reset')
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

            const hookInterface = new HookTester({
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
            }, cleanupManager)

            // Check initial state
            expect(hookInterface.get('main')).toBe(42)
            expect(hookInterface.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValue')
            } else {
              hookInterface.action('setValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setSameValue')
            } else {
              hookInterface.action('setSameValue')
            }
            expect(hookInterface.get('main')).toBe(101)
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValueByFunction')
            } else {
              hookInterface.action('setValueByFunction')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setFirstName')
            } else {
              hookInterface.action('setFirstName')
            }
            expect(hookInterface.get('main')).toBe(102)
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('reset')
            } else {
              hookInterface.action('reset')
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

        const hookInterface = new HookTester({
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
        }, cleanupManager)

        // Check initial state
        expect(hookInterface.get('main')).toBe(42)
        expect(hookInterface.renderCount).toBe(1)

        // Set value normally
        if (isAsyncStateManager) {
          await hookInterface.actionAsync('selectFirstName')
        } else {
          hookInterface.action('selectFirstName')
        }
        expect(hookInterface.get('main')).toBe('John')
        expect(hookInterface.renderCount).toBe(2)

        // Set value again and expect no re-renders
        if (isAsyncStateManager) {
          await hookInterface.actionAsync('selectLastName')
        } else {
          hookInterface.action('selectLastName')
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

          const hookInterface = new HookTester({
            useHook: () => useStateValueWithReactiveSelector(TestState, TestUtils.mockSelector, null),
            values: {
              main(state) { return state },
            },
            actions: {
              setValue() {
                TestState.set(defaultState)
              },
            },
          }, cleanupManager)

          if (isAsyncStateManager) {
            await hookInterface.actionAsync('setValue')
          } else {
            hookInterface.action('setValue')
          }
          expect(hookInterface.renderCount).toBe(1)
          expect(Object.is).toHaveBeenCalledWith(defaultState, defaultState)

        })

      })

    })
  }

})

