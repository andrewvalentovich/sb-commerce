<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="w-full relative pt-[80%]">
        <img class="absolute w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 object-contain" :src="modelValue.thumb_url" alt="preview">
    </div>
</template>
