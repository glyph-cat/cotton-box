/* eslint-disable no-console */
import { Fn } from '@glyph-cat/foundation'
import { StateManager } from 'cotton-box'

jest.useRealTimers()

let TestState: StateManager<number>
afterEach(() => { TestState?.dispose() })

test('commit', async () => {
  TestState = new StateManager(0)
  // Will not be null by the time it is used if test conditions are fulfilled.
  let commitRef: Fn<number> = null!
  TestState.init(({ commit }) => {
    commitRef = commit
    commit(1)
  })
  const watchCallback = jest.fn()
  commitRef(2)
  expect(watchCallback).not.toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledOnceInDevelopment()
})

test('commitNoop', async () => {
  TestState = new StateManager(0)
  // Will not be null by the time it is used if test conditions are fulfilled.
  let commitRef: Fn = null!
  TestState.init(({ commitNoop }) => {
    commitRef = commitNoop
    commitNoop()
  })
  const watchCallback = jest.fn()
  commitRef()
  expect(watchCallback).not.toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledOnceInDevelopment()
})
