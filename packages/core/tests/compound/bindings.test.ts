import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import type { StateManagerInitArgs } from '../../src'

let disposeFn: Fn<void, void | Promise<void>>
afterEach(async () => { await disposeFn?.() })

test('SimpleStateManager', async () => {
  const TestState = new SimpleStateManager(42)
  disposeFn = TestState.dispose
  await performInvocations([
    [TestState.get],
    [TestState.set, 37],
    [TestState.reset],
    [TestState.watch, () => { /* ... */ }],
    [TestState.wait, () => true],
    [TestState.unwatchAll],
    [TestState.dispose],
  ])
  expect('').pass('`expect` is invoked by `performInvocations`')
})

test('StateManager', async () => {
  const TestState = new StateManager(42, {
    lifecycle: { init({ commitNoop }) { commitNoop() } }
  })
  disposeFn = TestState.dispose
  await performInvocations([
    [
      TestState.init,
      ({ commitNoop }: StateManagerInitArgs<unknown>) => { commitNoop() }
    ],
    [TestState.reinitialize],
    [TestState.get],
    [TestState.set, 37],
    [TestState.reset],
    [TestState.watch, () => { /* ... */ }],
    [TestState.wait, () => true],
    [TestState.unwatchAll],
    [TestState.dispose],
  ])
  expect('').pass('`expect` is invoked by `performInvocations`')
})

test('AsyncStateManager', async () => {
  const TestState = new AsyncStateManager(42, {
    lifecycle: { init({ commitNoop }) { commitNoop() } }
  })
  disposeFn = TestState.dispose
  await performInvocations([
    [
      TestState.init,
      ({ commitNoop }: StateManagerInitArgs<unknown>) => { commitNoop() }
    ],
    [TestState.reinitialize],
    [TestState.get],
    [TestState.getSync],
    [TestState.set, 37],
    [TestState.reset],
    [TestState.watch, () => { /* ... */ }],
    [TestState.wait, () => true],
    [TestState.unwatchAll],
    [TestState.dispose],
  ])
  expect('').pass('`expect` is invoked by `performInvocations`')
})

async function performInvocations(calls: Array<[
  callback: Fn<any, any>,
  ...params: Parameters<Fn<any, any>>
]>): Promise<void> {
  for (const [fn, params] of calls) {
    const callback = async () => { await fn(params) }
    await expect(callback()).resolves.not.toThrow()
  }
}
