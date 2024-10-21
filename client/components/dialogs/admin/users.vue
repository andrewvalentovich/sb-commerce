<script setup lang="ts">
import { useDialog } from '~/stores/dialog'
import { useAdminUsers } from "~/stores/admin/users"
import { useEnum } from '~/stores/enums';

const props = defineProps({
    modelValue: {
        type: Object
    }
})
const emit = defineEmits(['update:modelValue', 'fetchPageData'])

const enumStore = useEnum()
const dialog = useDialog()
const adminUserStore = useAdminUsers()
const router = useRouter()
const editModal = ref(props.modelValue)

async function fetchParams() {
    if (Object.keys(enumStore.userRoles).length === 0) {
        await enumStore.getUserRoles()
    }

    if (Object.keys(enumStore.userStatuses).length === 0) {
        await enumStore.getUserStatuses()
    }
}
fetchParams()
formClear()

watch(() => dialog.dialogs.adminUser.active, v => {
    formClear()

    if (v) {
        bodyFixed()
        showModal()
    } else {
        bodyNotFixed()
        closeModal()
    }
})

watch(() => props.modelValue, v => {
    editModal.value = v
}, {
    deep: true
})

function formClear() {
    editModal.value.form = reactive(formDefaults())
}

function formDefaults() {
    return {
        name: '',
        email: '',
        phone: '',
        discount_percentage: 0.00,
        password: '',
        role: 'client',
        status: enumStore.userStatuses.find(el => el.name == 'Active')?.value ?? null,
    }
}

const fetchPageData = () => {
    emit('fetchPageData');
}

async function submit() {
    const m = editModal.value
    const data = JSON.parse(JSON.stringify(m.form))
    let res

    if (m.item) {
        res = await adminUserStore.update(m.item.id, data)
    } else {
        res = await adminUserStore.store(data)
    }

    if (res && res.success) {
        formClear()
        closeModal()

        emit('update:modelValue', m)
        await fetchPageData()
    }
}

function closeModal() {
    editModal.value.show = false;
    emit('update:modelValue', editModal.value)
    dialog.close('adminUser')
}

function showModal() {
    editModal.value.show = true
    if (! editModal.value.formDefault) {
        editModal.value.formDefault = Object.assign({}, editModal.value.form)
    } else {
        editModal.value.form = Object.assign({}, editModal.value.formDefault)
    }

    const item = editModal.value.item
    if (item) {
        editModal.value.title = `Редактирование пользователя: ${item.name} (ID - ${item.id})`
        for (let name in editModal.value.form) {
            if (name === 'role') {
                editModal.value.form[name] = enumStore.userRoles.find(role => role.display_name === item[name]).name;
                continue;
            }
            if (item.hasOwnProperty(name)) {
                editModal.value.form[name] = item[name]
            }
        }
    } else {
        editModal.value.title = 'Добавление пользователя'
    }
}
</script>

<template>
    <!-- authorization Popup -->
    <DialogModal :noFooter="false" :show="dialog.dialogs.adminUser.active" @close="closeModal()">
        <template #title>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="w-full space-y-4 py-4 bg-white rounded-lg dark:bg-gray-800">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ editModal.title }}
                    </h2>
                </div>
            </section>
        </template>
        <template #content>
            <div class="">
                <form>
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
                            <input v-model="editModal.form.name" type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ФИО">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Номер телефона</label>
                            <input v-model="editModal.form.phone" type="text" name="phone" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="+79998887766">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input v-model="editModal.form.email" type="email" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com">
                        </div>
                        <div v-if="!editModal.item" class="col-span-6 sm:col-span-3">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                            <input v-model="editModal.form.password" type="password" name="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="********">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Статус</label>
                            <select v-model="editModal.form.status" id="status" name="status" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option :value="null" disabled>Не указано</option>
                                <option v-for="status in enumStore.userStatuses" :value="status.value" >{{ status.label }}</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Роль</label>
                            <select v-model="editModal.form.role" id="role" name="role" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option :value="null" disabled>Не указано</option>
                                <option v-for="role in enumStore.userRoles" :value="role.name">{{ role.display_name }}</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3" :class="[editModal.item ? '!col-start-4 row-start-2' : '']">
                            <label for="discount_percentage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Персональная скидка, %</label>
                            <input v-model="editModal.form.discount_percentage" type="number" min="0" max="100" name="discount_percentage" id="discount_percentage" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20">
                        </div>
                    </div>
                </form>
            </div>
        </template>
        <template #footer>
            <div class="items-center pt-8 pb-4 rounded-b dark:border-gray-700">
                <uiButtonPrimary @click="submit" :disabled="adminUserStore.loading" type="button">
                    {{ adminUserStore.loading ? 'Загрузка...' : editModal.item ? 'Обновить' : 'Добавить' }}
                </uiButtonPrimary>
            </div>
        </template>
    </DialogModal>
</template>
<style lang="scss">
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -o-appearance: none;
    print-color-adjust: exact;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
    background-position: right .5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}
</style>
