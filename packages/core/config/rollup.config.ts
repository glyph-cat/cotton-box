import { BuildType } from '@glyph-cat/foundation'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { execSync } from 'node:child_process'
import { RollupOptions, Plugin as RollupPlugin } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'

const NODE_RESOLVE_EXTENSIONS = [
  '.ts',
  '.js',
]

const UMD_GLOBALS = {
  '@glyph-cat/foundation': 'GCFoundation',
  '@glyph-cat/type-checking': 'GCTypeChecking',
}

const EXTERNAL_LIBS = Object.keys(UMD_GLOBALS)

const INPUT_FILE = './src/index.ts'

const UMD_NAME = 'CottonBox'

interface IPluginConfig {
  mode?: 'development' | 'production'
  buildType: BuildType
}

function getPlugins(config: IPluginConfig): Array<RollupPlugin> {
  const { mode, buildType } = config

  const pluginStack: Array<RollupPlugin> = [
    nodeResolve({
      extensions: NODE_RESOLVE_EXTENSIONS,
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.BUILD_HASH': JSON.stringify(
          `${execSync('git rev-parse --short HEAD').toString().trim()}-${Date.now().toString(16)}`
        ),
        'process.env.BUILD_TYPE': JSON.stringify(buildType),
        'process.env.IS_INTERNAL_DEBUG_ENV': JSON.stringify('false'),
        'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
        'process.env.REPORT_ISSUE_URL': JSON.stringify(pkg.bugs.url),
        ...(mode && { 'process.env.NODE_ENV': JSON.stringify(mode) }),
      },
    }),
    terser({
      mangle: {
        properties: {
          regex: /^M\$/,
        },
      },
    }),
  ]

  return pluginStack
}

const config: Array<RollupOptions> = [
  {
    // CommonJS
    input: INPUT_FILE,
    output: {
      file: './lib/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    external: EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: BuildType.CJS,
    }),
  },
  {
    // EcmaScript
    input: INPUT_FILE,
    output: {
      file: './lib/es/index.js',
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
    external: EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: BuildType.ES,
    }),
  },
  {
    // EcmaScript (Minified)
    input: INPUT_FILE,
    output: {
      file: './lib/es/index.mjs',
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
    external: EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: BuildType.MJS,
      mode: 'production',
    }),
  },
  {
    // UMD
    input: INPUT_FILE,
    output: {
      file: './lib/umd/index.js',
      format: 'umd',
      name: UMD_NAME,
      exports: 'named',
      globals: UMD_GLOBALS,
      sourcemap: false,
    },
    external: EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: BuildType.UMD,
      mode: 'development',
    }),
  },
  {
    // UMD (Minified)
    input: INPUT_FILE,
    output: {
      file: './lib/umd/index.min.js',
      format: 'umd',
      name: UMD_NAME,
      exports: 'named',
      globals: UMD_GLOBALS,
      sourcemap: false,
    },
    external: EXTERNAL_LIBS,
    plugins: getPlugins({
      buildType: BuildType.UMD_MIN,
      mode: 'production',
    }),
  },
]

export default config
