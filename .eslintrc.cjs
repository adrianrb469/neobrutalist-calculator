module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: 'off',
    'comma-dangle': ['error', 'never'],
    'linebreak-style': 'off'
  }
}
