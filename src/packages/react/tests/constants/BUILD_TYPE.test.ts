import { TestConfig, wrapper } from '../test-wrapper'

wrapper(({ ReactLib: {
  BUILD_TYPE,
  BuildType,
}, buildEnv, buildType }: TestConfig) => {
  test('main', () => {
    expect(BUILD_TYPE).toBe((() => {
      if (buildEnv === 'debug') {
        return undefined
      } else if (buildType === 'cjs') {
        return BuildType.CJS
      } else if (buildType === 'es') {
        if (buildEnv === 'dev') {
          return BuildType.ES
        } else if (buildEnv === 'prod') {
          return BuildType.MJS
        }
      } else if (buildType === 'umd') {
        if (buildEnv === 'dev') {
          return BuildType.UMD
        } else if (buildEnv === 'prod') {
          return BuildType.UMD_MIN
        }
      } else {
        throw new Error(`Unexpected condition: [buildEnv=${String(buildEnv)}, buildType=${buildType}]`)
      }
    })())
  })
})
