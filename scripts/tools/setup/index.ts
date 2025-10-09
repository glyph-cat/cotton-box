import chalk from 'chalk'
import { symlinkSync } from 'fs'

export function setup(cwd: string, packageName: string): void {
  const node_modules = 'node_modules'
  try {
    symlinkSync(`${cwd}/${node_modules}`, `${cwd}/src/packages/${packageName}/node_modules`)
    console.log(chalk.green(' ✓ ') + `Linked ${node_modules} to ${packageName} package`)
  } catch (e) {
    console.log(chalk.red(' × ') + `Failed to link ${node_modules} to ${packageName} package`)
    console.error(e)
  }
}
