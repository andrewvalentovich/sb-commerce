<script setup lang="ts">
definePageMeta({
    name: "admin-panel-tags",
    breadcrumbs: "Тэги",
});

import { useAdminTags } from "~/stores/admin/tags";
import { useDialog } from "~/stores/dialog";
import _ from 'lodash';
import * as pkg from 'laravel-vue-pagination';

const { TailwindPagination } = pkg

const tagStore = useAdminTags()
const enumStore = useEnum()
const dialog = useDialog()

type i_FORM = Pick<models.Tag, 'name' | 'slug'>

watch(tagStore.filterParams, v => {
    tagStore.get(_.cloneDeep(v))
}, {
    deep: true
})

const editModal = reactive<{
    show: boolean
    title: string
    formRef: HTMLFormElement | null
    form: i_FORM
    formDefault?: i_FORM
    item: models.Tag | null
}>({
    show: false,
    title: '',
    formRef: null,
    form: {
        name: '',
        slug: '',
    },
    item: null
})

tagStore.get(_.cloneDeep(tagStore.filterParams));

async function destroy(item: models.Tag) {
    if (! confirm('Действие необратимо!\nВы уверены?')) {
        return
    }
    await tagStore.destroy(item.id)
    await tagStore.get(_.cloneDeep(tagStore.filterParams));
}

function showModal(item?: models.Tag) {
    dialog.open('adminTag')
    editModal.item = item || null
}
</script>
<template>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <Breadcrumbs />
            </div>
            <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div class="flex items-center mb-4 sm:mb-0">
                    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Все тэги</h1>
                </div>
                <uiButtonPrimary
                    :disabled="tagStore.loading"
                    @click="showModal()"
                >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Добавить тэг
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
                                Slug
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">

                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="!tagStore.loading" class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <tr v-for="tag in tagStore.items" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="p-4 text-base text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ tag.id }}</td>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 dark:text-gray-400">
                                    {{ tag.name }}
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 dark:text-gray-400">
                                    {{ tag.slug }}
                                </th>
                                <td class="p-4 space-x-2 whitespace-nowrap">
                                    <uiButtonPrimary
                                        :disabled="tagStore.loading"
                                        @click="showModal(tag)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        Редактировать
                                    </uiButtonPrimary>
                                    <ui-button-danger
                                        :disabled="tagStore.loading"
                                        @click="destroy(tag)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        Удалить
                                    </ui-button-danger>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="p-3" v-if="tagStore.loading">Загрузка...</span>
                    <span class="p-3" v-if="tagStore.items.length == 0 && !tagStore.loading">Нет тэгов</span>
                </div>
            </div>
        </div>
    </div>
    <div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <TailwindPagination
            class="mt-4"
            :data="tagStore.laravelData"
            @pagination-change-page="tagStore.changePage"
        />
    </div>

   <dialogsAdminTag v-model="editModal" @fetchPageData="tagStore.get(_.cloneDeep(tagStore.filterParams))"/>
</template>
