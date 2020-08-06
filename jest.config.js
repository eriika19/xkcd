const { defaults } = require('jest-config');

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'svg'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^store(.*)$': '<rootDir>/store$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^jest-factories(.*)$': '<rootDir>/jest/factories$1',
    '^jest-utils(.*)$': '<rootDir>/jest/utils$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/*.{js,jsx}',
    '!pages/_app.js',
    '!store/*.{js,jsx}',
    '!store/*/**.{js,jsx}',
    '!*/**/index.js',
  ],
};
