<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { onlyNumber } from "~/utils/validator";

const cartStore = useCartStore()
const props = defineProps({
    modelValue: {
        required: true
    }
})

const emit = defineEmits(['onDelete'])

const item = computed({
    get() {
        return cartStore.getItem(props.modelValue)
    },
})
</script>
<template>
    <div v-if="item" class="flex gap-1">
        <div class="inline-flex items-center justify-center h-[34px] box-border border border-blue-700 rounded-lg">
            <button @click="cartStore.decrease(item)" class="px-2 py-2 group/decrease">
                <svg class="h-5 w-5 hover:fill-blue-700 fill-gray-700 transition-all" viewBox="0 0 20 20" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clip-rule="evenodd"></path>
                </svg>
            </button>
            <input class="text-center bg-inherit h-full ring-0 text-gray-700 outline-none w-14 border-x border-gray-200 px-2" type="text" @keypress="onlyNumber" v-model="item.quantity">
            <button @click="cartStore.increase(item)" class="px-2 py-2 group/increase">
                <svg class="h-5 w-5 hover:fill-blue-700 fill-gray-700 transition-all" viewBox="0 0 20 20" aria-hidden="true" data-slot="icon">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                </svg>
            </button>
        </div>
        <uiButtonDanger @click="cartStore.remove(modelValue); emit('onDelete')">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        </uiButtonDanger>
    </div>
    <button v-else @click="cartStore.add(modelValue)" type="button" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 disabled:bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Добавить в корзину
    </button>
</template>
