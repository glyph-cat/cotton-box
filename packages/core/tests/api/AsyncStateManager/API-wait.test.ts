import { Nullable } from '@glyph-cat/foundation'
import { AsyncStateManager } from 'cotton-box'

let TestState: AsyncStateManager<number>
afterEach(async () => { await TestState?.dispose() })

describe('State is already anticipated value', () => {

  test('Wait by value', async () => {
    TestState = new AsyncStateManager(42)
    let waitedValue: Nullable<number> = null
    const cb = async () => {
      waitedValue = await TestState.wait(42)
    }
    await cb()
    expect(waitedValue).toBe(42)
  })

  test('Wait by evaluator', async () => {
    TestState = new AsyncStateManager(42)
    let waitedValue: Nullable<number> = null
    let spiedDefaultState: Nullable<number> = null
    const cb = async () => {
      waitedValue = await TestState.wait((state, defaultState) => {
        spiedDefaultState = defaultState
        return state % 2 === 0
      })
    }
    await cb()
    expect(waitedValue).toBe(42)
    expect(spiedDefaultState).toBe(42)
  })

})

describe('State is currently not the anticipated value', () => {

  test('Wait by value', async () => {
    TestState = new AsyncStateManager(41)
    let waitedValue: Nullable<number> = null
    const cb = async () => {
      waitedValue = await TestState.wait(42)
    }
    const cbPromise = cb()
    expect(waitedValue).toBeNull()
    TestState.set(42)
    await cbPromise
    expect(waitedValue).toBe(42)
  })

  test('Wait by evaluator', async () => {
    TestState = new AsyncStateManager(42)
    let waitedValue: Nullable<number> = null
    let spiedDefaultState: Nullable<number> = null
    const cb = async () => {
      waitedValue = await TestState.wait((state, defaultState) => {
        spiedDefaultState = defaultState
        return state % 2 !== 0
      })
    }
    const cbPromise = cb()
    expect(waitedValue).toBeNull()
    expect(spiedDefaultState).toBe(42)
    TestState.set(41)
    await cbPromise
    expect(waitedValue).toBe(41)
  })

})
