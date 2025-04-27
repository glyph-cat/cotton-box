import chalk from 'chalk'
import { execSync } from 'child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import path from 'path'
import { ENCODING_UTF_8 } from '../../constants'

// What this script does:
// Bumps the versions of the root package along with its sub-packages.

function main(version: string): void {

  if (!version) {
    console.log(chalk.redBright(`Missing argument "${version}"`))
    process.exit(1)
  }

  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    console.log(chalk.redBright(`Invalid version "${version}"`))
    process.exit(1)
  }

  const gitStatusOutput = execSync('git status --porcelain', {
    encoding: ENCODING_UTF_8,
  }).trim()

  if (gitStatusOutput) {
    console.log(chalk.redBright('Cannot bump version when there are uncommitted git changes'))
    process.exit(1)
  }

  const PROPERTY_KEY_VERSION = 'version'
  const PACKAGE_JSON = 'package.json'
  const PACKAGES_PATH = path.join('.', 'src', 'packages')

  const gitPathsToAdd: Array<string> = []

  const rootPackageJsonPath = path.join('.', PACKAGE_JSON)
  const rootPackageJson = readJson(rootPackageJsonPath)
  rootPackageJson[PROPERTY_KEY_VERSION] = version
  writeJson(rootPackageJsonPath, rootPackageJson)
  gitPathsToAdd.push(rootPackageJsonPath)

  const subPackages = readdirSync(PACKAGES_PATH, ENCODING_UTF_8).filter((p) => {
    return statSync(path.join(PACKAGES_PATH, p)).isDirectory()
  })

  for (const subPackage of subPackages) {
    // Check package name for safety
    if (!/^[a-z0-9_-]+$/.test(subPackage)) {
      throw new Error(`Invalid package name "${subPackage}"`)
    }
    const subPackageJsonPath = path.join(PACKAGES_PATH, subPackage, PACKAGE_JSON)
    const subPackageJson = readJson(subPackageJsonPath)
    subPackageJson[PROPERTY_KEY_VERSION] = version
    writeJson(subPackageJsonPath, subPackageJson)
    gitPathsToAdd.push(subPackageJsonPath)
  }

  execSync([
    `git add ${gitPathsToAdd.join(' ')}`,
    `git commit -m 'v${version}'`,
    `git tag 'v${version}'`,
  ].join(' && '))

}

main(process.argv[2])

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, ENCODING_UTF_8))
}

function writeJson(path: string, object: Record<string, unknown>): void {
  writeFileSync(path, JSON.stringify(object, null, 2), ENCODING_UTF_8)
}
