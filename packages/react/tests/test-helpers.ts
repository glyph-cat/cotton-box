import { type ICustomTestSpec } from 'cotton-box-repo-tools/test-abstractions'

export const CurrentTestSpec: ICustomTestSpec = __CUSTOM_TEST_SPEC

export interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

export function createDefaultUserState(): IUserState {
  return Object.freeze({
    firstName: 'John',
    lastName: 'Smith',
    luckyNumber: 42,
  })
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TestUtils {

  export function delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }

  export function mockSelector<S>(s: S): S { return s }

}
