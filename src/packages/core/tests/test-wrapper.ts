/* eslint-disable import/no-unresolved */
import * as cjsLib from '../lib/cjs/index.js'
import * as esLib from '../lib/es/index.js'
import * as umdLib from '../lib/umd/index.js'
import * as umdMinLib from '../lib/umd/index.min.js'
import * as debugLib from '../src'
// import * as esMinLib from '../temp/test-builds/es-min.js'
/* eslint-enable import/no-unresolved */

// import * as esMinLib from '../lib/es/index.mjs'
// KIV: [Low priority] Not sure why, but if '.mjs' extension is used, we will get:
// "SyntaxError: Cannot use import statement outside a module"
// May be a better solution would be to use `import` statement?
// (require is incompatible when using `--experimental-vm-modules`)
// Ref: https://github.com/rdkcentral/firebolt-apis/issues/36#issuecomment-1161896170
// yarn node --experimental-vm-modules node_modules/jest/bin/jest.js -c ./jest.config.ts
// Ref: https://jestjs.io/docs/ecmascript-modules
// yarn node --experimental-vm-modules $(yarn bin jest) -c ./jest.config.ts

export interface TestConfig {
  buildType: 'cjs' | 'es' | 'umd'
  buildEnv: 'debug' | 'dev' | 'prod'
  description: string
  Lib: typeof debugLib
}

const SCOPE = process.env.scope
const DEBUG_BUILDS: Array<TestConfig> = [
  {
    buildEnv: 'debug',
    buildType: 'cjs',
    description: 'Debug',
    Lib: debugLib,
  },
]
const BUNDLED_BUILDS: Array<TestConfig> = [
  {
    buildEnv: 'dev',
    buildType: 'cjs',
    description: 'CJS',
    Lib: cjsLib,
  },
  {
    buildEnv: 'dev',
    buildType: 'es',
    description: 'EcmaScript',
    Lib: esLib,
  },
  // {
  //   buildEnv: 'prod',
  //   buildType: 'es',
  //   description: 'EcmaScript (Minified)',
  //   Lib: esMinLib,
  // },
  {
    buildEnv: 'dev',
    buildType: 'umd',
    description: 'UMD',
    Lib: umdLib,
  },
  {
    buildEnv: 'prod',
    buildType: 'umd',
    description: 'UMD (Minified)',
    Lib: umdMinLib,
  },
]

const testConfigStack: Array<TestConfig> = []
if (!SCOPE || SCOPE === 'debug') {
  testConfigStack.push(...DEBUG_BUILDS)
}
if (!SCOPE || SCOPE === 'bundled') {
  testConfigStack.push(...BUNDLED_BUILDS)
}

export function wrapper(
  executor: ((cfg: TestConfig) => void)
): void {
  for (const testConfig of testConfigStack) {
    describe(testConfig.description, (): void => {
      executor(testConfig)
    })
  }
}
