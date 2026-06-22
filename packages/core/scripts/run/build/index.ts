import { insertDocVariables } from 'cotton-box-repo-tools/insert-doc-variables'
import { customSpawn } from 'cotton-box-repo-tools/node-extensions'
import { mkdir, rename, rm } from 'node:fs/promises'
import path from 'node:path'

(async function main() {
  const packageDirectory = process.cwd() // ".../cotton-box/packages/core"
  await rm('./lib', { recursive: true, force: true })
  await rm('./temp', { recursive: true, force: true })
  await customSpawn('rushx', ['bundle'])
  await customSpawn('rushx', ['types'])
  await customSpawn('rushx', ['api'])
  await insertDocVariables()
  await mkdir(path.join(packageDirectory, 'temp', 'test-builds'))
  await rename(
    // Hacky fix to allow testing the minified ES build:
    path.join(packageDirectory, 'lib', 'es', 'index.mjs'),
    path.join(packageDirectory, 'temp', 'test-builds', 'es-min.js'),
  )
})()
