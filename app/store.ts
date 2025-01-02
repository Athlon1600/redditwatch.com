import {reactive} from "vue";
import api from "~/api";
import type {User} from "~/types";

interface AuthStore {
    user: User | null;
    token: string | null;

    [key: string]: any;
}

const state = reactive<AuthStore>({
    token: "",
    error: "",
    user: null,
    isBusy: false,
    returnTo: '',
    counter: 1
});

// https://github.com/matthewsmorrison/fire-dashboard/blob/54638e7ffe9936cd8c852f89c014def5594c2b3f/src/hooks/auth.ts#L22
export function useAuthStore() {

    const isBusy = computed(() => state.isBusy);

    const isLoggedIn = computed(() => state.user !== null);

    const user = computed(() => state.user);

    const getUserFromToken = async (token: string) => {

        state.isBusy = true;

        try {

            await api.getTokenInfo(token).then((data) => {

                console.log(data);

                state.user = data;
            })

        } finally {
            state.isBusy = false;
        }
    }

    // fetch user, update local state
    const updateToken = async (token: string, fetchUser: boolean = true) => {

        localStorage.setItem('token', token);
        state.token = token;

        if (fetchUser) {
            await getUserFromToken(token);
        }
    }

    const loginDemo = async () => {
        const demoToken = "nat_2CbwHQUJLJ1dQQTsIKEst3f3Y1kUYAYbYRWd";
        await updateToken(demoToken, false);

        // if the token above is still valid
        window.location.href = '/alerts';
    }

    const signOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const increment = () => {
        state.counter++;
    }

    const isDemoUser = computed(() => {

        if (state.user !== null) {
            const {email} = state.user;
            return email && email === "demo@redditwatch.com";
        }

        return false;
    })

    const token = computed(() => state.token);

    return {
        state, increment,

        isLoggedIn,
        token,

        isDemoUser,

        updateToken, loginDemo, signOut,
        user, isBusy
    };
}

