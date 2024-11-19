import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended',
    ],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
    overrides: [
      {
        files: ['client/**/*.{ts,tsx}', 'client/**/*.{js,jsx}'],
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'module', // Specify ES module for client
          globals: globals.browser,
        },
        plugins: {
          'react-hooks': reactHooks,
          'react-refresh': reactRefresh,
        },
        rules: {
          ...reactHooks.configs.recommended.rules,
          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
        },
      },
      {
        files: ['server/**/*.{ts,tsx}', 'server/**/*.{js,jsx}'],
        languageOptions: {
          ecmaVersion: 2020,
          sourceType: 'script', // Specify CommonJS for server
          globals: globals.node,
        },
        rules: {
          // Backend-specific rules here
        },
      },
    ],
  }
)
