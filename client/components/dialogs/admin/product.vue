<script setup lang="ts">
import _ from 'lodash'
import { useDialog } from '~/stores/dialog'
import { useAdminTags } from "~/stores/admin/tags";
import { useAdminCategory } from "~/stores/admin/categories";
import { useAdminProducts } from "~/stores/admin/products";
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';

const emit = defineEmits(['fetchPageData'])

const productStore = useAdminProducts()
const categoryStore = useAdminCategory()
const tagStore = useAdminTags()
const dialog = useDialog()


type i_FORM = Pick<models.Product, 'name' | 'slug' | 'description' | 'isbn' | 'year_of_production' | 'package_weight' |
    'count_per_package' | 'price' | 'category_id'> & {
    tag_ids: Tags | [],
    media: Files | []
}

const editModal = reactive<{
    show: boolean
    title: string
    formRef: HTMLFormElement | null
    form: i_FORM
    formDefault?: i_FORM
    item: models.Product | null
}>({
    show: false,
    title: '',
    formRef: null,
    form: {
        name: '',
        slug: '',
        description: '',
        isbn: '',
        year_of_production: null,
        package_weight: null,
        count_per_package: null,
        price: null,
        ccfea: null,
        category_id: null,
        tag_ids: [],
        media: [],
    },
    item: null
})

async function fetchParams() {
    if (!tagStore.list.length) {
        await tagStore.getList()
    }
    if (!categoryStore.list.length) {
        await categoryStore.getList()
    }
}
fetchParams();

watch(() => dialog.dialogs.adminProduct.active, v => {
    formClear()

    if (v) {
        bodyFixed()
        showModal()
    } else {
        bodyNotFixed()
        closeModal()
    }
})

function freshData(data?: models.Product|null) {
    if (! editModal.formDefault) {
        editModal.formDefault = Object.assign({}, editModal.form)
    } else {
        editModal.form = Object.assign({}, editModal.formDefault)
    }

    editModal.item = _.cloneDeep(data ?? productStore.current)
    const item = editModal.item
    if (item) {
        editModal.title = `Редактирование позиции: ${item.name} (ID - ${item.id})`
        for (let name in editModal.form) {
            if (item.hasOwnProperty(name)) {
                editModal.form[name] = item[name]
            }
        }
    } else {
        editModal.title = 'Добавление позиции'
    }
}

watch(() => productStore.current, v => {
    freshData(v)
}, {
    deep: true
})

// watch(() => editModal.form.category_id, v => {
//     categoryStore.current = categoryStore.list.find(el => el.id == v)
//
//     if (categoryStore.current) {
//         if (!editModal.form.package_weight && categoryStore.current.package_weight) {
//             editModal.form.package_weight = categoryStore.current.package_weight
//         }
//         if (!editModal.form.count_per_package && categoryStore.current.product_count_per_package) {
//             editModal.form.count_per_package = categoryStore.current.product_count_per_package
//         }
//     }
// })

function formClear() {
    editModal.form = reactive(formDefaults())
}

function formDefaults() {
    return {
        name: '',
        slug: '',
        description: '',
        isbn: '',
        year_of_production: new Date().getFullYear(),
        package_weight: null,
        count_per_package: null,
        price: null,
        ccfea: null,
        category_id: null,
        tag_ids: [],
        media: [],
    }
}

const fetchPageData = () => {
    emit('fetchPageData');
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

async function submit() {
    const m = editModal
    const data = initFormData(_.cloneDeep(m.form))
    let res

    if (m.item) {
        res = await productStore.update(m.item.id, data)
    } else {
        res = await productStore.store(data)
    }

    if (res && res.success) {
        formClear()
        closeModal()

        await fetchPageData()
    }
}

function closeModal() {
    formClear()
    dialog.close('adminProduct')
}

function showModal() {
    freshData()
}
</script>

<template>
    <!-- authorization Popup -->
    <DialogModal max-width="xl" :noFooter="false" :show="dialog.dialogs.adminProduct.active" @close="closeModal()">
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
                            modelName="product"
                            :itemId="editModal.item?.id"
                            @fetchPageData="fetchPageData"
                            class="col-span-6 sm:col-span-6"
                        />

                        <div class="col-span-6" :class="[editModal.item ? 'sm:col-span-3' : 'sm:col-span-6']">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя*</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.name" type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Название">
                        </div>
                        <div v-show="editModal.item" class="col-span-6 sm:col-span-3">
                            <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.slug" type="text" name="slug" id="slug" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Slug">
                        </div>
                        <div class="col-span-6 sm:col-span-6">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
                            <textarea :disabled="productStore.loading" v-model="editModal.form.description" name="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Описание"></textarea>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Артикул (ISBN)</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.isbn" type="text" name="isbn" id="isbn" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="333-3-33333-333-3">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="year_of_production" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Год издания</label>
                            <customDatepicker
                                v-model="editModal.form.year_of_production"
                                :placeholder="editModal.form.year_of_production"
                                :onlyYear="true"
                                format="yyyy"
                                model-type="yyyy"
                                :disabled="productStore.loading"
                            />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория</label>
                            <select :disabled="productStore.loading" v-model="editModal.form.category_id" id="category_id" name="category_id" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option :value="null">Не указано</option>
                                <option v-for="category in categoryStore.list" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тэги</label>
                            <Multiselect
                                :disabled="productStore.loading"
                                v-model="editModal.form.tag_ids"
                                noOptionsText="Нет тэгов"
                                noResultsText="Нет тэгов"
                                :clearOnSelect="false"
                                :closeOnSelect="false"
                                placeholder="Тэги не указаны"
                                name="tag_ids"
                                label="name"
                                valueProp="id"
                                mode="tags"
                                :options="tagStore.list"
                            />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="package_weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Вес пачки, кг</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.package_weight" type="text" name="package_weight" id="package_weight" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Не указано">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="count_per_package" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Количество товара в пачке</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.count_per_package" type="text" name="count_per_package" id="count_per_package" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Не указано">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена без скидки*</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.price" type="number" name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Не указано">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="ccfea" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ТН ВЭД</label>
                            <input :disabled="productStore.loading" v-model="editModal.form.ccfea" type="text" name="ccfea" id="ccfea" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Не указано">
                        </div>
                    </div>
                </form>
            </div>
        </template>
        <template #footer>
            <div class="items-center pt-8 pb-4 rounded-b dark:border-gray-700">
                <uiButtonPrimary @click="submit" :disabled="productStore.loading" type="button">
                    {{ productStore.loading ? 'Загрузка...' : editModal.item ? 'Обновить' : 'Добавить' }}
                </uiButtonPrimary>
            </div>
        </template>
    </DialogModal>
</template>
