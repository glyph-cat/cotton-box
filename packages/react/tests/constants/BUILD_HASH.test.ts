import { BUILD_HASH } from 'cotton-box-react'
import { CurrentTestSpec } from '../test-helpers'

test('BUILD_HASH', () => {
  expect(
    Object.is(BUILD_HASH, undefined)
  ).toBe(CurrentTestSpec.BUNDLE_TYPE === 'debugging')
  expect(
    /^[a-f0-9]{7}-[a-f0-9]{11}$/.test(BUILD_HASH)
  ).toBe(CurrentTestSpec.BUNDLE_TYPE !== 'debugging')
})
