module.exports = {
    root: true,

    env: {
        node: true,
    },

    plugins: ['unused-imports'],

    parserOptions: {
        ecmaVersion: 2020,
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'unused-imports/no-unused-imports-ts': 2,
    },

    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],

    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard',
        '@vue/typescript/recommended',
        'eslint:recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
};
