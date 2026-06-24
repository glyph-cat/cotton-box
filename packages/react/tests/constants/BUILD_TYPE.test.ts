import { BUILD_TYPE as COTTON_BOX_BUILD_TYPE } from 'cotton-box'
import { BUILD_TYPE } from 'cotton-box-react'
import { CurrentTestSpec } from '../test-helpers'

test('BUILD_TYPE', () => {
  expect(BUILD_TYPE).toBe(CurrentTestSpec.BUILD_TYPE)
  expect(COTTON_BOX_BUILD_TYPE).toBe(CurrentTestSpec.BUILD_TYPE)
})
