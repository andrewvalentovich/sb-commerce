<template>
    <!-- authorization Popup -->
    <DialogModal :noFooter="false" :show="dialogAuth.active.login" @close="dialogAuth.setActive('login', false)">
        <template #content>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="w-full space-y-8 bg-white rounded-lg dark:bg-gray-800">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        Авторизация
                    </h2>
                    <form class="mt-8 space-y-6" @submit.prevent="submit">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Эл. почта</label>
                            <input :disabled="auth.loading" v-model="form.email" placeholder="mail@mail.ru" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                            <input :disabled="auth.loading" v-model="form.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input :disabled="auth.loading" id="remember" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div class="ms-3 text-sm">
                                <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">Запомнить меня</label>
                            </div>
                            <button @click="dialogAuth.activateRecovery()" class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Забыли пароль?</button>
                        </div>
                        <uiButtonPrimary type="submit" :disabled="auth.loading">
                            {{ auth.loading ? '...' : 'Войти' }}
                        </uiButtonPrimary>
                    </form>
                </div>
            </section>
        </template>
        <template #footer>
            <div class="mt-3 mb-6 text-sm font-medium text-gray-900 dark:text-white">
                Ещё не зарегистрированы? <button @click="dialogAuth.activateRegister()" class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Создать аккаунт</button>
            </div>
        </template>
    </DialogModal>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/auth'
import { useDialogAuth, useDialog } from '~/stores/dialog'
import Cookies from 'js-cookie'

const auth = useAuth()
const dialogAuth = useDialogAuth()
const dialog = useDialog()
const router = useRouter()

let form
formClear()


async function submit(e) {
    await auth.login({...form})
}

watch(() => dialogAuth.active.login, v => {
    formClear()
    v ? bodyFixed() : bodyNotFixed()
})

function formClear() {
    form = reactive(formDefaults())
}

function formDefaults() {
    return {
        email: '',
        password: '',
    }
}
</script>
