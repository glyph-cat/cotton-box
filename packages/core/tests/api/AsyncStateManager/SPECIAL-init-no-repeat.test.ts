/* eslint-disable no-console */

import { Fn } from '@glyph-cat/foundation'
import { AsyncStateManager } from 'cotton-box'

jest.useRealTimers()

let TestState: AsyncStateManager<number>
afterEach(async () => { await TestState?.dispose() })

test('commit', async () => {
  TestState = new AsyncStateManager(0)
  let commitRef: Fn<number> = null!
  await TestState.init(({ commit }) => {
    commitRef = commit
    commit(1)
  })
  const watchCallback = jest.fn()
  commitRef(2)
  expect(watchCallback).not.toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledOnceInDevelopment()
})

test('commitNoop', async () => {
  TestState = new AsyncStateManager(0)
  let commitRef: Fn = null!
  await TestState.init(({ commitNoop }) => {
    commitRef = commitNoop
    commitNoop()
  })
  const watchCallback = jest.fn()
  commitRef()
  expect(watchCallback).not.toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledOnceInDevelopment()
})
