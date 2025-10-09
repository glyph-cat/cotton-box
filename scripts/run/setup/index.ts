import { setup } from '../../tools/setup'

function main(): void {

  const cwd = process.cwd()

  const packages = [
    'core',
    'react',
  ] as const

  for (const packageName in packages) {
    setup(cwd, packageName)
  }

}

main()
