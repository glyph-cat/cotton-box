import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  testPathIgnorePatterns: [
    '.draft',
    '.old',
  ],
  testTimeout: 1000,
  fakeTimers: {
    enableGlobally: true,
  },
  testRegex: '.test.(tsx|ts)',
  // verbose: true,
}

export default config
