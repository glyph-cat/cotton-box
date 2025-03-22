import chalk from 'chalk'
import { symlinkSync } from 'fs'

function main(): void {

  const cwd = process.cwd()

  linkNodeModules(cwd, 'core')
  linkNodeModules(cwd, 'react')

}

main()

function linkNodeModules(cwd: string, packageName: 'core' | 'react'): void {
  const node_modules = 'node_modules'
  try {
    symlinkSync(`${cwd}/${node_modules}`, `${cwd}/src/packages/${packageName}/node_modules`)
    console.log(chalk.green(' ✓ ') + `Linked ${node_modules} to ${packageName} package`)
  } catch (e) {
    console.log(chalk.red(' × ') + `Failed to link ${node_modules} to ${packageName} package`)
    console.error(e)
  }
}