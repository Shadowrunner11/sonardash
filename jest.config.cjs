/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': '@swc/jest',
  },
  transformIgnorePatterns: [ './node_modules/' ],
};
