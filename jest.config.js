module.exports = {
  projects: [
    '<rootDir>/customers/api',
    '<rootDir>/customers/frontend',
    '<rootDir>/managers/api',
    '<rootDir>/managers/frontend',
    '<rootDir>/admin/dashboard',
    '<rootDir>/shared/utils',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/dist/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
