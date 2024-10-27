<script setup lang="ts">
import { recursiveSearch } from "~/utils/nested";

definePageMeta({
    name: "admin-panel-categories",
    breadcrumbs: "Категории",
});

import { useEnum } from '~/stores/enums';
import { useAuth } from '~/stores/auth';
import { useAdminCategory } from "~/stores/admin/categories";
import { useDialog } from "~/stores/dialog";
import * as pkg from 'laravel-vue-pagination';

const categoryStore = useAdminCategory()
const dialog = useDialog()
const auth = useAuth()
const currentItem = ref<models.Category>(null)

function showModal(item?: models.Category) {
    dialog.open('adminCategory')
    categoryStore.current = item || null
}

async function fetchData() {
    await categoryStore.getTree()

    if (categoryStore.current) {
        const newItem = recursiveSearch(categoryStore.tree, categoryStore.current.id,  'id', 'children')
        if (newItem) categoryStore.current = newItem
    }
}
await fetchData()
</script>
<template>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <Breadcrumbs />
            </div>
            <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Все категории</h1>
                <uiButtonPrimary
                    :disabled="categoryStore.loading"
                    @click="showModal()"
                >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Добавить категорию
                </uiButtonPrimary>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden shadow">
                    <admin-categories-nested
                        v-if="categoryStore.tree && categoryStore.tree.length && !categoryStore.loading"
                        v-model="categoryStore.tree"
                        @showModal="showModal"
                    />

                    <span class="p-3" v-if="categoryStore.loading">Загрузка...</span>
                    <span class="p-3" v-if="!categoryStore.tree.length && !categoryStore.loading">Нет категорий</span>
                </div>
            </div>
        </div>
    </div>
    <div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
    </div>

    <dialogsAdminCategory @fetchPageData="fetchData"/>
</template>
