import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        rules: {
            camelcase: ['error', { properties: 'always' }],
            eqeqeq: [2, 'smart'],
            'dot-notation': 'error',
            curly: 'error',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@/*/*/*/*'],
                },
            ],
            'max-params': ['error', 3],
            'no-magic-numbers': [
                'warn',
                {
                    ignore: [-1, 0, 1],
                },
            ],
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
]);
