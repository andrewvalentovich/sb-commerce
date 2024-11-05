<script setup lang="ts">
import _ from 'lodash';
import { useTags } from "~/stores/tags";
import { useCategories } from "~/stores/categories";
import { useProducts } from "~/stores/products";
import { onlyNumber } from "~/utils/validator";

const productStore = useProducts()
const categoryStore = useCategories()
const tagStore = useTags()

function setFilterDefault(): void
{
    productStore.setFilterDefault()
    productStore.filter.updateUrlQuery(productStore.filterParams, 'catalog')
}
</script>
<template>
    <div class="py-2 flex flex-col">
        <div class="flex justify-between mb-4">
            <button class="flex justify-center items-center text-medium text-slate-800" type="button" aria-expanded="false" data-headlessui-state="">
                <svg class="w-6 h-6 pr-2 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z" clip-rule="evenodd"></path>
                </svg>
                Фильтр
            </button>
            <span class="border-x border-gray-200"></span>
            <button class="text-medium text-sm text-slate-400" @click="setFilterDefault">
                Очистить
            </button>
        </div>
        <div class="w-full flex flex-col">
            <div class="relative w-full">
                <input
                    v-model="productStore.filterParams.search"
                    type="text"
                    name="search"
                    id="products-search"
                    class="bg-white border-b focus:border-blue-500 text-gray-900 sm:text-sm outline-none block w-full py-6"
                    placeholder="Поиск товара"
                >
                <svg class="absolute top-[50%] right-0 translate-y-[-50%] w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>

            <Accordion text="Тэги">
                <template #content>
                    <div v-if="tagStore.list.length && !tagStore.loading" class="space-y-4">
                        <div v-for="tag in tagStore.list" class="flex items-center">
                            <input @click="productStore.filter.toggleProperty('tags', tag.slug)" v-model="productStore.filterParams.tags" :id="tag.slug" type="checkbox" :value="tag.slug" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <label :for="tag.slug" class="ml-3 text-sm text-gray-600">
                                {{ tag.name }}
                            </label>
                        </div>
                    </div>
                    <div v-else class="space-y-4">
                        <div class="flex items-center">
                            <p class="text-sm text-gray-600">Нет тэгов</p>
                        </div>
                    </div>
                    <button v-if="tagStore.list.length && !tagStore.loading" @click="productStore.filter.setProperty('tags', [])" class="py-2 mt-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                </template>
            </Accordion>

            <Accordion text="Категории">
                <template #content>
                    <div v-if="categoryStore.list && categoryStore.list.length && !categoryStore.loading" class="space-y-4">
                        <div v-for="category in categoryStore.list" class="flex items-center">
                            <input @click="productStore.filter.toggleProperty('categories', category.slug)" v-model="productStore.filterParams.categories" :id="category.slug" type="checkbox" :value="category.slug" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <label :for="category.slug" class="ml-3 text-sm text-gray-600">
                                {{ category.name }}
                            </label>
                        </div>
                    </div>
                    <div v-else class="space-y-4">
                        <div class="flex items-center">
                            <p class="text-sm text-gray-600">Нет категорий</p>
                        </div>
                    </div>
                    <button v-if="categoryStore.list && categoryStore.list.length && !categoryStore.loading" @click="productStore.filter.setProperty('categories', [])" class="py-2 mt-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                </template>
            </Accordion>

            <div class="w-full grid grid-cols-11 bg-white">
                <input placeholder="Цена от, руб" type="text" @keypress="onlyNumber" v-model="productStore.filterParams.price.min" class="col-span-5 w-auto border-b border-gray-200 focus:border-blue-500 text-gray-900 sm:text-sm outline-none py-6">
                <span class="col-span-1 border-b border-gray-200 block py-6 px-3">-</span>
                <input placeholder="Цена до, руб" type="text" @keypress="onlyNumber" v-model="productStore.filterParams.price.max" class="col-span-5 w-auto border-b border-gray-200 focus:border-blue-500 text-gray-900 sm:text-sm outline-none py-6">
            </div>

            <uiButtonPrimary
                class="mt-4"
                :disabled="productStore.loading"
                @click="productStore.get(productStore.filter.getCloneFilterParams())"
            >
                Применить фильтр
            </uiButtonPrimary>
        </div>
    </div>
</template>
