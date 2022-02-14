module.exports = {
  parser: 'babel-eslint',

  extends: ['airbnb-base', 'prettier', 'plugin:flowtype/recommended'],

  plugins: ['prettier', 'flowtype'],

  rules: {
    semi: ['warn', 'never'],
    'no-console': 'off',
    'no-unused-vars': ['error'],
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'flowtype/no-types-missing-file-annotation': 'off',
    'no-shadow': 'off',
    'global-require': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        semi: false,
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },

  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },

  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    amd: true,
  },
}
