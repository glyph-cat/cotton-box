import { AsyncStateManager, SimpleStateManager, StateManager } from 'cotton-box'
import { CleanupManager } from '../../../tests/test-helpers'
import { $ } from '../../abstractions'
import {
  getErrorMessageForNonReactiveHookIfIncorrectType,
  getErrorMessageForReactiveHookIfIncorrectType,
  isInvalidStateManagerType,
} from './internals'

const cleanupManager = new CleanupManager()
afterEach(cleanupManager.performCleanup)

describe(getErrorMessageForNonReactiveHookIfIncorrectType.name, () => {

  describe(StateManager.name, () => {

    test('Without name', () => {
      const TestState = new StateManager(null)
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForNonReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed a `StateManager` to `useSimpleStateValue`. Please `useStateValue` instead.')
    })

    test('With name', () => {
      const TestState = new StateManager(null, { name: 'TestState' })
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForNonReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed a `StateManager` (name: TestState) to `useSimpleStateValue`. Please `useStateValue` instead.')
    })

  })

  describe(AsyncStateManager.name, () => {

    test('Without name', () => {
      const TestState = new AsyncStateManager(null)
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForNonReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed an `AsyncStateManager` to `useSimpleStateValue`. Please `useStateValue` instead.')
    })

    test('With name', () => {
      const TestState = new AsyncStateManager(null, { name: 'TestState' })
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForNonReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed an `AsyncStateManager` (name: TestState) to `useSimpleStateValue`. Please `useStateValue` instead.')
    })

  })

})

describe(getErrorMessageForReactiveHookIfIncorrectType.name, () => {

  describe(StateManager.name, () => {

    test('Without name', () => {
      const TestState = new StateManager(null)
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed a `StateManager` to `useSimpleStateValueWithReactiveSelector`. Please `useStateValueWithReactiveSelector` instead.')
    })

    test('With name', () => {
      const TestState = new StateManager(null, { name: 'TestState' })
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed a `StateManager` (name: TestState) to `useSimpleStateValueWithReactiveSelector`. Please `useStateValueWithReactiveSelector` instead.')
    })

  })

  describe(AsyncStateManager.name, () => {

    test('Without name', () => {
      const TestState = new AsyncStateManager(null)
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed an `AsyncStateManager` to `useSimpleStateValueWithReactiveSelector`. Please `useStateValueWithReactiveSelector` instead.')
    })

    test('With name', () => {
      const TestState = new AsyncStateManager(null, { name: 'TestState' })
      cleanupManager.append(TestState.dispose)
      const output = getErrorMessageForReactiveHookIfIncorrectType(TestState as $)
      expect(output).toBe('Invalid State Manager type.\n\nIt seems like you have mistakenly passed an `AsyncStateManager` (name: TestState) to `useSimpleStateValueWithReactiveSelector`. Please `useStateValueWithReactiveSelector` instead.')
    })

  })

})

describe(isInvalidStateManagerType.name, () => {

  test(SimpleStateManager.name, () => {
    expect(isInvalidStateManagerType(new SimpleStateManager(null))).toBe(undefined)
  })

  test(StateManager.name, () => {
    expect(isInvalidStateManagerType(new StateManager(null))).toBe(1)
  })

  test(AsyncStateManager.name, () => {
    expect(isInvalidStateManagerType(new AsyncStateManager(null))).toBe(1)
  })

  test('Other data type', () => {
    // If not State Manager, ignore at this level and let the natural error(s)
    // surface by themselves later on when calling useSyncExternalStore.
    expect(isInvalidStateManagerType('lorem-ipsum')).toBe(undefined)
  })

})
