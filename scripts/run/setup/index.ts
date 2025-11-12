import { setup } from '../../tools/setup'

function main(): void {

  const cwd = process.cwd()

  const packages = [
    'core',
    'react',
    'playground-expo',
  ] as const

  for (const packageName of packages) {
    setup(cwd, packageName)
  }

}

main()
