import { symlinkSync } from 'fs'

function main(): void {
  symlinkSync('./node_modules', './src/packages/core/node_modules')
  symlinkSync('./node_modules', './src/packages/react/node_modules')
}

main()
