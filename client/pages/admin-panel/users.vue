<script setup lang="ts">
import { Filter } from "~/utils/filter";

definePageMeta({
    name: "admin-panel-users",
    breadcrumbs: "Пользователи",
});

import { useEnum } from '~/stores/enums';
import { useAuth } from '~/stores/auth';
import { useAdminUsers } from "~/stores/admin/users";
import { useDialog } from "~/stores/dialog";
import _ from 'lodash';
import * as pkg from 'laravel-vue-pagination';

const { TailwindPagination } = pkg

const userStore = useAdminUsers()
const enumStore = useEnum()
const dialog = useDialog()
const auth = useAuth()

type i_FORM = Pick<models.User, 'name' | 'email' | 'phone' | 'avatar_url' | 'role' | 'status' | 'password'> & {
    avatar: File | null
}

userStore.filter = new Filter(userStore.filterParams)
await userStore.filter.parseUrlQuery()

watch(userStore.filterParams, v => {
    userStore.filter.updateUrlQuery(v, 'admin-panel-users')
    userStore.get(userStore.filter.getCloneFilterParams())
}, {
    deep: true
})

const editModal = reactive<{
    show: boolean
    title: string
    formRef: HTMLFormElement | null
    form: i_FORM
    formDefault?: i_FORM
    item: models.User | null
}>({
    show: false,
    title: '',
    formRef: null,
    form: {
        name: '',
        email: '',
        phone: '',
        discount_percentage: 0,
        password: '',
        role: null,
        status: null,
    },
    item: null
})

async function fetchParams() {
    await enumStore.getUserRoles()
    await enumStore.getUserStatuses()
}
fetchParams();
await userStore.get(userStore.filter.getCloneFilterParams());

async function destroy(item: models.User) {
    if (! confirm('Действие необратимо!\nВы уверены?')) {
        return
    }
    await userStore.destroy(item.id)
    await userStore.get(userStore.filter.getCloneFilterParams());
}

function showModal(item?: models.User) {
    dialog.open('adminUser')
    editModal.item = item || null
}

onBeforeUnmount(() => {
    enumStore.userRoles = []
    enumStore.userStatuses = []
})
</script>
<template>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <Breadcrumbs />
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Все пользователи</h1>
            </div>
            <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                <div class="flex items-center mb-4 sm:mb-0">
                    <div class="sm:pr-3">
                        <label for="users-search" class="sr-only">Поиск</label>
                        <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                            <input
                                v-model="userStore.filterParams.search"
                                type="text"
                                name="email"
                                id="users-search"
                                :class="[userStore.filterParams.search ? 'border-2 border-blue-400' : '']"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Поиск пользователей (ФИО, номер телефона, email)"
                            >
                        </div>
                    </div>
                    <div class="flex items-center w-full sm:justify-end">
                        <div class="flex pl-2 space-x-1">
                            <div class="flex items-center">
                                <Dropdown :closeContentOnClick="false">
                                    <template #trigger>
                                        <button :class="[userStore.filterParams.roles.length ? 'border-2 border-blue-400' : '']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Фильтр по ролям
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul class="space-y-2 px-3 pt-3 text-sm" aria-labelledby="dropdownDefault">
                                            <li v-for="role in enumStore.userRoles" class="flex items-center">
                                                <input @click="userStore.filter.toggleProperty('roles', role.name)" v-model="userStore.filterParams.roles" :id="role.name" type="checkbox" :value="role.name" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="role.name" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ role.display_name }}
                                                </label>
                                            </li>
                                        </ul>
                                        <button @click="userStore.filter.setProperty('roles', [])" class="px-1 py-2 ml-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                                    </template>
                                </Dropdown>
                                <Dropdown :closeContentOnClick="false">
                                    <template #trigger>
                                        <button :class="[userStore.filterParams.statuses.length ? 'border-2 border-blue-400' : '']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Фильтр по статусу
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul class="space-y-2 px-3 pt-3 text-sm" aria-labelledby="dropdownDefault">
                                            <li v-for="status in enumStore.userStatuses" class="flex items-center">
                                                <input @click="userStore.filter.toggleProperty('statuses', status.name)" v-model="userStore.filterParams.statuses" :id="status.value" type="checkbox" :value="status.name" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="status.value" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ status.label }}
                                                </label>
                                            </li>
                                        </ul>
                                        <button @click="userStore.filter.setProperty('statuses', [])" class="px-1 py-2 ml-2 text-sm text-blue-700 hover:text-blue-500 font-medium">Очистить</button>
                                    </template>
                                </Dropdown>
                                <Dropdown>
                                    <template #trigger>
                                        <button :class="[userStore.filterParams.sort == '' ? '' : 'border-2 border-blue-400']" class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            Сортировка
                                            <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </template>
                                    <template #content>
                                        <!-- Dropdown menu -->
                                        <ul class="space-y-2 px-3 pt-3 text-sm" aria-labelledby="dropdownDefault">
                                            <li class="flex items-center">
                                                <input @click="userStore.filter.setProperty('sort', '')" v-model="userStore.filterParams.sort" id="no-sort" type="radio" :value="''" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label for="no-sort" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Нет сортировки
                                                </label>
                                            </li>
                                            <li v-for="sort in userStore.sortParams" class="flex items-center">
                                                <input @click="userStore.filter.setProperty('sort', sort.value)" v-model="userStore.filterParams.sort" :id="sort.value" type="radio" :value="sort.value" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">

                                                <label :for="sort.value" class="pl-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {{ sort.name }}
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
                    :disabled="userStore.loading && enumStore.loading"
                    @click="showModal()"
                >
                    <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Добавить пользователя
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
                                ФИО
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Номер телефона
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Скидка, %
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Роль
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Статус
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">

                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="!(userStore.loading || enumStore.loading)" class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            <tr v-for="user in userStore.items" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="p-4 text-base text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.id }}</td>
                                <td class="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                    <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        <div class="text-base font-semibold text-gray-900 dark:text-white">{{ user.name }}</div>
                                        <div class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                                    </div>
                                </td>
                                <td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{{ user.phone }}</td>
                                <td class="p-4 text-base font-bold text-gray-900 whitespace-nowrap dark:text-white">{{ user.discount_percentage }}</td>
                                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.role ?? '-' }}</td>
                                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.status_label }}</td>
                                <td class="p-4 space-x-2 whitespace-nowrap">
                                    <uiButtonPrimary
                                        :disabled="userStore.loading && enumStore.loading"
                                        @click="showModal(user)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        Редактировать
                                    </uiButtonPrimary>
                                    <ui-button-danger
                                        v-if="auth.checkAdmin"
                                        :disabled="userStore.loading && enumStore.loading"
                                        @click="destroy(user)"
                                    >
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        Удалить
                                    </ui-button-danger>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="p-3" v-if="userStore.loading || enumStore.loading">Загрузка...</span>
                    <span class="p-3" v-if="userStore.items.length == 0 && (!userStore.loading && !enumStore.loading)">Нет пользователей</span>
                </div>
            </div>
        </div>
    </div>
    <div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <TailwindPagination
            class="mt-4"
            :data="userStore.laravelData"
            @pagination-change-page="userStore.changePage"
        />
    </div>

   <dialogsAdminUser v-model="editModal" @fetchPageData="userStore.get(userStore.filter.getCloneFilterParams())"/>
</template>
