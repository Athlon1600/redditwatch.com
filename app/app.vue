<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    meta: [
        {name: 'author', content: 'ProxyNova'},
    ]
})

</script>