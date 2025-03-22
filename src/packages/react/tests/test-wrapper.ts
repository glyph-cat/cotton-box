import * as __debugLib__ from 'cotton-box'
import * as __debugReactLib__ from '../src'
// import * as __cjsLib__ from 'cotton-box-lib/cjs/index.js'
// import * as __cjsReactLib__ from '../lib/cjs/index.js'
// import * as __esLib__ from 'cotton-box/lib/es/index.js'
// import * as __esReactLib__ from '../lib/es/index.js'
// import * as __umdLib__ from 'cotton-box/lib/umd/index.js'
// import * as __umdMinLib__ from 'cotton-box/lib/umd/index.min.js'
// import * as __umdReactLib__ from '../lib/umd/index.js'
// import * as __umdMinReactLib__ from '../lib/umd/index.min.js'

export interface TestConfig {
  buildType: 'cjs' | 'es' | 'umd'
  buildEnv: 'debug' | 'dev' | 'prod'
  description: string
  Lib: typeof __debugLib__
  ReactLib: typeof __debugReactLib__
}

const SCOPE = process.env.scope
const DEBUG_BUILDS: Array<TestConfig> = [
  {
    buildEnv: 'debug',
    buildType: 'cjs',
    description: 'Debug',
    Lib: __debugLib__,
    ReactLib: __debugReactLib__,
  },
]
const BUNDLED_BUILDS: Array<TestConfig> = [
  // {
  //   buildEnv: 'dev',
  //   buildType: 'cjs',
  //   description: 'CJS',
  //   Lib: __cjsLib__,
  //   ReactLib: __cjsReactLib__,
  // },
  // TOFIX: [Low priority] SyntaxError: Unexpected token 'export'
  // {
  //   buildEnv: 'dev',
  //   buildType: 'es',
  //   description: 'EcmaScript',
  //   Lib: __esLib__,
  //   ReactLib: __esReactLib__,
  // },
  // TOFIX: [Low priority] SyntaxError: Cannot use import statement outside a module
  // {
  //   buildEnv: 'prod',
  //   buildType: 'es',
  //   description: 'EcmaScript (Minified)',
  //   Lib: require('cotton-box/lib/es/index.mjs'),
  //   ReactLib: require('../temp/test-builds/es-min.js'),
  // },
  // {
  //   buildEnv: 'dev',
  //   buildType: 'umd',
  //   description: 'UMD',
  //   Lib: __umdLib__,
  //   ReactLib: __umdReactLib__,
  // },
  // {
  //   buildEnv: 'prod',
  //   buildType: 'umd',
  //   description: 'UMD (Minified)',
  //   Lib: __umdMinLib__,
  //   ReactLib: __umdMinReactLib__,
  // },
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
