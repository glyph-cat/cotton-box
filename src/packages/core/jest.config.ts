import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  setupFilesAfterEnv: [
    'jest-extended/all',
    '<rootDir>/jest.post-env-setup.ts',
  ],
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
  testTimeout: 1000,
  fakeTimers: {
    enableGlobally: true,
  },
  testRegex: '.test.tsx?',
  // verbose: true,
}

export default config
