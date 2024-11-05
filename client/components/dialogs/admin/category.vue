<script setup lang="ts">
import _ from 'lodash'
import { useDialog } from '~/stores/dialog'
import { useAdminCategory } from "~/stores/admin/categories"
import { useAdminMedia } from '~/stores/admin/media'
const emit = defineEmits(['fetchPageData'])

const dialog = useDialog()
const categoryStore = useAdminCategory()
const mediaStore = useAdminMedia()
const router = useRouter()

const editModal = reactive<{
    show: boolean
    title: string
    formRef: HTMLFormElement | null
    form: i_FORM
    formDefault?: i_FORM
    item: models.Category | null
}>({
    title: '',
    formRef: null,
    form: {
        id: '',
        name: '',
        slug: '',
        description: '',
        media: [],
        parent_id: null,
        sort_order: ''
    },
    item: null
})

watch(() => dialog.dialogs.adminCategory.active, v => {
    formClear()

    if (v) {
        bodyFixed()
        showModal()
    } else {
        bodyNotFixed()
        closeModal()
    }
})

function formClear() {
    editModal.form = reactive(formDefaults())
}

function formDefaults() {
    return {
        id: '',
        name: '',
        slug: '',
        description: '',
        media: [],
        parent_id: null,
        sort_order: ''
    }
}

const initFormData = (body: object) => {
    let formData = new FormData()

    for (const key in body) {
        if (body[key]) {
            if (Array.isArray(body[key])) {
                if (key == 'media') {
                    body[key] = body[key].map(el => el = el.file)
                }
                for (let i = 0; i < body[key].length; i++) {
                    formData.append(`${key}[${i}]`, body[key][i]);
                }
            } else {
                formData.append(key, body[key])
            }
        }
    }

    return formData;
}

const fetchPageData = () => {
    emit('fetchPageData');
}

async function submit() {
    const m = editModal
    const data = initFormData(_.cloneDeep(m.form))
    let res

    if (m.item) {
        res = await categoryStore.update(m.item.id, data)
    } else {
        res = await categoryStore.store(data)
    }

    if (res && res.success) {
        formClear()
        closeModal()

        await fetchPageData()
    }
}

function closeModal() {
    formClear()

    dialog.close('adminCategory')
}

function freshData(data?: models.Category|null) {
    if (! editModal.formDefault) {
        editModal.formDefault = Object.assign({}, editModal.form)
    } else {
        editModal.form = Object.assign({}, editModal.formDefault)
    }

    editModal.item = _.cloneDeep(data ?? categoryStore.current)

    const item = editModal.item
    if (item) {
        editModal.title = `Редактирование категории: ${item.name} (ID - ${item.id})`
        for (let name in editModal.form) {
            if (item.hasOwnProperty(name)) {
                editModal.form[name] = item[name]
            }
        }
    } else {
        editModal.title = 'Добавление категории'
    }
    editModal.showMedia = true;
}

watch(() => categoryStore.current, v => {
    freshData(v)
}, {
    deep: true
})

async function showModal() {
    await categoryStore.getList()
    freshData()
}

async function destroy() {
    if (! confirm('Действие необратимо!\nВы уверены?')) {
        return
    }

    await categoryStore.destroy(editModal.item.id)
    await fetchPageData()

    closeModal()
}
</script>

<template>
    <!-- authorization Popup -->
    <DialogModal max-width="lg" :noFooter="false" :show="dialog.dialogs.adminCategory.active" @close="closeModal()">
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
                        <adminDialogsMedia
                            v-model="editModal.form.media"
                            modelName="category"
                            :itemId="editModal.item?.id"
                            @fetchPageData="fetchPageData"
                            class="col-span-6 sm:col-span-6"
                        />

                        <div class="col-span-6 sm:col-span-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название категории</label>
                            <input :disabled="categoryStore.loading" v-model="editModal.form.name" type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Название">
                        </div>

                        <div class="col-span-6 sm:col-span-6">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание (не обязательно)</label>
                            <textarea :disabled="categoryStore.loading" v-model="editModal.form.description" name="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Описание"></textarea>
                        </div>

                        <div v-show="editModal.item" class="col-span-6 sm:col-span-6">
                            <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug (не обязательно)</label>
                            <input :disabled="categoryStore.loading" v-model="editModal.form.slug" type="text" name="slug" id="slug" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Отображение названия в url">
                        </div>

                        <div v-show="!editModal.item" class="col-span-6 sm:col-span-6">
                            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Родительская категория (к которой привязать текущую)</label>
                            <select :disabled="categoryStore.loading" v-if="!categoryStore.loading" v-model="editModal.form.parent_id" id="status" name="status" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option :value="null">Не указано</option>
                                <option
                                    v-if="categoryStore.list && categoryStore.list.length > 0"
                                    v-for="category in categoryStore.list"
                                    v-bind:value="category.id"
                                    :selected="editModal.form.parent_id === category.id"
                                >
                                    {{ category.id + '. ' + category.name }}
                                </option>
                            </select>
                            <p v-else>Загрузка...</p>
                        </div>
                    </div>
                </form>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center pt-8 pb-4 gap-1 rounded-b dark:border-gray-700">
                <uiButtonPrimary @click="submit" :disabled="categoryStore.loading" type="button">
                    {{ categoryStore.loading ? 'Загрузка...' : editModal.item ? 'Обновить' : 'Создать' }}
                </uiButtonPrimary>
                <uiButtonDanger v-if="editModal.item" @click="destroy" :disabled="categoryStore.loading" type="button">
                    Удалить
                </uiButtonDanger>
            </div>
        </template>
    </DialogModal>
</template>
