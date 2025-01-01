import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

import {resolve} from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    plugins: [
        '~/plugins/auth.ts', // Ensure this plugin is registered first
    ],

    ssr: false, // ssr: false is equivalent to target: 'static' in nuxt 3
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: [resolve(__dirname, './assets/global.css')],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
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
