<script setup lang="ts">
definePageMeta({
    layout: 'admin-panel',
    middleware: ['auth', 'manager']
})
</script>
<template>
    <NuxtPage/>
</template>
