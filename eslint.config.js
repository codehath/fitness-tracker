import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    overrides: [
      {
        // React frontend (client)
        files: ['client/**/*.{ts,tsx}', 'client/**/*.{js,jsx}'],
        languageOptions: {
          ecmaVersion: 2020,
          globals: globals.browser, // Browser-specific globals for the frontend
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
        // Express backend (server)
        files: ['server/**/*.{ts,tsx}', 'server/**/*.{js,jsx}'],
        environment: {
          node: true, // Node.js globals for the backend
        },
        rules: {
          // Define backend-specific rules, if any
        },
      },
    ],
  },
)
