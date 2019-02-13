module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  testRegex: '/(test|src)/.*\\.(test)\\.(tsx?)$',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
};
