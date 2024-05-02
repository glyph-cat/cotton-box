import { version as PKG_VERSION } from '../../package.json'
import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { VERSION }, buildEnv }: TestConfig) => {
  test('main', () => {
    expect(VERSION).toBe(buildEnv === 'debug' ? undefined : PKG_VERSION)
  })
})
