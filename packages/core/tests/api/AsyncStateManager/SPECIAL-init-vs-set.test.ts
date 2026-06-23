/* eslint-disable no-console */
import { AsyncStateManager } from 'cotton-box'
import { TestUtils } from '../../test-helpers'

jest.useRealTimers()

let TestState: AsyncStateManager<number>
afterEach(async () => { await TestState?.dispose() })

describe('No pending changes', () => {

  test('commit', async () => {

    TestState = new AsyncStateManager(0)
    const initPromise = TestState.init(async ({ commit }) => {
      await TestUtils.delay(10)
      commit(101)
    })

    TestState.set(41)
    expect(console.error).toHaveBeenCalledOnceInDevelopment()
    expect(TestState.getSync()).toBe(0)

    await initPromise
    expect(TestState.getSync()).toBe(101)

    TestState.set(42)
    expect(TestState.getSync()).toBe(42)

  })

  test('commitNoop', async () => {

    TestState = new AsyncStateManager(0)
    const initPromise = TestState.init(async ({ commitNoop }) => {
      await TestUtils.delay(10)
      commitNoop()
    })

    TestState.set(41)
    expect(console.error).toHaveBeenCalledOnceInDevelopment()
    expect(TestState.getSync()).toBe(0)

    await initPromise
    expect(TestState.getSync()).toBe(0)

    TestState.set(42)
    expect(TestState.getSync()).toBe(42)

  })

})

describe('Has pending changes', () => {

  test('commit', async () => {

    TestState = new AsyncStateManager(0)

    TestState.set(async () => { await TestUtils.delay(10); return 1 })
    setTimeout(() => {
      TestState.init(async ({ commit }) => {
        await TestUtils.delay(10)
        commit(101)
      })
    }, 10)

    expect(TestState.getSync()).toBe(0)

    // Expect init to not take effect yet
    await TestUtils.delay(10)
    expect(TestState.getSync()).toBe(1)

    await TestUtils.delay(10)
    expect(TestState.getSync()).toBe(101)

  })

  test('commitNoop', async () => {

    TestState = new AsyncStateManager(0)

    let isInitCalled = false
    TestState.set(async () => { await TestUtils.delay(10); return 1 })
    setTimeout(() => {
      TestState.init(async ({ commitNoop }) => {
        await TestUtils.delay(10)
        commitNoop()
        isInitCalled = true
      })
    }, 10)

    await TestUtils.delay(10)
    expect(isInitCalled).toBe(false)

    await TestUtils.delay(10)
    expect(isInitCalled).toBe(true)

  })

})
