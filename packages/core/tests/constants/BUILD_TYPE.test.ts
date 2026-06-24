import { BUILD_TYPE } from 'cotton-box'
import { CurrentTestSpec } from '../test-helpers'

test('BUILD_TYPE', () => {
  expect(BUILD_TYPE).toBe(CurrentTestSpec.BUILD_TYPE)
})
