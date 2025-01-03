import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
    }
});