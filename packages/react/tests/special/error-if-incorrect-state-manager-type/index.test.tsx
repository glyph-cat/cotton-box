import { $ } from '../../../src/abstractions'
import { CleanupManager, HookInterface, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

/* eslint-disable no-console */

type $$ = $<null>

enum ErrorType {
  NONE,
  CONSOLE_ONLY,
  THROWN,
}

wrapper(({
  buildEnv,
  Lib: { SimpleStateManager, StateManager, AsyncStateManager },
  ReactLib: {
    useSimpleStateValue,
    useSimpleStateValueWithReactiveSelector,
    useStateValue,
    useStateValueWithReactiveSelector,
    // useInitStatus,
  },
}: TestConfig) => {

  const stateManagersToTestWith = {
    SimpleStateManager,
    StateManager,
    AsyncStateManager,
  } as const

  interface ITestCase {
    hook(...args: unknown[]): void
    expectErrors: Record<keyof typeof stateManagersToTestWith, ErrorType>
  }

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)
  TestUtils.spyOnConsoleError()

  const testCases: Array<ITestCase> = [
    {
      hook: useSimpleStateValue,
      expectErrors: {
        'SimpleStateManager': ErrorType.NONE,
        'StateManager': ErrorType.THROWN,
        'AsyncStateManager': ErrorType.THROWN,
      },
    },
    {
      hook: useSimpleStateValueWithReactiveSelector,
      expectErrors: {
        'SimpleStateManager': ErrorType.NONE,
        'StateManager': ErrorType.THROWN,
        'AsyncStateManager': ErrorType.THROWN,
      },
    },
    {
      hook: useStateValue,
      expectErrors: {
        'SimpleStateManager': ErrorType.NONE,
        'StateManager': ErrorType.NONE,
        'AsyncStateManager': ErrorType.NONE,
      },
    },
    {
      hook: useStateValueWithReactiveSelector,
      expectErrors: {
        'SimpleStateManager': ErrorType.NONE,
        'StateManager': ErrorType.NONE,
        'AsyncStateManager': ErrorType.NONE,
      },
    },
    // {
    //   hook: useInitStatus,
    //   expectErrors: {
    //     'SimpleStateManager': ErrorType.CONSOLE_ONLY,
    //     'StateManager': ErrorType.NONE,
    //     'AsyncStateManager': ErrorType.NONE,
    //   },
    // },
  ]

  for (const { hook: useHook, expectErrors } of testCases) {
    describe(useHook.name, () => {
      for (const StateManagerTypeKey in stateManagersToTestWith) {
        test(`${StateManagerTypeKey} (ErrorType: ${ErrorType[expectErrors[StateManagerTypeKey]]})`, () => {
          const StateManagerType = stateManagersToTestWith[StateManagerTypeKey]
          const TestState = new StateManagerType(null)
          const hookInterface = new HookInterface({
            cleanupManager,
            useHook: () => { useHook(TestState as $$, TestUtils.mockSelector) },
          })
          const expectErrorToBeThrown = expectErrors[StateManagerTypeKey] === ErrorType.THROWN
          expect(hookInterface.capturedErrors.length).toBe(expectErrorToBeThrown ? 1 : 0)
          expect(console.error).toHaveBeenCalledTimes(
            expectErrors[StateManagerTypeKey] > ErrorType.NONE
              ? buildEnv !== 'prod' ? 2 : 1
              // ^ there is one extra call because React also shows some error
              //   on the console related to error boundaries.
              : 0 // Expect no errors to occur at all
          )
        })
      }
    })
  }

})
