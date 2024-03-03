module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-typescript/base'],
  parser: '@typescript-eslint/parser',
  
  parserOptions: {
    project: 'tsconfig.json',
    files: ['*.ts'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],

  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
};
