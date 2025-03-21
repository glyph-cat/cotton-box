// import type { TestConfig } from './tests/test-wrapper'

declare global {

  namespace NodeJS {

    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }

  }

  // namespace jest {
  //   interface Matchers {
  //     toHaveBeenCalledIfNotProdEnv(buildEnv: TestConfig['buildEnv']): CustomMatcherResult
  //   }
  // }

}

export { }
