/* eslint-disable no-console */

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
    // // @ts-expect-error This is a wrapper, type-wise, it should be safe.
    // console[consoleMethodName] = jest.fn(originalMethods[consoleMethodName])
    console[consoleMethodName] = jest.fn()
  }
})

afterEach(() => {
  for (const consoleMethodName of consoleMethodNames) {
    console[consoleMethodName] = originalMethods[consoleMethodName] as any
  }
})

export { }

// TODO: [Low priority]
// https://jestjs.io/docs/expect#expectextendmatchers
// https://stackoverflow.com/a/64471550/5810737
// import type { TestConfig } from './tests/test-wrapper'
// expect.extend({
//   toHaveBeenCalledIfNotProdEnv: (received, buildEnv: TestConfig['buildEnv']) => {
//     if (buildEnv !== 'prod') {
//       return {
//         pass: true,
//         message: () => `Expected \`console.error\` to be called but it is not`,
//       }
//     } else {
//       return {
//         pass: received,
//         message: () => '',
//       }
//     }
//   }
// })
