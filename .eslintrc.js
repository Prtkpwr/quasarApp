module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'import'
  ],
  globals: {
    'cordova': true,
    'DEV': true,
    'PROD': true,
    '__THEME': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
 
  }
}
