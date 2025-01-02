import {useAuthStore} from "~/store";

export default defineNuxtPlugin(async (nuxtApp) => {

    const token = localStorage.getItem('token');
    console.log(`Token in storage: ${token}`);

    if (token) {
        await useAuthStore().updateToken(token);
    }

})
