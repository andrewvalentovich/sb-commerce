<script setup lang="ts">
import _ from 'lodash';
import { useProducts } from "~/stores/products";
const productStore = useProducts()

watch(() => productStore.filterParams.sort, async (v) => {
    await productStore.get(productStore.filter.getCloneFilterParams())
})

// При изменении количества отображаемых записей - указываем начальную страницу = 1
watch(() => productStore.filterParams.per_page, async (v) => {
    productStore.filterParams.page = 1
    await productStore.get(productStore.filter.getCloneFilterParams())
})
</script>
<template>
    <div class="flex items-end justify-between border-b border-gray-200 pb-6 pt-6">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Каталог</h1>

        <div class="flex items-center gap-6">
            <Dropdown width="56">
                <template #trigger>
                    <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Сортировка
                        <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </template>
                <template #content>
                    <ul class="py-1 max-h-56 overflow-y-auto">
                        <li class="">
                            <input
                                v-model="productStore.filterParams.sort"
                                id="no-sort"
                                type="radio"
                                :value="''"
                                hidden
                            >
                            <label for="no-sort" :class="[productStore.filterParams.sort == '' ? 'text-gray-900' : 'text-gray-500']" class="font-medium block px-4 py-2 text-sm hover:bg-slate-100">
                                Нет сортировки
                            </label>
                        </li>
                        <li v-for="sort in productStore.sortParams" class="">
                            <input
                                v-model="productStore.filterParams.sort"
                                :id="sort.value"
                                type="radio"
                                hidden
                                :value="sort.value"
                            >
                            <label :for="sort.value" :class="[productStore.filterParams.sort == sort.value ? 'text-gray-900' : 'text-gray-500']" class="font-medium block px-4 py-2 text-sm hover:bg-slate-100">
                                {{ sort.name }}
                            </label>
                        </li>
                    </ul>
                </template>
            </Dropdown>
            <Dropdown width="24">
                <template #trigger>
                    <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        На странице - {{ productStore.filterParams.per_page == 'all' ? 'Все' : productStore.filterParams.per_page }}
                        <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </template>
                <template #content>
                    <ul class="py-1 max-h-56 overflow-y-auto">
                        <li v-for="perPage in productStore.perPageList" class="">
                            <input
                                v-model="productStore.filterParams.per_page"
                                :id="`per_page-${perPage}`"
                                type="radio"
                                :value="perPage"
                                hidden
                            >
                            <label
                                :for="`per_page-${perPage}`"
                                :class="[productStore.filterParams.per_page == perPage ? 'text-gray-900' : 'text-gray-500']"
                                class="font-medium block px-4 py-2 text-sm hover:bg-slate-100"
                            >
                                {{ perPage }}
                            </label>
                        </li>
                        <li class="">
                            <input
                                @click="productStore.filter.setProperty('per_page', 'all')"
                                v-model="productStore.filterParams.per_page"
                                id="per-page-all"
                                type="radio"
                                :value="'all'"
                                hidden
                            >
                            <label for="per-page-all" :class="[productStore.filterParams.per_page == 'all' ? 'text-gray-900' : 'text-gray-500']" class="font-medium block px-4 py-2 text-sm hover:bg-slate-100">
                                Все
                            </label>
                        </li>
                    </ul>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
