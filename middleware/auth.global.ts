import {useAuthStore} from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {

    if (process.server) return;

    const destination = to.path;
    console.log(`New destination: ${destination}`);

    const {state} = useAuthStore();

    // protected routes
    if (destination.startsWith('/posts') || destination.startsWith('/alerts') || destination.startsWith('/settings')) {
        console.log('Trying to access protected routes');

        if (state.user == null) {
            return abortNavigation("You must be logged in to access this page");
        }
    }

    return true;
});