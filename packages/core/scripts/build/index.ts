import { insertDocVariables } from 'cotton-box-repo-tools/insert-doc-variables'
import { spawnAsync, withPrintedOutput } from 'cotton-box-repo-tools/node-extensions'
import { mkdir, rename } from 'node:fs/promises'
import path from 'node:path'

const packageDirectory = process.cwd() // ".../cotton-box/packages/core"

await withPrintedOutput(spawnAsync('rushx', ['clean']))

await withPrintedOutput(
  spawnAsync('rushx', ['bundle']),
  spawnAsync('rushx', ['types']),
)

const [cjsBundle] = await Promise.all([
  import(path.join(packageDirectory, 'lib', 'cjs', 'index.js')),
  mkdir(path.join(packageDirectory, 'temp', 'test-builds')),
  withPrintedOutput(spawnAsync('rushx', ['api'])),
])

await Promise.all([
  insertDocVariables(cjsBundle),
  await rename(
    // Hacky fix to allow testing the minified ES build:
    path.join(packageDirectory, 'lib', 'es', 'index.mjs'),
    path.join(packageDirectory, 'temp', 'test-builds', 'es-min.js'),
  )
])
