import { VERSION } from 'cotton-box'
import { version as PKG_VERSION } from '../../package.json'
import { CurrentTestSpec } from '../test-helpers'

test('VERSION', () => {
  expect(VERSION).toBe(CurrentTestSpec.BUNDLE_TYPE === 'debugging' ? undefined : PKG_VERSION)
})
