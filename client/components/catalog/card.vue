<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['showModal'])
const product = ref<models.Product>(props.item)
</script>
<template>
    <div class="rounded-lg">
        <div @click="emit('showModal', product)" class="rounded-t-lg overflow-hidden relative">
            <div class="absolute p-2 max-w-full w-full flex flex-wrap gap-1 top-0 left-0 z-[1]">
                <span class="px-2 py-1 text-white rounded-lg bg-gray-500 text-xs" v-for="tag in product.tags">{{ tag.name }}</span>
            </div>
            <cardPreviewMedia v-if="product.media" v-model="product.media" />
        </div>
        <div class="mt-1">
            <div @click="emit('showModal', product)" class="cursor-pointer">
                <p class="text-lg font-bold text-blue-700 dark:text-gray-400">
                    {{ product.price }} ₽
                    <span v-if="product.old_price != product.price" class="pl-1 text-sm font-medium text-gray-500 line-through">
                        {{ product.old_price }} ₽
                    </span>
                </p>
            </div>
            <p class="text-md font-middle text-gray-900 dark:text-white">{{ product.name }}</p>
<!--            <p class="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">{{ product.description }}</p>-->
            <p class="mb-4 font-normal text-md text-gray-500 dark:text-gray-400">{{ product.isbn }}</p>
            <cartButton v-model="product" />
        </div>
    </div>
</template>
