<template>
    <div style="height: 100%;" class="container mx-auto">

        <h1>Account Info</h1>

        <p>More things will be added to this page soon.</p>

        <v-container>
            <v-row class="mt-5">

                <v-col cols="8">
                    Email:
                    <br>

                    <v-text-field
                            v-model="email"
                            readonly
                            variant="outlined"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-2">

                <v-col cols="8">
                    API Token:
                    <br>

                    <v-text-field
                            v-model="token"
                            readonly
                            variant="outlined"
                            :append-icon="tokenVisible ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="tokenVisible ? 'text' : 'password'"
                            class="input-group--focused"
                            @click:append="tokenVisible = !tokenVisible"
                    ></v-text-field>

                </v-col>
            </v-row>

        </v-container>

    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "~/store";

const {state, token} = useAuthStore();

const email = state.user?.email;

const tokenVisible = ref(false)

</script>

<style scoped>
.container {
    width: 1024px;
}
</style>