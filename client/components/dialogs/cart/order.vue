<script setup lang="ts">
import _ from 'lodash'
import { useAuth } from '~/stores/auth'
import { useDialog } from '~/stores/dialog'
import { useCartStore } from "~/stores/cart";
import { useOrder } from '~/stores/order'

const auth = useAuth()
const dialog = useDialog()
const cartStore = useCartStore()
const orderStore = useOrder()
const route = useRoute();

const loading = ref(false)
type i_FORM = Pick<'name' | 'phone' | 'email' | 'message'>

const editModal = reactive<{
    title: string
    form: i_FORM
}>({
    title: '',
    form: {
        name: '',
        phone: '',
        email: '',
        message: '',
    }
})

watch(() => dialog.dialogs.cartOrder.active, v => {
    if (v) {
        bodyFixed()
        if (auth.check) {
            for (let name in editModal.form) {
                if (auth.user.hasOwnProperty(name)) {
                    editModal.form[name] = auth.user[name]
                }
            }
        }
    } else {
        bodyNotFixed()
    }
})

function formDefaults() {
    return {
        name: '',
        phone: '',
        email: '',
        message: ''
    }
}

const initData = () => {
    let data = _.cloneDeep(editModal.form)
    data['utm_data'] = {
        referer: new URL(route?.path, window?.location?.origin)?.href
    }

    // Собрать данные заказа...
    data['products_data'] = cartStore.cart
    data['sum'] = cartStore.cart.reduce((a, b) => { return a + b.price * b.quantity }, 0)
    data['common_weight'] = cartStore.cart.reduce((a, b) => { return a + parseInt(b.package_weight) * b.quantity }, 0)

    return data
}

const submit = async (event: Event) => {
    event.preventDefault();
    await orderStore.sendCartOrder(initData(), 'cartOrder');
}
</script>

<template>
    <!-- authorization Popup -->
    <DialogModal max-width="lg" :show="dialog.dialogs.cartOrder.active" @close="dialog.close('cartOrder')">
        <template #title>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="w-full space-y-4 py-4 bg-white rounded-lg dark:bg-gray-800">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        Оформить заказ
                    </h2>
                </div>
            </section>
            <form class="grid mt-2 grid-cols-6 gap-6" @submit="submit($event)">
                <div class="col-span-6" :class="[editModal.item ? 'sm:col-span-3' : 'sm:col-span-6']">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя*</label>
                    <input :disabled="orderStore.loading" v-model="editModal.form.name" type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ваше имя">
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон*</label>
                    <input :disabled="orderStore.loading" v-model="editModal.form.phone" type="text" name="phone" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+79998887766">
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email*</label>
                    <input :disabled="orderStore.loading" v-model="editModal.form.email" type="text" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@mail.ru">
                </div>
                <div class="col-span-6 sm:col-span-6">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Сообщение</label>
                    <textarea :disabled="orderStore.loading" v-model="editModal.form.message" name="message" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ваше сообщение"></textarea>
                </div>
                <div class="items-center pt-4 rounded-b dark:border-gray-700">
                    <uiButtonPrimary :disabled="orderStore.loading" type="submit">
                        {{ orderStore.loading ? 'Загрузка...' : 'Отправить' }}
                    </uiButtonPrimary>
                </div>
            </form>
        </template>
    </DialogModal>
</template>
