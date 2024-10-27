<template>
    <DialogModal maxWidth="xl" :noFooter="false" :show="dialogAuth.active.register" @close="dialogAuth.setActive('register', false)">
        <template #content>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ isRegistered ? 'Спасибо за регистрацию!' : 'Регистрация' }}
            </h2>
            <form v-if="!isRegistered" class="mt-8 space-y-6" @submit.prevent="submit">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваше Имя</label>
                    <input v-model="form.name" type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш email</label>
                    <input v-model="form.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                </div>
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш номер телефона</label>
                    <input v-model="form.phone" type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+79998887766">
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                    <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите пароль</label>
                    <input v-model="form.password_confirmation" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>

                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="remember" v-model="form.is_agree" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <label for="remember" class="pl-3 text-sm font-medium text-gray-900 dark:text-white">Я согласен <NuxtLink :to="{name: 'index'}" class="text-blue-700 hover:underline dark:text-blue-500">с Terms and Conditions</NuxtLink></label>
                </div>

                <uiButtonPrimary type="submit" :disabled="!form.is_agree && !auth.loading">
                    {{ auth.loading ? '...' : 'Создать аккаунт' }}
                </uiButtonPrimary>

                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Уже есть аккаунт? <button @click="dialogAuth.activateLogin()" class="text-blue-700 hover:underline dark:text-blue-500">Войти</button>
                </div>
            </form>
            <p class="mt-4" v-else>Подтверждение аккаунта займёт не более суток. Когда мы подтвердим Ваш аккаунт - соответствующее письмо придёт на электронную почту. Спасибо</p>
        </template>
        <template v-if="isRegistered" #footer>
            <uiButtonPrimary @click="dialogAuth.deactivateAll();" class="my-6">
                Окей
            </uiButtonPrimary>
        </template>
    </DialogModal>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/auth'
import { useDialogAuth, useDialog } from '~/stores/dialog'
import Cookies from "js-cookie";

const auth = useAuth()
const dialogAuth = useDialogAuth()
const dialog = useDialog()

const isRegistered = ref(false)
let form
formClear()

async function submit() {
    const data = await auth.register({...form})

    if (data) {
        isRegistered.value = true
    }
}

watch(() => dialogAuth.active.register, v => {
    if (isRegistered.value) {
        formClear()
        isRegistered.value = false
    }
})

function formClear() {
    form = reactive(formDefaults())
}

function formDefaults() {
    return {
        email: '',
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
        is_agree: false
    }
}
</script>
