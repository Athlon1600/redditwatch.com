import {useAuthStore} from "~/store";

const tokenValidate = (token: string): boolean => {
    return token.match(/^[a-z0-9_]+$/i) !== null;
}

const tokenFromUrl = (url: string): string | null => {
    const matches = url.match(/access_token=([a-z0-9_]+)/i);
    return matches !== null ? matches[1] : null;
}

export default defineNuxtRouteMiddleware(async (to, from) => {

    const fullPath = to.fullPath;

    // fragments do not get stored in user history
    const token = tokenFromUrl(fullPath);

    if (token) {
        console.log(`Access token found: ${token}`);

        // XSS attacks?
        if (tokenValidate(token)) {
            await useAuthStore().updateToken(token, false);

            // TODO: must be a better way
            window.location.href = '/alerts';

            return false;
        }
    }

    return true;
});
