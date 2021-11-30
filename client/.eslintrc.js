module.exports = {
  extends: ['../.eslintrc-base.json', 'plugin:react/recommended'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', 'jsx'] }],
        'react/function-component-definition': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-curly-brace-presence': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
