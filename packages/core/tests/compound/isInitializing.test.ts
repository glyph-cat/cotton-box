import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, StateManager, StateManagerInitArgs } from 'cotton-box'
import { TestUtils } from '../test-helpers'

jest.useRealTimers()

let disposeFn: Fn<void, void | Promise<void>>
afterEach(async () => { await disposeFn?.() })

let TestState: StateManager<unknown> | AsyncStateManager<unknown>
afterEach(() => { TestState?.dispose() })

const stateManagersToTestWith = {
  StateManager,
  AsyncStateManager,
} as const

for (const StateManagerTypeKey in stateManagersToTestWith) {
  const StateManagerType = stateManagersToTestWith[StateManagerTypeKey as keyof typeof stateManagersToTestWith]
  test(StateManagerTypeKey, async () => {

    TestState = new StateManagerType(null, {
      lifecycle: {
        async init({ commitNoop }: StateManagerInitArgs<unknown>) {
          await TestUtils.delay(10)
          commitNoop()
        },
      },
      suspense: true,
    })
    disposeFn = TestState.dispose

    // Scenario where State Managers should start off with `isInitializing === false`
    // has already been tested when testing the instantiation process.
    expect(TestState.isInitializing.get()).toBeTrue()

    await TestUtils.delay(10)
    expect(TestState.isInitializing.get()).toBeFalse()

    TestState.init(async ({ commitNoop }) => {
      await TestUtils.delay(10)
      commitNoop()
    })
    expect(TestState.isInitializing.get()).toBeTrue()

    await TestUtils.delay(10)
    expect(TestState.isInitializing.get()).toBeFalse()

  })
}
