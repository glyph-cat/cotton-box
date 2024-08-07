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

  export function tryOnly(callback: () => void): void {
    try {
      callback()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {/* ... */ }
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
