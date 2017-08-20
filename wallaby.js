var path = require('path');

var compilerOptions = Object.assign(
  require('./tsconfig.json').compilerOptions,
  require('./src/tsconfig.spec.json').compilerOptions);

module.exports = function (wallaby) {

  return {
    files: [
      { pattern: 'src/**/*.ts' },
      { pattern: 'src/**/*.json' },
      { pattern: 'src/**/*.html' },
      { pattern: 'src/**/*.spec.ts', ignore: true }
    ],

    tests: [
      { pattern: 'src/**/*.spec.ts' }
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },
    debug: true
  };
};
