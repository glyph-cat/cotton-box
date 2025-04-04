/* eslint-disable no-console */

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
