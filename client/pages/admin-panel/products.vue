<script setup lang="ts">
import { Filter } from "~/utils/filter";

definePageMeta({
    name: "admin-panel-products",
    breadcrumbs: "Товары",
});

import { useAdminTags } from "~/stores/admin/tags";
import { useAdminCategory } from "~/stores/admin/categories";
import { useAdminProducts } from "~/stores/admin/products";
import { useDialog } from "~/stores/dialog";
import _ from 'lodash';
import * as pkg from 'laravel-vue-pagination';

const { TailwindPagination } = pkg

const productStore = useAdminProducts()
const categoryStore = useAdminCategory()
const tagStore = useAdminTags()
const dialog = useDialog()

productStore.filter = new Filter(productStore.filterParams, useRouter())
await productStore.filter.parseUrlQuery()

watch(productStore.filterParams, v => {
    productStore.filter.updateUrlQuery(v, 'admin-panel-products')
    productStore.get(productStore.filter.getCloneFilterParams())
}, {
    deep: true
})

async function fetchParams() {
    await tagStore.getList()
    await categoryStore.getList()
}
fetchParams();
productStore.get(productStore.filter.getCloneFilterParams());

async function destroy(item: models.Product) {
    if (! confirm('Действие необратимо!\nВы уверены?')) {
        return
    }

    await productStore.destroy(item.id)
    await productStore.get(productStore.filter.getCloneFilterParams());
}

function showModal(item?: models.Product) {
    dialog.open('adminProduct')
    productStore.current = item || null
}
</script>
<template>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <Breadcrumbs />
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Все товары</h1>
            </div>
            <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div class="flex items-center mb-4 sm:mb-0">
                    <div class="sm:pr-3">
                        <label for="products-search" class="sr-only">Поиск</label>
                        <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                            <input
                                v-model="productStore.filterParams.search"
                                type="text"
                                name="search"
                                id="products-search"
                                :class="[productStore.filterParams.search ? 'border-2 border-blue-400' : 'border-gray-300']"
                                class="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Поиск товаров (название, артикул ISBN)"
                            >
                        </div>
                    </div>
                    <div class="flex items-center w-full sm:justify-end">
                        <div class="flex pl-2 space-x-1">
                            <div class="flex items-center">
                                <Dropdown :closeContentOnClick="false">
                                    <template #trigger>
                                        <button :class="[productStore.filterParams.tags.length ? 'border-2 border-blue-400' : 'border-gray-300']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Фильтр по тэгам
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul v-if="tagStore.list.length && !tagStore.loading" class="space-y-2 px-3 pt-3 text-sm">
                                            <li v-for="tag in tagStore.list" class="flex items-center">
                                                <input @click="productStore.filter.toggleProperty('tags', tag.slug)" v-model="productStore.filterParams.tags" :id="tag.slug" type="checkbox" :value="tag.slug" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="tag.slug" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ tag.name }}
                                                </label>
                                            </li>
                                        </ul>
                                        <p v-else class="ml-2 p-2 text-sm font-medium">Нет тэгов</p>
                                        <button v-if="tagStore.list.length && !tagStore.loading" @click="productStore.filter.setProperty('tags', [])" class="px-1 py-2 ml-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                                    </template>
                                </Dropdown>
                                <Dropdown :closeContentOnClick="false">
                                    <template #trigger>
                                        <button :class="[productStore.filterParams.categories.length ? 'border-2 border-blue-400' : 'border-gray-300']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Фильтр по категориям
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul v-if="categoryStore.list.length && !categoryStore.loading" class="space-y-2 px-3 pt-3 text-sm">
                                            <li v-for="category in categoryStore.list" class="flex items-center">
                                                <input @click="productStore.filter.toggleProperty('categories', category.slug)" v-model="productStore.filterParams.categories" :id="category.slug" type="checkbox" :value="category.slug" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="category.slug" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ category.name }}
                                                </label>
                                            </li>
                                        </ul>
                                        <p v-else class="ml-2 p-2 text-sm font-medium">Нет категорий</p>
                                        <button v-if="categoryStore.list.length && !categoryStore.loading" @click="productStore.filter.setProperty('categories', [])" class="px-1 py-2 ml-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                                    </template>
                                </Dropdown>
                                <Dropdown>
                                    <template #trigger>
                                        <button :class="[productStore.filterParams.sort == '' ? 'border-gray-300' : 'border-2 border-blue-400']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Сортировка
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul class="space-y-2 px-3 pt-3 text-sm">
                                            <li class="flex items-center">
                                                <input @click="productStore.filter.setProperty('sort', '')" v-model="productStore.filterParams.sort" id="no-sort" type="radio" :value="''" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label for="no-sort" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Нет сортировки
                                                </label>
                                            </li>
                                            <li v-for="sort in productStore.sortParams" class="flex items-center">
                                                <input @click="productStore.filter.setProperty('sort', sort.value)" v-model="productStore.filterParams.sort" :id="sort.value" type="radio" :value="sort.value" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="sort.value" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ sort.name }}
                                                </label>
                                            </li>
                                        </ul>
                                    </template>
                                </Dropdown>
                                <Dropdown :closeContentOnClick="false">
                                    <template #trigger>
                                        <button class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            На странице - {{ productStore.filterParams.per_page == 'all' ? 'Все' : productStore.filterParams.per_page }}
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul class="space-y-2 px-3 pt-3 text-sm">
                                            <li v-for="perPage in productStore.perPageList" class="flex items-center">
                                                <input v-model="productStore.filterParams.per_page" :id="`per_page-${perPage}`" type="radio" :value="perPage" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label :for="`per_page-${perPage}`" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ perPage }}
                                                </label>
                                            </li>
                                            <li class="flex items-center">
                                                <input @click="productStore.filter.setProperty('per_page', 'all')" v-model="productStore.filterParams.per_page" id="per-page-all" type="radio" :value="'all'" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label for="per-page-all" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Все
                                                </label>
                                            </li>
                                        </ul>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <uiButtonPrimary
                    :disabled="productStore.loading"
                    @click="showModal()"
                >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Добавить позицию
                </uiButtonPrimary>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden shadow">
                    <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="p-4">
                                ID
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Название
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Артикул ISBN
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Цена
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Год издания
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Категория
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Тэги
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">

                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="!productStore.loading" class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <tr v-for="product in productStore.items" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="p-4 text-base text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ product.id }}</td>
                                <td class="p-4 text-base font-bold text-gray-900 whitespace-nowrap dark:text-white">{{ product.name }}</td>
                                <td class="p-4 text-base font-bold text-gray-500 whitespace-nowrap dark:text-white">{{ product.isbn }}</td>
                                <td class="max-w-sm p-4 overflow-hidden text-base font-bold text-gray-900 truncate xl:max-w-xs dark:text-gray-400">{{ product.price }}</td>
                                <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{{ product.year_of_production }}</td>
                                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ product.category ? `${product.category.id}. ${product.category.name}` : '-' }}
                                </td>
                                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <ul v-if="product.tags && product.tags.length" class="flex flex-wrap gap-1">
                                        <li class="rounded-lg bg-slate-400 text-sm text-white px-2 py-1" v-for="tag in product.tags">{{ tag.name }}</li>
                                    </ul>
                                    <p v-else>-</p>
                                </td>
                                <td class="p-4 space-x-2 whitespace-nowrap">
                                    <uiButtonPrimary
                                        :disabled="productStore.loading"
                                        @click="showModal(product)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        Редактировать
                                    </uiButtonPrimary>
                                    <ui-button-danger
                                        :disabled="productStore.loading"
                                        @click="destroy(product)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        Удалить
                                    </ui-button-danger>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="p-3" v-if="productStore.loading">Загрузка...</span>
                    <span class="p-3" v-if="!productStore.items.length && !productStore.loading">Нет товаров</span>
                </div>
            </div>
        </div>
    </div>
    <div class="items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <TailwindPagination
            class="mt-4"
            :data="productStore.laravelData"
            @pagination-change-page="(page) => { productStore.filterParams.page = page }"
        />
    </div>

   <dialogsAdminProduct @fetchPageData="productStore.get(productStore.filter.getCloneFilterParams())"/>
</template>
