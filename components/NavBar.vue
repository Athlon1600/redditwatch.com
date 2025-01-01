<template>
    <v-app-bar app dark border="b" fixed class="px-md-3">

        <v-container class="d-flex justify-space-between align-center" fluid style="max-width: 1200px;">

            <div class="d-flex align-center">
                <NuxtLink to="/">
                    <v-btn class="font-weight-bold text-h6 mr-2 text-primary">
                        <v-icon left class="mr-1">mdi-home</v-icon>
                        RedditWatch.com
                    </v-btn>
                </NuxtLink>
            </div>

            <div class="d-flex align-center nav-right">

                <template v-if="isBusy">
                    Loading...
                </template>

                <template v-else-if="!user">

                    <v-btn color="accent" variant="outlined" class="mr-8" @click="demoClicked">See a demo</v-btn>

                    <v-btn color="primary" class="d-flex align-center" rounded @click="loginClicked">
                        Sign-in
                        <v-icon right class="ml-2">mdi-login</v-icon>
                    </v-btn>
                </template>

                <template v-if="user">

                    <NuxtLink to="/posts">
                        <v-btn small outlined>
                            <v-icon left>mdi-post-outline</v-icon>
                            Posts
                        </v-btn>
                    </NuxtLink>

                    <NuxtLink to="/alerts">
                        <v-btn small>
                            <v-icon left>mdi-bell-outline</v-icon>
                            Alerts
                        </v-btn>
                    </NuxtLink>

                    <NuxtLink to="/settings">
                        <v-btn small>
                            <v-icon left class="mr-1">mdi-cog-outline</v-icon>
                            Settings
                        </v-btn>
                    </NuxtLink>

                    <v-btn small @click.prevent="logoutClicked" class="ml-5">
                        <v-icon left class="mr-1">mdi-logout</v-icon>
                        Logout
                    </v-btn>

                </template>

            </div>

        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store";

const {signOut, loginDemo, user, isBusy} = useAuthStore();

const demoClicked = () => {

    loginDemo().then(() => {
        window.location.href = '/alerts';
    })
}

const loginClicked = () => {
    const homeUrl = window.location.protocol + '//' + window.location.host;
    window.location.href = 'https://account.proxynova.com/login?return=' + encodeURIComponent(homeUrl);
}

const logoutClicked = () => {
    signOut();
    window.location.href = '/';
}

</script>

<style scoped>
.nav-right .router-link-active {
    background-color: #3F51B5;
    color: white;
    text-decoration: none;
}
</style>
