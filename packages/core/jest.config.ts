import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: [
    'jest-extended/all',
    '<rootDir>/jest.post-env-setup.ts',
  ],
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
  testRegex: '.test.ts',
  testTimeout: 1000,
  // verbose: true,
}

export default config
