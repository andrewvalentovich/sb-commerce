<script setup>
const emit = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    centered: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    noFooter: {
        type: Boolean,
        default: false
    }
});

const close = () => {
    emit('close');
};
</script>

<template>
    <Modal
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        :centered="centered"
        @close="close"
    >
        <div class="relative px-6 py-4">
<!--            <button-->
<!--                @click="close()"-->
<!--                class="absolute top-[5px] right-[5px] shadow-none border-0 w-[34px] h-[34px] flex items-center justify-center z-[40] bg-gray-400 bg-opacity-70 hover:bg-opacity-90 rounded-full cursor-pointer transition duration-150 ease-out"-->
<!--                title="Close"-->
<!--            >-->
<!--                <svg class="fill-white stroke-white stroke-2 w-[22px] h-[22px] outline-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1">-->
<!--                    <path d="M20 20L4 4m16 0L4 20"></path>-->
<!--                </svg>-->
<!--            </button>-->
            <button
                @click="close()"
                type="button" class="absolute top-[5px] right-[5px] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                title="Close"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <slot name="title" />

            <div class="mt-4">
                <slot name="content" />
            </div>
            <slot v-if="!noFooter" name="footer" />
        </div>
    </Modal>
</template>
