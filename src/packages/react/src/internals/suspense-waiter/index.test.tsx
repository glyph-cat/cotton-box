import { CleanupManager } from '@glyph-cat/cleanup-manager'
import { SuspenseTester } from '@glyph-cat/react-test-utils'
import { act } from 'react'
import { AsyncStateManager, SimpleStateManager, StateManager } from '../../../../core/src'
import { TestUtils } from '../../../tests/test-helpers'
import {
  createSuspenseWaiter,
  useSuspenseWaiter,
} from '../../internals/suspense-waiter'

jest.useRealTimers()

function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

describe(createSuspenseWaiter.name, () => {

  test('Error', async () => {
    const promise = Promise.reject('match-key')
    const wait = createSuspenseWaiter(promise)
    await delay(10)
    expect(() => { wait() }).toThrow('match-key')
  })

  test('Pending', async () => {
    const promise = delay(20)
    const wait = createSuspenseWaiter(promise)
    await delay(10)
    expect(() => { wait() }).toThrow()
  })

  test('Completed', async () => {
    const promise = delay(10)
    const wait = createSuspenseWaiter(promise)
    await delay(20)
    expect(() => { wait() }).not.toThrow()
  })

})

describe(useSuspenseWaiter.name, () => {

  let cleanupManager: CleanupManager
  beforeEach(() => { cleanupManager = new CleanupManager() })
  afterEach(() => { cleanupManager.run() })

  const stateManagersToTestWith = {
    SimpleStateManager,
    StateManager,
    AsyncStateManager,
  } as const

  for (const StateManagerTypeKey in stateManagersToTestWith) {
    const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]
    describe(StateManagerTypeKey, () => {

      test('Not initializing', () => {

        const TestState = new StateManagerType(null, {
          suspense: true,
        })
        cleanupManager.append(TestState.dispose)

        const suspenseTester = new SuspenseTester((): null => {
          useSuspenseWaiter(TestState)
          return null
        }, cleanupManager)

        expect(suspenseTester.componentIsUnderSuspense).toBe(false)

      })

      test('Is initializing', async () => {

        const TestState = new StateManagerType(null, {
          lifecycle: {
            async init({ commitNoop }) {
              await TestUtils.delay(10)
              commitNoop()
            },
          },
          suspense: true,
        })
        cleanupManager.append(TestState.dispose)

        const suspenseTester = new SuspenseTester((): null => {
          useSuspenseWaiter(TestState)
          return null
        }, cleanupManager)

        expect(suspenseTester.componentIsUnderSuspense).toBe(
          StateManagerTypeKey === 'SimpleStateManager' ? false : true
        )

        await act(async () => { await TestUtils.delay(10) })
        expect(suspenseTester.componentIsUnderSuspense).toBe(false)

      })

    })
  }

})
