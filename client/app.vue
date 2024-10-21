<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const config = useAppConfig()

onMounted(async () => {
    await nextTick();
    colorMode.preference = 'light';  // or dark
    config.ui.primary = 'blue';
});
</script>
