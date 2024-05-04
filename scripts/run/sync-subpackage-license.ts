import { copyFileSync } from 'fs'

// TODO: [very low priority] Convert to bash script?

const [, , packageName] = process.argv
if (!packageName) { throw new Error('Package name not specified') }

copyFileSync('./LICENSE', `./packages/${packageName}/LICENSE`)
