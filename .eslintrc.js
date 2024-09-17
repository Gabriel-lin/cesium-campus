module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};