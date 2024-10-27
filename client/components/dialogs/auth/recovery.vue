<template>
    <DialogModal maxWidth="xl" :noFooter="false" :show="dialogAuth.active.recovery" @close="dialogAuth.setActive('recovery', false)">
        <template #content>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ checkIteration('success') ? 'Вы обновили пароль' : 'Восстановление пароля' }}
            </h2>
            <form v-if="checkIteration('success', true)" class="mt-8 space-y-6" @submit.prevent="submit">
                <div v-if="checkIteration('login')">
                    <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Введите email или номер телефона вашей учётной записи</label>
                    <input v-model="form.login" type="text" name="login" id="login" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com">
                </div>
                <div v-if="checkIteration('code')">
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                        На вашу почту <strong v-if="form.maskEmail">{{ form.maskEmail }}</strong> был отправлен код для восстановления пароля, пожалуйста введите полученный код в поле ниже
                    </div>
                    <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Код для восстановления</label>
                    <input v-model="form.code" type="text" name="code" id="code" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12345">
                </div>
                <div v-if="checkIteration('password')" class="space-y-6">
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Придумайте новый пароль и введите его в поля ниже
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Новый пароль</label>
                        <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div>
                        <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите новый пароль</label>
                        <input v-model="form.password_confirmation" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>

                <uiButtonPrimary type="submit" :disabled="auth.loading">
                    {{ auth.loading ? '...' : 'Отправить' }}
                </uiButtonPrimary>

                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Уже есть аккаунт? <button @click="dialogAuth.activateLogin()" class="text-blue-700 hover:underline dark:text-blue-500">Войти</button>
                </div>
            </form>
            <p v-else class="mt-4">
                Вы успешно обновили пароль. Теперь можете <button @click="dialogAuth.activateLogin()" class="text-blue-700 hover:underline dark:text-blue-500">войти в учётную запись</button>, используя обновлённые данные
            </p>
        </template>
        <template v-if="checkIteration('success')" #footer>
            <div class="my-6 flex gap-1">
                <uiButtonPrimary @click="dialogAuth.deactivateAll();">Окей</uiButtonPrimary>
                <uiButtonPrimary @click="dialogAuth.activateLogin();">
                    Войти в учётную запись
                </uiButtonPrimary>
            </div>
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
const { $toast } = useNuxtApp()
const buttonText = ''

const iterations = [
    'login',
    'code',
    'password',
    'success'
]
let form: object
formClear()

watch(() => dialogAuth.active.recovery, v => {
    formClear()
    v ? bodyFixed() : bodyNotFixed()
})

function formClear() {
    form = reactive(formDefaults())
}

function formDefaults() : object {
    return {
        login: '',
        code: '',
        password: '',
        password_confirmation: '',
        iterations: {
            prev: null,
            current: 'login',
            next: null,
        },
        maskEmail: '',
        loaded: true
    }
}

function updateIterations(iterations: object) {
    if (form.iterations && iterations) {
        for (let name in iterations) {
            if (form.iterations.hasOwnProperty(name)) {
                form.iterations[name] = iterations[name]
            }
        }
    }
}

function checkIteration(iteration: string, except: boolean = false) : boolean {
    const current = form?.iterations?.current;
    return current && (except ? current != iteration : current == iteration)
}

async function submit() {
    const data = await auth.recovery({...form})

    if (data && data.success) {
        console.log('data')
        console.log(data.message)
        console.log(data.success)
        console.log(data.data)

        $toast.success(data.message)

        if (form?.iterations?.current == 'login') {
            form.maskEmail = data.data.maskEmail ?? ''
        }
        updateIterations(data.data.iterations)
    }
}
</script>
