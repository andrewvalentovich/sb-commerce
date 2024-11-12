<script setup lang="ts">
import _ from 'lodash';
import { useProducts } from "~/stores/products";
import * as pkg from 'laravel-vue-pagination';
const { TailwindPagination } = pkg

const productStore = useProducts()
const dialog = useDialog()

function showModal(item?: models.Product) {
    productStore.filterParams.active_dialog_slug = item.slug || ''
}

async function changePage(page: number): void
{
    productStore.filterParams.page = page
    await productStore.get(productStore.filter.getCloneFilterParams())
}
</script>
<template>
    <div id="main-content" class="dark:bg-gray-900">
        <div v-if="!productStore.loading && productStore.items.length" class="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <catalogCard
                class="col-span-1"
                @showModal="showModal"
                v-for="product in productStore.items" :item="product"
            />
        </div>

        <p v-show="!productStore.loading && !productStore.items.length">Не найдено товаров</p>
        <p v-if="productStore.loading">Загрузка...</p>

        <div class="flex justify-center w-full p-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <Pagination
                class="mt-4"
                v-model="productStore.laravelData"
                @changePage="changePage"
            />
        </div>
    </div>
</template>
