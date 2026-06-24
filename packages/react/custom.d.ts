import { type ICustomTestSpec } from 'cotton-box-repo-tools/test-abstractions'
import 'jest'
import 'jest-extended'

declare global {

  namespace jest {

    interface Matchers<R> {
      toShareObjectReferenceWith(expected: unknown): R
      toHaveBeenCalledOnceInDevelopment(): R
    }

  }

  namespace NodeJS {

    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      IS_INTERNAL_DEBUG_ENV?: 'false'
    }

  }

  export const __CUSTOM_TEST_SPEC: ICustomTestSpec

}

export { }
