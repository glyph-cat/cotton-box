import { TestConfig } from './test-wrapper'

export const currentTestConfigRef: { current: TestConfig } = { current: null }

export interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

export type Nullable<T> = T | null
export function Nullable<T>(): Nullable<T> { return null }

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TestUtils {

  export function delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }

  export function spyOnConsoleError(): void {
    /* eslint-disable no-console */
    let consoleError: typeof console.error
    beforeEach(() => {
      consoleError = console.error
      console.error = jest.fn(() => { /**/ })
      // console.error = jest.fn(consoleError)
      // ^ for ease of debug only, commented out when not in use
    })
    afterEach(() => { console.error = consoleError })
    /* eslint-enable no-console */
  }

  export function mockSelector<S>(s: S): S { return s }

}

export class CleanupManager {

  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private readonly cleanupFns: Array<Function> = []

  constructor() {
    this.append = this.append.bind(this)
    this.performCleanup = this.performCleanup.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  append(cleanupFn: Function): void {
    this.cleanupFns.push(cleanupFn)
  }

  performCleanup(): void {
    while (this.cleanupFns.length > 0) {
      this.cleanupFns[0]()
      this.cleanupFns.shift()
    }
  }

}

export * from './hook-tester'
export * from './suspense-tester'
