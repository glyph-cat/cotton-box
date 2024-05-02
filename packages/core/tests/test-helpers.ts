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

  export function isThenable(value: unknown): value is Promise<unknown> {
    return typeof value?.['then'] === 'function'
  }

  export function spyOnConsoleError(): void {
    /* eslint-disable no-console */
    let consoleError: typeof console.error
    beforeEach(() => {
      consoleError = console.error
      console.error = jest.fn(() => { /**/ })
    })
    afterEach(() => { console.error = consoleError })
    /* eslint-enable no-console */
  }

}

export class CleanupManager {

  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly cleanupFns: Array<Function> = []

  constructor() {
    this.append = this.append.bind(this)
    this.performCleanup = this.performCleanup.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
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
