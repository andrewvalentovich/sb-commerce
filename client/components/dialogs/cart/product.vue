<script setup lang="ts">
import _ from 'lodash'
import { useDialog } from '~/stores/dialog'
import { useProducts } from "~/stores/products";

const productStore = useProducts()
const dialog = useDialog()
const { $toast } = useNuxtApp()

const props = defineProps({
    item: {
        type: Object
    }
})

const current = ref<models.Product>(props.item)

watch(() => dialog.dialogs.cartProduct.active, v => {
    if (v) {
        bodyFixed()
        showModal()
    } else {
        bodyNotFixed()
        closeModal()
    }
})

function closeModal() {
    current.value = null
    dialog.close('cartProduct')
}

async function showModal() {
    current.value = props.item
}
</script>

<template>
    <!-- authorization Popup -->
    <DialogModal max-width="1100px" :show="dialog.dialogs.cartProduct.active" @close="closeModal()">
        <template #content>
            <div v-if="current" class="grid grid-cols-10 gap-10">
                <div class="col-span-6">
                    <swiperProduct :itemsData="current.media">
                        <template #item="{ item }">
                            <div v-if="item.mime_type === 'video/mp4'" class="w-full relative pt-[80%]">
                                <video
                                    class="absolute w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 object-contain"
                                    controls
                                    muted
                                    loop
                                    :src="item.url"
                                    :poster="item.thumb_url"
                                ></video>
                            </div>
                            <div v-else class="w-full relative pt-[80%]">
                                <img :src="item.url" class="absolute w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 object-contain" alt="media">
                            </div>
                        </template>
                    </swiperProduct>
                </div>
                <div class="col-span-4">
                    <section class="bg-gray-50 dark:bg-gray-900">
                        <div class="w-full bg-white rounded-lg">
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ current.name }}
                            </h2>
                            <p class="text-base mt-1 font-normal text-gray-500 dark:text-white">
                                Артикул: {{ current.isbn }}
                            </p>
                            <p class="text-2xl mt-3 font-bold text-blue-700">
                                {{ current.discount_price ?? current.price }} ₽
                                <span v-if="current.discount_price" class="pl-1 text-base font-medium text-gray-500 line-through">
                                    {{ current.price }} ₽
                                </span>
                            </p>
                            <p class="text-sm mt-5 font-normal text-gray-900 dark:text-white">
                                {{ current.description }}
                            </p>
                            <ul class="text-sm font-normal text-gray-900 mt-4">
                                <li v-if="current.category">
                                    <span class="text-gray-600">Категория:</span> {{ current?.category.name }}
                                </li>
                                <li>
                                    <span class="text-gray-600">Год издания:</span> {{ current.year_of_production }}
                                </li>
                                <li>
                                    <span class="text-gray-600">Количество в пачке:</span> {{ current.count_per_package }}
                                </li>
                                <li>
                                    <span class="text-gray-600">Вес пачки:</span> {{ current.package_weight }}
                                </li>
                            </ul>
                        </div>
                    </section>
                    <div class="items-center pt-8 pb-4 rounded-b dark:border-gray-700">
                        <cartButton v-model="current" @onDelete="dialog.close('cartProduct')" />
                    </div>
                </div>
            </div>
            <p v-else>Загрузка...</p>
        </template>
    </DialogModal>
</template>
