import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ Lib: { BUILD_HASH }, buildEnv }: TestConfig) => {
  test('main', () => {
    expect(Object.is(BUILD_HASH, undefined)).toBe(buildEnv === 'debug')
    expect(/^[a-f0-9]{40}$/.test(BUILD_HASH)).toBe(buildEnv !== 'debug')
  })
})
