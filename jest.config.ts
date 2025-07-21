import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './frontend',
})

const customJestConfig: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/frontend/jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/frontend/$1',
  },
    testPathIgnorePatterns: ['<rootDir>/backend/'],
}

export default createJestConfig(customJestConfig)