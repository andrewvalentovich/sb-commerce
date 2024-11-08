<script setup lang="ts">
import { useProducts } from "~/stores/products";
import { useCartStore } from "~/stores/cart";
const productStore = useProducts()
const cartStore = useCartStore()

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['showModal'])
const product = computed({
    get() {
        return props.item
    }
})
</script>
<template>
    <div class="w-full py-8 border-b border-gray-200">
        <div class="flex gap-6 relative">
            <div @click="emit('showModal', product)" class="w-[30%] relative">
                <cardPreviewMedia v-if="product.media && product.media[0]" v-model="product.media[0]" />
            </div>
            <div class="w-[70%] flex flex-col">
                <p @click="emit('showModal', product)" class="cursor-pointer text-lg font-bold text-blue-700 dark:text-gray-400">
                    {{ product.price }} ₽
                    <span v-if="product.old_price != product.price" class="pl-1 text-sm font-medium text-gray-500 line-through">
                        {{ product.old_price }} ₽
                    </span>
                </p>
                <div @click="emit('showModal', product)" class="cursor-pointer">
                    <p class="text-md font-middle text-gray-900 dark:text-white">{{ product.name }}</p>
                </div>
                <p class="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">{{ product.description }}</p>
                <p class="mb-4 font-normal text-md text-gray-500 dark:text-gray-400">{{ product.isbn }}</p>
                <cartButton v-model="product" />
            </div>
            <button
                @click="cartStore.remove(product)"
                type="button"
                class="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                title="remove"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
