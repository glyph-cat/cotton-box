/* eslint-disable no-console */
import { CurrentTestSpec } from './tests/test-helpers'

type IConsole = typeof console
type ConsoleKey = keyof IConsole

const consoleMethodNames: Array<ConsoleKey> = [
  'log',
  'info',
  'warn',
  'error',
]

const originalMethods: Partial<Record<ConsoleKey, IConsole[ConsoleKey]>> = {}

beforeEach(() => {
  for (const consoleMethodName of consoleMethodNames) {
    originalMethods[consoleMethodName] = console[consoleMethodName]
    // @ts-expect-error: This is a wrapper, type-wise, it should be safe.
    // console[consoleMethodName] = jest.fn(originalMethods[consoleMethodName])
    console[consoleMethodName] = jest.fn()
  }
})

afterEach(() => {
  for (const consoleMethodName of consoleMethodNames) {
    // @ts-expect-error: because of forceful re-assignment
    console[consoleMethodName] = originalMethods[consoleMethodName]
  }
})

expect.extend({
  toHaveBeenCalledOnceInDevelopment(received: any) {
    if (!received?._isMockFunction) {
      return {
        pass: false,
        message: () => `Matcher error: ${this.utils.RECEIVED_COLOR('received')} value must be a mock or spy function`,
      }
    }
    const expectedCallCount = CurrentTestSpec.BUNDLE_TYPE !== 'production' ? 1 : 0
    const actualCallCount = received.mock.calls.length
    return {
      pass: actualCallCount === expectedCallCount,
      message: () => `Expected ${expectedCallCount} ${this.utils.pluralize('call', expectedCallCount)} in ${CurrentTestSpec.BUNDLE_TYPE} bundle but it has been called ${actualCallCount} ${this.utils.pluralize('time', actualCallCount)}`,
    }
  },
})

export { }
