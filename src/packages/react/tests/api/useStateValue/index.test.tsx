import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { shallowCompareObject } from '@glyph-cat/equality'
import { HookTester } from '@glyph-cat/react-test-utils'
import { JSX } from 'react'
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

            const hookInterface = new HookTester({
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
            expect(Object.is(hookInterface.get('main'), defaultState)).toBe(true)
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
            expect(hookInterface.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValue')
            } else {
              hookInterface.action('setValue')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setSameValue')
            } else {
              hookInterface.action('setSameValue')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValueByFunction')
            } else {
              hookInterface.action('setValueByFunction')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 102,
            })
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('reset')
            } else {
              hookInterface.action('reset')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
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
              useHook: () => useStateValue(TestState, null, shallowCompareObject),
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
            expect(Object.is(hookInterface.get('main'), defaultState)).toBe(true)
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
            expect(hookInterface.renderCount).toBe(1)

            // Set value normally
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValue')
            } else {
              hookInterface.action('setValue')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookInterface.renderCount).toBe(2)

            // Set value again and expect no re-renders
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setSameValue')
            } else {
              hookInterface.action('setSameValue')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 101,
            })
            expect(hookInterface.renderCount).toBe(2)

            // Set value by function
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('setValueByFunction')
            } else {
              hookInterface.action('setValueByFunction')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'Jane',
              lastName: 'Clover',
              luckyNumber: 102,
            })
            expect(hookInterface.renderCount).toBe(3)

            // Reset
            if (isAsyncStateManager) {
              await hookInterface.actionAsync('reset')
            } else {
              hookInterface.action('reset')
            }
            expect(hookInterface.get('main')).toStrictEqual({
              firstName: 'John',
              lastName: 'Smith',
              luckyNumber: 42,
            })
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
          function TestComponent(): JSX.Element {
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

            const hookInterface = new HookTester({
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
              useHook: () => useStateValue(
                TestState,
                (s) => s.luckyNumber,
                shallowCompareObject,
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
          function TestComponent(): JSX.Element {
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

          const hookInterface = new HookTester({
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
