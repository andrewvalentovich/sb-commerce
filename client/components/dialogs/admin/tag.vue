<script setup lang="ts">
import _ from 'lodash'
import { useDialog } from '~/stores/dialog'
import { useAdminTags } from "~/stores/admin/tags"

const props = defineProps({
    modelValue: {
        type: Object
    }
})
const emit = defineEmits(['update:modelValue', 'fetchPageData'])

const dialog = useDialog()
const tagStore = useAdminTags()
const router = useRouter()
const editModal = ref(props.modelValue)
formClear()

watch(() => dialog.dialogs.adminTag.active, v => {
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
        id: '',
        name: '',
        slug: '',
    }
}

const initFormData = (body: object) => {
    let formData = new FormData()

    for (const key in body) {
        if (body[key]) {
            formData.append(key, body[key])
        }
    }

    return formData;
}

const fetchPageData = () => {
    emit('fetchPageData');
}

async function submit() {
    const m = editModal.value
    const data = initFormData(_.cloneDeep(m.form))
    let res

    if (m.item) {
        res = await tagStore.update(m.item.id, data)
    } else {
        res = await tagStore.store(data)
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
    dialog.close('adminTag')
}

async function showModal() {
    editModal.value.show = true
    if (! editModal.value.formDefault) {
        editModal.value.formDefault = Object.assign({}, editModal.value.form)
    } else {
        editModal.value.form = Object.assign({}, editModal.value.formDefault)
    }

    const item = editModal.value.item
    if (item) {
        editModal.value.title = `Редактирование тэга: ${item.name} (ID - ${item.id})`
        for (let name in editModal.value.form) {
            if (item.hasOwnProperty(name)) {
                editModal.value.form[name] = item[name]
            }
        }
    } else {
        editModal.value.title = 'Добавление тэга'
    }
}

async function destroy() {
    if (! confirm('Действие необратимо!\nВы уверены?')) {
        return
    }

    await tagStore.destroy(editModal.value.item.id)
    await fetchPageData()

    closeModal()
}
</script>

<template>
    <DialogModal max-width="lg" :noFooter="false" :show="dialog.dialogs.adminTag.active" @close="closeModal()">
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
                        <div class="col-span-6 sm:col-span-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название категории</label>
                            <input :disabled="tagStore.loading" v-model="editModal.form.name" type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Название">
                        </div>

                        <div v-show="editModal.item" class="col-span-6 sm:col-span-6">
                            <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug (не обязательно)</label>
                            <input :disabled="tagStore.loading" v-model="editModal.form.slug" type="text" name="slug" id="slug" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="slug">
                        </div>
                    </div>
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center pt-8 pb-4 gap-1 rounded-b dark:border-gray-700">
                <uiButtonPrimary @click="submit" :disabled="tagStore.loading" type="button">
                    {{ tagStore.loading ? 'Загрузка...' : editModal.item ? 'Обновить' : 'Создать' }}
                </uiButtonPrimary>
                <uiButtonDanger v-if="editModal.item" @click="destroy" :disabled="tagStore.loading" type="button">
                    Удалить
                </uiButtonDanger>
            </div>
        </template>
    </DialogModal>
</template>
