export interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TestUtils {

  export function delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }

  export function spyOnConsoleError(): void {
    let consoleError: typeof console.error
    beforeEach(() => {
      consoleError = console.error
      console.error = jest.fn(() => { /**/ })
      // console.error = jest.fn(consoleError)
      // ^ for ease of debug only, commented out when not in use
    })
    afterEach(() => { console.error = consoleError })
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
    this.run = this.run.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  append(cleanupFn: Function): void {
    this.cleanupFns.push(cleanupFn)
  }

  run(): void {
    while (this.cleanupFns.length > 0) {
      this.cleanupFns[0]()
      this.cleanupFns.shift()
    }
  }

}

export * from './hook-tester'
