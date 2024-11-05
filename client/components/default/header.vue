<script setup lang="ts">
import { useAuth } from '~/stores/auth'
import { useMenu } from '~/stores/menu'
import { useCartStore } from '~/stores/cart'
import { useDialogAuth, useDialog } from '~/stores/dialog'

const auth = useAuth()
const menu = useMenu()
const cartStore = useCartStore()
const dialogAuth = useDialogAuth()

const menuHeader = menu.get('header')
const menuHeaderMobile = menu.get('headerMobile')

useHead({
    title: 'Slovo-book.ru'
})
</script>
<template>
    <nav class="w-full sticky top-0 bg-white border-gray-200 dark:bg-gray-900 z-10">
        <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
<!--                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />-->
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Slovo-book.ru</span>
            </a>
            <div class="flex items-center gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <NuxtLink class="relative" :to="{name: 'cart'}">
                    <svg class="mx-auto mb-1 text-gray-500 w-8 h-8 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                    <span v-if="cartStore.cart && cartStore.cart.length" class="absolute bottom-0 right-0 text-xs w-4 h-4 text-center align-middle text-white bg-red-500 rounded-full">{{ cartStore.cart.length }}</span>
                </NuxtLink>
                <dropdown v-if="auth.user">
                    <template #trigger>
                        <div class="flex items-center space-x-3 md:space-x-0">
                            <button type="button" class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <svg class="mx-auto text-gray-500 w-10 h-10 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div class="px-4 py-3 max-w-[200px]">
                                <span class="block text-sm overflow-hidden text-ellipsis text-gray-900 dark:text-white">{{ auth?.user?.name }}</span>
                                <span class="block text-sm overflow-hidden text-ellipsis text-gray-500 truncate dark:text-gray-400">{{ auth?.user?.email }}</span>
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <ul class="py-2">
                            <li>
                                <NuxtLink v-if="auth.checkManager" :to="{name: 'admin-panel'}" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Панель администратора</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name: 'profile'}" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Личный кабинет</NuxtLink>
                            </li>
                            <li>
                                <button @click="auth.logout()" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Выйти из уч. записи</button>
                            </li>
                        </ul>
                    </template>
                </dropdown>
                <dropdown v-else>
                    <template #trigger>
                        <div class="flex items-center space-x-3 md:space-x-0">
                            <button type="button" class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <svg class="mx-auto text-gray-500 w-10 h-10 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </template>
                    <template #content>
                        <ul class="py-2">
                            <li>
                                <button @click="dialogAuth.activateLogin()" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Войти</button>
                            </li>
                            <li>
                                <button @click="dialogAuth.activateRegister()" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Зарегистрироваться</button>
                            </li>
                        </ul>
                    </template>
                </dropdown>
                <!-- Dropdown menu -->
                <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li v-for="m in menuHeader">
                        <NuxtLink :href="m.link" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">{{ m.text }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <dialogsAuthLogin />
    <dialogsAuthRegister />
    <dialogsAuthRecovery />
</template>
