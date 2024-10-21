<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    zIndex: {
        type: Number,
        default: 1055,
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    centered: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close']);

watch(() => props.show, () => {
    if (props.show) {
        // document.body.style.overflow = 'hidden';
        bodyFixed()
    } else {
        // document.body.style.overflow = null;
        bodyNotFixed()
    }
});

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        'sm': 'sm:max-w-sm',
        'md': 'sm:max-w-md',
        'lg': 'sm:max-w-lg',
        'xl': 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '1100px': 'sm:max-w-[1100px]'
    }[props.maxWidth];
});
</script>

<template>
    <teleport to="body">
<!--        <transition leave-active-class="duration-200">-->
<!--            <div-->
<!--                v-show="show"-->
<!--                class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-40"-->
<!--                scroll-region-->
<!--                :class="{'flex justify-center items-center': centered }"-->
<!--            >-->
<!--                <transition-->
<!--                    enter-active-class="ease-out duration-300"-->
<!--                    enter-from-class="opacity-0"-->
<!--                    enter-to-class="opacity-100"-->
<!--                    leave-active-class="ease-in duration-200"-->
<!--                    leave-from-class="opacity-100"-->
<!--                    leave-to-class="opacity-0"-->
<!--                >-->
<!--                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">-->
<!--                        <div class="absolute inset-0 bg-gray-500 opacity-75" />-->
<!--                    </div>-->
<!--                </transition>-->

<!--                <transition-->
<!--                    enter-active-class="ease-out duration-300"-->
<!--                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"-->
<!--                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"-->
<!--                    leave-active-class="ease-in duration-200"-->
<!--                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"-->
<!--                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"-->
<!--                >-->
<!--                    <div-->
<!--                        :class="maxWidthClass"-->
<!--                        v-show="show" class="mb-6 bg-white rounded-lg max-h-[90vh] overflow-auto shadow-xl transform transition-all sm:w-full sm:mx-auto"-->
<!--                    >-->
<!--                        <slot v-if="show" />-->
<!--                    </div>-->
<!--                </transition>-->
<!--            </div>-->
<!--        </transition>-->

        <transition
            leave-active-class="ease-in duration-200"
        >
            <div
                class="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto outline-none transition duration-150 linear z-50"
                :class="[
                    show ? '' : 'hidden',
                ]"
                tabindex="-1"
                @click="close()"
            >
                <div
                    class="transition duration-300 ease-out mx-auto w-auto relative rounded-lg bg-white mt-4"
                    :class="maxWidthClass"
                    @click.stop
                >
                        <slot v-if="show" />
                </div>
            </div>
        </transition>
        <transition
            leave-active-class="ease-in duration-200"
        >
            <div
                v-show="show"
                class="bg-[#000] fixed top-0 left-0 w-screen h-screen transition duration-150 linear z-40"
                :class="[show ? 'bg-opacity-50' : 'bg-opacity-0']"
                @click="close()"
            ></div>
        </transition>
    </teleport>
</template>
