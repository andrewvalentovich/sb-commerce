<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const open = ref(false)
</script>
<template>
    <div class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
            <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" @click="open = !open">
                <span class="font-medium text-gray-900">{{ text }}</span>
                <span class="ml-6 flex items-center">
                    <svg v-show="!open" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                    </svg>
                    <svg v-show="open" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clip-rule="evenodd"></path>
                    </svg>
                </span>
            </button>
        </h3>
<!--        <transition-->
<!--            enter-active-class="transition ease-out duration-200"-->
<!--            enter-from-class="transform opacity-0 translate-y-[-20%]"-->
<!--            enter-to-class="transform opacity-100 translate-y-[0]"-->
<!--            leave-active-class="transition ease-in duration-75"-->
<!--            leave-from-class="transform opacity-100 translate-y-[-20%]"-->
<!--            leave-to-class="transform opacity-0 translate-y-[0]"-->
<!--        >-->
            <div class="pt-6" v-show="open">
                <slot name="content" />
            </div>
<!--        </transition>-->
    </div>
</template>
