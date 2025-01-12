import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import {resolve} from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // https://nuxt.com/docs/getting-started/upgrade#new-directory-structure
    srcDir: 'app',
    serverDir: resolve(__dirname, './server'),
    dir: {
        public: resolve(__dirname, './public')
    },
    plugins: [
        '~/plugins/auth.ts', // Ensure this plugin is registered first
    ],
    typescript: {
        typeCheck: false // must run manually npm run typecheck
    },
    ssr: false, // ssr: false is equivalent to target: 'static' in nuxt 3
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/global.css'],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@nuxt/eslint',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
        //...
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})
