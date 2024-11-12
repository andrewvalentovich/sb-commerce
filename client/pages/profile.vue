<script setup lang="ts">
import { useProfileStore } from "~/stores/profile";

definePageMeta({
    name: "profile",
    breadcrumbs: "Профиль",
    middleware: ['auth']
});

const profileStore = useProfileStore()
type i_PASSWORD_FORM = Pick<object, 'password' | 'current_password' | 'password_confirmation'>
type i_FORM = Pick<object, 'password' | 'current_password' | 'password_confirmation'>

const editModal = reactive<{
    show: boolean
    title: string
    form: i_FORM
    password_form: i_PASSWORD_FORM
    item: models.Product | null
}>({
    show: false,
    title: '',
    formRef: null,
    form: {
        name: '',
        slug: '',
        description: '',
    },
    password_form: {
        name: '',
        slug: '',
        description: '',
    },
    item: null
})
</script>
<template>
    <div class="col-span-full grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div class="mb-4 col-span-full xl:mb-2">
            <Breadcrumbs class="mb-8" />
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Настройки пользователя</h1>
        </div>
        <!-- Right Content -->
        <div class="col-span-2">
            <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 class="mb-4 text-xl font-semibold dark:text-white">Общая информация</h3>
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
                        <input type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Имя" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@mail.ru" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Номер телефона</label>
                        <input type="text" name="phone" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+79998887766" required="">
                    </div>
                    <div class="col-span-6 sm:col-full">
                        <uiButtonPrimary
                            :disabled="profileStore.loading"
                        >
                            Обновить данные
                        </uiButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-full xl:col-auto">
            <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 class="mb-4 text-xl font-semibold dark:text-white">Обновить пароль</h3>
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-full">
                        <label for="current-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Текущий пароль</label>
                        <input type="text" name="current-password" id="current-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                    </div>
                    <div class="col-span-full">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Новый пароль</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                    </div>
                    <div class="col-span-full">
                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите пароль</label>
                        <input type="text" name="confirm-password" id="confirm-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="">
                    </div>
                    <div class="col-span-full">
                        <uiButtonPrimary
                            :disabled="profileStore.loading"
                        >
                            Обновить пароль
                        </uiButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
