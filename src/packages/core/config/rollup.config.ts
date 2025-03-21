import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { execSync } from 'child_process'
import { RollupOptions, Plugin as RollupPlugin } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
import { BuildType } from '../src/constants'

const INPUT_FILE = 'src/index.ts'

const UMD_NAME = 'CottonBox'

interface IPluginConfig {
  overrides?: Record<string, unknown>
  mode?: 'development' | 'production'
  buildType: BuildType
}

function getPlugins(config: IPluginConfig): Array<RollupPlugin> {
  const { overrides = {}, mode, buildType } = config
  const basePlugins = {
    nodeResolve: nodeResolve({
      extensions: ['.ts'],
    }),
    typescript: typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          declarationDir: null,
          outDir: null,
        },
        exclude: [
          './src/**/*.test*',
        ],
      },
    }),
    commonjs: commonjs(),
  }

  // Override plugins
  for (const overrideKey in overrides) {
    basePlugins[overrideKey] = overrides[overrideKey]
  }

  // Convert plugins object to array
  const pluginStack: Array<RollupPlugin> = []
  for (const i in basePlugins) {
    // Allows plugins to be excluded by replacing them with falsy values
    if (basePlugins[i]) {
      pluginStack.push(basePlugins[i])
    }
  }

  // Replace values
  const replaceValues = {
    'process.env.BUILD_HASH': JSON.stringify(
      execSync('git rev-parse HEAD').toString().trim()
    ),
    'process.env.BUILD_TYPE': JSON.stringify(buildType),
    'process.env.IS_INTERNAL_DEBUG_ENV': JSON.stringify('false'),
    'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
    'process.env.REPORT_ISSUE_URL': JSON.stringify(pkg.bugs.url),
  }
  if (mode) {
    replaceValues['process.env.NODE_ENV'] = JSON.stringify(mode)
  }
  pluginStack.push(replace({
    preventAssignment: true,
    values: replaceValues,
  }))
  if (mode === 'production') {
    pluginStack.push(terser({
      mangle: {
        properties: {
          regex: /^M\$/,
        },
      },
    }))
  }

  return pluginStack
}

const config: Array<RollupOptions> = [
  {
    // CommonJS
    input: INPUT_FILE,
    output: {
      file: 'lib/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
    },
    plugins: getPlugins({
      buildType: BuildType.CJS,
    }),
  },
  {
    // EcmaScript
    input: INPUT_FILE,
    output: {
      file: 'lib/es/index.js',
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
    plugins: getPlugins({
      buildType: BuildType.ES,
    }),
  },
  {
    // EcmaScript (Minified)
    input: INPUT_FILE,
    output: {
      file: 'lib/es/index.mjs',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: getPlugins({
      buildType: BuildType.MJS,
      mode: 'production',
    }),
  },
  {
    // UMD
    input: INPUT_FILE,
    output: {
      file: 'lib/umd/index.js',
      format: 'umd',
      name: UMD_NAME,
      exports: 'named',
      sourcemap: false,
    },
    plugins: getPlugins({
      buildType: BuildType.UMD,
      mode: 'development',
    }),
  },
  {
    // UMD (Minified)
    input: INPUT_FILE,
    output: {
      file: 'lib/umd/index.min.js',
      format: 'umd',
      name: UMD_NAME,
      exports: 'named',
      sourcemap: true,
    },
    plugins: getPlugins({
      buildType: BuildType.UMD_MIN,
      mode: 'production',
    }),
  },
]

export default config
