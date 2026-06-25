import { BuildType } from '@glyph-cat/foundation'
import { Config } from '@jest/types'

// KIV
// Error: Jest: Failed to parse the TypeScript config file .../cotton-box/packages/core/jest.config.ts
//   Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '.../cotton-box/packages/core/node_modules/cotton-box-repo-tools/test-abstractions' is not supported resolving ES modules imported from .../cotton-box/packages/core/jest.config.ts
// import { type ICustomTestSpec } from 'cotton-box-repo-tools/test-abstractions'
export interface ICustomTestSpec {
  BUILD_TYPE?: string
  BUNDLE_TYPE: 'debugging' | 'development' | 'production'
}

const SCOPE = process.env.SCOPE

const BASE_SHARED_CONFIGS: Config.InitialOptions = {
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: [
    'jest-extended/all',
    '<rootDir>/jest.post-env-setup.ts',
  ],
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
  testRegex: '.test.ts',
  testTimeout: 1000,
  verbose: true,
}

const SHARED_CONFIGS_FOR_BUNDLES: Config.InitialOptions = {
  ...BASE_SHARED_CONFIGS,
  testPathIgnorePatterns: [
    ...BASE_SHARED_CONFIGS.testPathIgnorePatterns!,
    './src/',
  ],
}

const config: Config.InitialOptions = {
  ...BASE_SHARED_CONFIGS,
  projects: [
    ...(!SCOPE || SCOPE === 'debug' ? [{
      ...BASE_SHARED_CONFIGS,
      displayName: 'SRC',
      globals: {
        __CUSTOM_TEST_SPEC: {
          BUNDLE_TYPE: 'debugging',
        } satisfies ICustomTestSpec,
      },
      moduleNameMapper: {
        '^cotton-box$': '<rootDir>/src/index.ts',
      },
    }] : []),
    ...(!SCOPE || SCOPE === 'bundled' ? [
      {
        ...SHARED_CONFIGS_FOR_BUNDLES,
        displayName: 'CJS',
        globals: {
          __CUSTOM_TEST_SPEC: {
            BUILD_TYPE: BuildType.CJS,
            BUNDLE_TYPE: 'development',
          } satisfies ICustomTestSpec,
        },
        moduleNameMapper: {
          '^cotton-box$': '<rootDir>/dist/cjs/index.js',
        },
      },
      {
        ...SHARED_CONFIGS_FOR_BUNDLES,
        displayName: 'ES',
        globals: {
          __CUSTOM_TEST_SPEC: {
            BUILD_TYPE: BuildType.ES,
            BUNDLE_TYPE: 'development',
          } satisfies ICustomTestSpec,
        },
        moduleNameMapper: {
          '^cotton-box$': '<rootDir>/dist/es/index.js',
        },
      },
      {
        ...SHARED_CONFIGS_FOR_BUNDLES,
        displayName: 'ES (min)',
        globals: {
          __CUSTOM_TEST_SPEC: {
            BUILD_TYPE: BuildType.MJS,
            BUNDLE_TYPE: 'production',
          } satisfies ICustomTestSpec,
        },
        moduleNameMapper: {
          '^cotton-box$': '<rootDir>/temp/test-builds/es-min.js',
        },
      },
      {
        ...SHARED_CONFIGS_FOR_BUNDLES,
        displayName: 'UMD',
        globals: {
          __CUSTOM_TEST_SPEC: {
            BUILD_TYPE: BuildType.UMD,
            BUNDLE_TYPE: 'development',
          } satisfies ICustomTestSpec,
        },
        moduleNameMapper: {
          '^cotton-box$': '<rootDir>/dist/umd/index.js',
        },
      },
      {
        ...SHARED_CONFIGS_FOR_BUNDLES,
        displayName: 'UMD (min)',
        globals: {
          __CUSTOM_TEST_SPEC: {
            BUILD_TYPE: BuildType.UMD_MIN,
            BUNDLE_TYPE: 'production',
          } satisfies ICustomTestSpec,
        },
        moduleNameMapper: {
          '^cotton-box$': '<rootDir>/dist/umd/index.min.js',
        },
      },
    ] : []),
  ],
}

export default config
