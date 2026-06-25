import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { renderSuspenseTester } from 'custom-react-hook-tester'
import { act } from 'react'
import { createSuspenseWaiter, useSuspenseWaiter } from '.'
import { TestUtils } from '../../../tests/test-helpers'

jest.useRealTimers()

describe(createSuspenseWaiter.name, () => {

  test('Error', async () => {
    const promise = Promise.reject('match-key')
    const wait = createSuspenseWaiter(promise)
    await TestUtils.delay(10)
    expect(() => { wait() }).toThrow('match-key')
  })

  test('Pending', async () => {
    const promise = TestUtils.delay(20)
    const wait = createSuspenseWaiter(promise)
    await TestUtils.delay(10)
    expect(() => { wait() }).toThrow()
  })

  test('Completed', async () => {
    const promise = TestUtils.delay(10)
    const wait = createSuspenseWaiter(promise)
    await TestUtils.delay(20)
    // KIV: The line below failed once, but the error was never encountered again.
    expect(() => { wait() }).not.toThrow()
  })

})

describe(useSuspenseWaiter.name, () => {

  let teardownFunctions: Array<Fn>
  const collectForTeardown = (fn: Fn) => teardownFunctions.push(fn)
  beforeEach(() => { teardownFunctions = [] })
  afterEach(() => { teardownFunctions = null! })

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
        collectForTeardown(TestState.dispose)

        const hook = renderSuspenseTester(() => useSuspenseWaiter(TestState))
        const { meta } = hook
        collectForTeardown(hook.unmount)

        expect(meta.isSuspensed).toBeFalse()

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
        collectForTeardown(TestState.dispose)

        const hook = renderSuspenseTester(() => useSuspenseWaiter(TestState))
        const { meta } = hook
        collectForTeardown(hook.unmount)

        // Will not be suspensed if type is `SimpleStateManager`
        expect(meta.isSuspensed).toBe((StateManagerTypeKey as keyof typeof stateManagersToTestWith) !== 'SimpleStateManager')

        await act(async () => { await TestUtils.delay(10) })
        expect(meta.isSuspensed).toBeFalse()

      })

    })
  }

})
