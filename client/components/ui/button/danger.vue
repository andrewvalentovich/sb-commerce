<script setup lang="ts">
const props = defineProps({
    disabled: {
        default: false
    },
    type: {
        default: 'button'
    }
})
</script>
<template>
    <button :disabled="props.disabled" :type="props.type" data-modal-toggle="delete-user-modal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
        <slot/>
    </button>
</template>
