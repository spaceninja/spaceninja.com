module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
