import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { version as ROOT_PACKAGE_VERSION } from '../../package.json'
import { ENCODING_UTF_8 } from '../constants'

// What this script does:
// Updates the version of each subpackage to match the project root's version.

const subPackages = readdirSync('./packages', ENCODING_UTF_8).filter((p) => {
  return statSync(`./packages/${p}`).isDirectory()
})

for (const subPackage of subPackages) {
  const subPackageJSONPath = `./packages/${subPackage}/package.json`
  const lines = readFileSync(subPackageJSONPath, ENCODING_UTF_8).split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (/^\s+"version"/.test(lines[i])) {
      lines[i] = `  "version": "${ROOT_PACKAGE_VERSION}",`
      continue
    }
  }
  writeFileSync(subPackageJSONPath, lines.join('\n'), ENCODING_UTF_8)
}
