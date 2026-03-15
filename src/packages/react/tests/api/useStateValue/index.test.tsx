import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { objectIsShallowEqual } from '@glyph-cat/equality'
import { HookTester } from '@glyph-cat/react-test-utils'
import { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { IUserState } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { AsyncStateManager, SimpleStateManager, StateManager },
  ReactLib: { useStateValue },
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

      describe('Without selector', () => {

        describe('Client-side', () => {

          test('Without equalityFn', async () => {

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookTester = new HookTester({
              useHook: () => useStateValue(TestState),
              values: {
                main(state) { return state },
              },
              actions: {
                async setValue() {
                  await TestState.set({
                    firstName: 'Jane',
                    lastName: 'Clover',
                    luckyNumber: 101,
                  })
                },
                async setValueByFunction() {
                  await TestState.set((s) => ({
                    ...s,
                    luckyNumber: s.luckyNumber + 1,
                  }))
                },
                async setSameValue() {
                  await TestState.set((s) => s)
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
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValue')
            } else {
              hookTester.action('setValue')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookTester.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setSameValue')
            } else {
              hookTester.action('setSameValue')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookTester.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValueByFunction')
            } else {
              hookTester.action('setValueByFunction')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 102,
            })
            expect(hookTester.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookTester.actionAsync('reset')
            } else {
              hookTester.action('reset')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
            expect(hookTester.renderCount).toBe(4)

          })

          test('With equalityFn', async () => {

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookTester = new HookTester({
              useHook: () => useStateValue(TestState, null, objectIsShallowEqual),
              values: {
                main(state) { return state },
              },
              actions: {
                async setValue() {
                  await TestState.set({
                    firstName: 'Jane',
                    lastName: 'Clover',
                    luckyNumber: 101,
                  })
                },
                async setValueByFunction() {
                  await TestState.set((s) => ({
                    ...s,
                    luckyNumber: s.luckyNumber + 1,
                  }))
                },
                async setSameValue() {
                  await TestState.set((s) => s)
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
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValue')
            } else {
              hookTester.action('setValue')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookTester.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setSameValue')
            } else {
              hookTester.action('setSameValue')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookTester.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValueByFunction')
            } else {
              hookTester.action('setValueByFunction')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 102,
            })
            expect(hookTester.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookTester.actionAsync('reset')
            } else {
              hookTester.action('reset')
            }
            expect(hookTester.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
            expect(hookTester.renderCount).toBe(4)

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

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookTester = new HookTester({
              useHook: () => useStateValue(TestState, (s) => s.luckyNumber),
              values: {
                main(state) { return state },
              },
              actions: {
                async setValue() {
                  await TestState.set({
                    firstName: 'Jane',
                    lastName: 'Clover',
                    luckyNumber: 101,
                  })
                },
                async setValueByFunction() {
                  await TestState.set((s) => ({
                    ...s,
                    luckyNumber: s.luckyNumber + 1,
                  }))
                },
                async setSameValue() {
                  await TestState.set((s) => s)
                },
                async setFirstName() {
                  await TestState.set((s) => ({
                    ...s,
                    firstName: 'David',
                  }))
                },
                reset: TestState.reset,
              },
            }, cleanupManager)

            // Check initial state
            expect(hookTester.get('main')).toBe(42)
            expect(hookTester.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValue')
            } else {
              hookTester.action('setValue')
            }
            expect(hookTester.get('main')).toBe(101)
            expect(hookTester.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setSameValue')
            } else {
              hookTester.action('setSameValue')
            }
            expect(hookTester.get('main')).toBe(101)
            expect(hookTester.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValueByFunction')
            } else {
              hookTester.action('setValueByFunction')
            }
            expect(hookTester.get('main')).toBe(102)
            expect(hookTester.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setFirstName')
            } else {
              hookTester.action('setFirstName')
            }
            expect(hookTester.get('main')).toBe(102)
            expect(hookTester.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookTester.actionAsync('reset')
            } else {
              hookTester.action('reset')
            }
            expect(hookTester.get('main')).toBe(42)
            expect(hookTester.renderCount).toBe(4)

          })

          test('With equalityFn', async () => {

            const defaultState: IUserState = {
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            }
            const TestState = new StateManagerType(defaultState)
            cleanupManager.append(TestState.dispose)

            const hookTester = new HookTester({
              useHook: () => useStateValue(
                TestState,
                (s) => s.luckyNumber,
                objectIsShallowEqual,
              ),
              values: {
                main(state) { return state },
              },
              actions: {
                async setValue() {
                  await TestState.set({
                    firstName: 'Jane',
                    lastName: 'Clover',
                    luckyNumber: 101,
                  })
                },
                async setValueByFunction() {
                  await TestState.set((s) => ({
                    ...s,
                    luckyNumber: s.luckyNumber + 1,
                  }))
                },
                async setSameValue() {
                  await TestState.set((s) => s)
                },
                async setFirstName() {
                  await TestState.set((s) => ({
                    ...s,
                    firstName: 'David',
                  }))
                },
                reset: TestState.reset,
              },
            }, cleanupManager)

            // Check initial state
            expect(hookTester.get('main')).toBe(42)
            expect(hookTester.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValue')
            } else {
              hookTester.action('setValue')
            }
            expect(hookTester.get('main')).toBe(101)
            expect(hookTester.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setSameValue')
            } else {
              hookTester.action('setSameValue')
            }
            expect(hookTester.get('main')).toBe(101)
            expect(hookTester.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setValueByFunction')
            } else {
              hookTester.action('setValueByFunction')
            }
            expect(hookTester.get('main')).toBe(102)
            expect(hookTester.renderCount).toBe(3)

            // Set value for property not included by selector and expect no re-renders
            if (isAsyncStateManager) {
              await hookTester.actionAsync('setFirstName')
            } else {
              hookTester.action('setFirstName')
            }
            expect(hookTester.get('main')).toBe(102)
            expect(hookTester.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookTester.actionAsync('reset')
            } else {
              hookTester.action('reset')
            }
            expect(hookTester.get('main')).toBe(42)
            expect(hookTester.renderCount).toBe(4)

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

          const defaultState: IUserState = {
            firstName: 'John',
            lastName: 'Smith',
            luckyNumber: 42,
          }
          const TestState = new StateManagerType(defaultState)
          cleanupManager.append(TestState.dispose)

          const hookTester = new HookTester({
            useHook: () => useStateValue(TestState, null, null),
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
            await hookTester.actionAsync('setValue')
          } else {
            hookTester.action('setValue')
          }
          expect(hookTester.renderCount).toBe(1)
          expect(Object.is).toHaveBeenCalledWith(defaultState, defaultState)

        })

      })

    })

  }

})
