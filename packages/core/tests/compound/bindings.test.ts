/* eslint-disable jest/expect-expect */
import { CleanupManager } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

let cleanupManager: CleanupManager
beforeEach(() => { cleanupManager = new CleanupManager() })
afterEach(() => { cleanupManager.run() })

wrapper(({ Lib: {
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
} }: TestConfig) => {

  test('SimpleStateManager', async () => {
    const TestStateManager = new SimpleStateManager(42)
    cleanupManager.append(TestStateManager.dispose)
    await performInvocations([
      [TestStateManager.get],
      [TestStateManager.set, 37],
      [TestStateManager.reset],
      [TestStateManager.watch, () => { /* ... */ }],
      [TestStateManager.wait, () => true],
      [TestStateManager.unwatchAll],
      [TestStateManager.dispose],
    ])
  })

  test('StateManager', async () => {
    const TestStateManager = new StateManager(42, {
      lifecycle: { init({ commitNoop }) { commitNoop() } }
    })
    cleanupManager.append(TestStateManager.dispose)
    await performInvocations([
      [TestStateManager.init, ({ commitNoop }) => { commitNoop() }],
      [TestStateManager.reinitialize],
      [TestStateManager.get],
      [TestStateManager.set, 37],
      [TestStateManager.reset],
      [TestStateManager.watch, () => { /* ... */ }],
      [TestStateManager.wait, () => true],
      [TestStateManager.unwatchAll],
      [TestStateManager.dispose],
    ])
  })

  test('AsyncStateManager', async () => {
    const TestStateManager = new AsyncStateManager(42, {
      lifecycle: { init({ commitNoop }) { commitNoop() } }
    })
    cleanupManager.append(TestStateManager.dispose)
    await performInvocations([
      [TestStateManager.init, ({ commitNoop }) => { commitNoop() }],
      [TestStateManager.reinitialize],
      [TestStateManager.get],
      [TestStateManager.getSync],
      [TestStateManager.set, 37],
      [TestStateManager.reset],
      [TestStateManager.watch, () => { /* ... */ }],
      [TestStateManager.wait, () => true],
      [TestStateManager.unwatchAll],
      [TestStateManager.dispose],
    ])
  })

})

type Fn = (...args: any[]) => any

async function performInvocations(calls: Array<[
  callback: Fn,
  ...params: Parameters<Fn>
]>): Promise<void> {
  for (const [fn, params] of calls) {
    const callback = async () => { await fn(params) }
    await expect(callback()).resolves.not.toThrow()
  }
}
