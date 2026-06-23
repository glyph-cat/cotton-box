import { type ICustomTestSpec } from 'cotton-box-repo-tools/test-abstractions'

export interface IUserState {
  firstName: string
  lastName: string
  luckyNumber: number
}

export const CurrentTestSpec: ICustomTestSpec = __CUSTOM_TEST_SPEC

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TestUtils {

  export function delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    })
  }

  export function tryOnly(callback: () => void): void {
    try {
      callback()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) { /* ... */ }
  }

}

export class MockStorage {

  private readonly store: Record<string, string> = {}

  constructor() {
    this.setItem = this.setItem.bind(this)
    this.getItem = this.getItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  setItem(key: string, value: unknown): void {
    this.store[key] = String(value)
  }

  getItem(key: string): string {
    return this.store[key]
  }

  removeItem(key: string): void {
    delete this.store[key]
  }

}
