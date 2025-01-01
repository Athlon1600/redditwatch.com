<template>
    <div>
        <div class="text-center mt-12">

            <h1 class="text-red">Error</h1>
            <p>{{ error }}</p>

            <p>
                <a href="/">Go back home</a>
            </p>

        </div>
    </div>
</template>

<script setup lang="ts">

const error = useError();

useHead({
    title: 'Error - RedditWatch'
});

</script>

<style scoped>

</style>