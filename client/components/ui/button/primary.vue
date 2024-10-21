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
    <button :disabled="props.disabled" :type="props.type" type="button" data-modal-toggle="add-user-modal" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 disabled:bg-primary-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <slot/>
    </button>
</template>
