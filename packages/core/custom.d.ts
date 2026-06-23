import { type ICustomTestSpec } from 'cotton-box-repo-tools/test-abstractions'
import 'jest'
import 'jest-extended'

declare global {

  namespace jest {

    interface Matchers<R> {
      toHaveBeenCalledOnceInProduction(): R
    }

  }

  namespace NodeJS {

    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }

  }

  export const __CUSTOM_TEST_SPEC: ICustomTestSpec

}

export { }
