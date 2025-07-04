// This is a patch so that eslint will load the plugins as dependencies. Otherwise we can to install EVERYTHING in th root project
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['airbnb', 'prettier'],
    parserOptions: {
        ecmaVersion: '2020',
    },
    env: {
        browser: true,
        node: true,
        jquery: true,
        jest: true,
    },
    rules: {
        'no-debugger': 0,
        'no-use-before-define': 'off',
        'import/no-cycle': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 0,
        'no-await-in-loop': 0,
        'no-return-assign': ['error', 'except-parens'],
        'no-restricted-syntax': [
            2,
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'no-unused-vars': [
            1,
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: 'res|next|^err|^_',
                varsIgnorePattern: '^_',
                // Broken in TypeSCript.Want this turned on
                // destructuredArrayIgnorePattern: '^_',
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        'arrow-body-style': [2, 'as-needed'],
        'no-unused-expressions': [
            'error',
            {
                allowTaggedTemplates: true,
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        'no-param-reassign': [
            2,
            {
                props: false,
            },
        ],
        'no-console': 0,
        'import/prefer-default-export': 0,
        import: 0,
        'func-names': 0,
        'space-before-function-paren': 0,
        'comma-dangle': 0,
        'max-len': 0,
        'import/extensions': 0,
        'no-underscore-dangle': 0,
        'consistent-return': 0,
        'react/display-name': 1,
        'react/no-array-index-key': 0,
        'react/react-in-jsx-scope': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/no-unescaped-entities': 0,
        'react/function-component-definition': 0,
        'jsx-a11y/accessible-emoji': 0,
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                assert: 'either',
            },
        ],
        'react/require-default-props': 0,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
            },
        ],
        radix: 0,
        'no-shadow': [
            2,
            {
                hoist: 'all',
                allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
            },
        ],
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                endOfLine: 'auto',
            },
        ],
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/anchor-is-valid': [
            'warn',
            {
                aspects: ['invalidHref'],
            },
        ],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/button-has-type': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/comma-dangle': ['off'],
        'react/jsx-props-no-spreading': 'off',
    },
    plugins: ['html', 'prettier', 'react-hooks'],
};
