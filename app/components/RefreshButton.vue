<template>
    <v-btn icon flat
           @click=""
           color="accent"
           class="square-button"
           :loading="loading"
           :disabled="loading"
    >
        <v-icon>mdi-refresh</v-icon>
    </v-btn>
</template>

<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        required: false,
    },
    click: {
        type: Function,
        required: false,
    },
});

</script>

<style scoped>
.square-button {
    width: 40px;
    height: 40px;

    /*    display: flex;
        justify-content: center;
        align-items: center;*/
}
</style>