<template>
    <v-app>

        <nav-bar></nav-bar>

        <div class="fill-height px-5 mt-8">

            <v-alert
                    v-if="isDemoUser"
                    border="top"
                    type="info"
                    variant="outlined"
                    class="mb-8"
            >
                You are logged in as a <strong>Guest</strong>, so you will not be able make any changes to this account.

                If you want your own personal tracker,
                <a href="https://account.proxynova.com" target="_blank" class="font-weight-bold">create an account</a>
                first.
            </v-alert>

            <NuxtPage/>
        </div>

        <Footer></Footer>

    </v-app>
</template>
<script setup lang="ts">
import {useAuthStore} from "~/store";

const {isDemoUser} = useAuthStore();

</script>

<style>

.fill-height {

    padding-top: calc(64px + 5px);

    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    /*    justify-content: center;*/
    align-items: stretch;
}
</style>