// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import {createVuetify, type VuetifyOptions} from 'vuetify'

const myCustomLightTheme = {
    dark: false,
    colors: {
        muted: '#6c757d',
        // Primary color matches Reddit's orange
        primary: "#FF4500", // Reddit orange
        //    secondary: "#5F99CF",
        // Accent color for small highlights (e.g., light blue links)
        accent: "#24A0ED", // Reddit light blue
        // Background color matches Reddit's clean white look
        background: "#FFFFFF", // White
        // Text and secondary color for subtle tones
        text: "#1A1A1B", // Dark grayish-black for text
        secondary: "#F6F7F8", // Light gray for backgrounds or cards
        error: "#E53935", // Red for errors
        success: "#4CAF50", // Green for success
        warning: "#FFC107", // Yellow for warnings
    }
}

export default defineNuxtPlugin((app) => {

    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'myCustomLightTheme',
            themes: {
                'myCustomLightTheme': myCustomLightTheme
            },
        }
    });

    app.vueApp.use(vuetify)
})
