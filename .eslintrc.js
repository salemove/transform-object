module.exports = {
  parser: 'babel-eslint',
  root: true,
  extends: ['plugin:mocha/recommended', 'plugin:compat/recommended', 'prettier'],
  env: {
    browser: true
  },
  plugins: ['mocha'],
  rules: {
    'mocha/no-mocha-arrows': 'off'
  }
};
