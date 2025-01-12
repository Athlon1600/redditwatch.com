<template>
    <div>
        <h1>Hello world!</h1>

        <span id="counter">{{ counter }}</span>

        <button @click="incrementCounter">Increment Counter</button>

    </div>
</template>

<script setup lang="ts">

const counter = ref(0);

const incrementCounter = () => {
    counter.value++;
}

</script>

<style scoped>

</style>