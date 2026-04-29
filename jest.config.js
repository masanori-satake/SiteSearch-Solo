module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['projects/app/**/*.js'],
  testPathIgnorePatterns: ['/tests/e2e/'],
};
