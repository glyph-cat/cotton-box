import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { CleanupManager } from '../../../tests/test-helpers'
import { getErrorMessageIfIncorrectType } from './internals'
import { $ } from '../../abstractions'

let cleanupManager: CleanupManager
beforeEach(() => { cleanupManager = new CleanupManager() })
afterEach(() => { cleanupManager.performCleanup() })

describe(SimpleStateManager.name, () => {

  test('Without name', () => {
    const TestState = new SimpleStateManager(null)
    cleanupManager.append(TestState.dispose)
    const output = getErrorMessageIfIncorrectType(TestState as $)
    expect(output).toBe('It seems like you have mistakenly passed a `SimpleStateManager` to `useInitStatus`. `SimpleStateManager`s do not have lifecycle hooks.')
  })

  test('With name', () => {
    const TestState = new SimpleStateManager(null, { name: 'TestState' })
    cleanupManager.append(TestState.dispose)
    const output = getErrorMessageIfIncorrectType(TestState as $)
    expect(output).toBe('It seems like you have mistakenly passed a `SimpleStateManager` (name: TestState) to `useInitStatus`. `SimpleStateManager`s do not have lifecycle hooks.')
  })

})

test(StateManager.name, () => {
  const TestState = new StateManager(null)
  cleanupManager.append(TestState.dispose)
  const output = getErrorMessageIfIncorrectType(TestState as $)
  expect(output).toBeUndefined()
})

test(AsyncStateManager.name, () => {
  const TestState = new AsyncStateManager(null)
  cleanupManager.append(TestState.dispose)
  const output = getErrorMessageIfIncorrectType(TestState as $)
  expect(output).toBeUndefined()
})
