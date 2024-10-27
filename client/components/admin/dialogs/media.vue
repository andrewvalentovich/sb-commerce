<script setup lang="ts">
import _ from 'lodash'
import { useAdminMedia } from '~/stores/admin/media'
import { useAdminCategory } from '~/stores/admin/categories'

const { $dialog, $toast } = useNuxtApp()
const formRef = ref(null)
const addAttachmentsRef = ref(null)
const mediaStore = useAdminMedia()
const categoryStore = useAdminCategory()

const emit = defineEmits(['fetchPageData', 'update:modelValue'])

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    itemId: {
        type: Number,
        default: null
    }
})

const mediaData = ref<models.ManyMedia|[]>(_.cloneDeep(props.modelValue))

watch(() => props.modelValue, v => {
    console.log('watch in media dialog')
    console.log(v)
    mediaData.value = _.cloneDeep(v)
}, {
    deep: true
})

const fetchPageData = () => {
    emit('fetchPageData');
}

const updateModelValue = () => {
    emit('update:modelValue', _.cloneDeep(mediaData.value))
}

const initFormData = (body: object) => {
    let formData = new FormData();
    const bodyData = props.itemId ? body.filter(el => !el.id) : body
    const files = bodyData.map((el) => el = el.file)

    for (let i = 0; i < files.length; i++) {
        formData.append(`files[${i}]`, files[i]);
    }
    return formData;
}

const submit = async () => {
    let formData = initFormData(_.cloneDeep(mediaData.value))
    const res = await mediaStore.store(props.modelName, props.itemId, formData);

    if (res) {
        fetchPageData()
    } else {
        removeLocal()
    }
}

const selectFiles = async (e) => {
    await addAttachmentPreview(e);

    if (props.itemId) {
        await submit()
    } else {
        updateModelValue()
    }
}

async function addAttachmentPreview(e: Event) {
    const target = e.target as HTMLInputElement
    const files = target.files as FileList

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const data = await createReaderFromFile(file)

        mediaData.value.push({
            url: data.currentTarget.result,
            file
        })
    }
}

async function removeAttachmentPreview(item) {
    if (mediaData.value && mediaData.value.length) {
        if (! addAttachmentsRef.value) {
            return
        }

        if (item.id) {
            const res = await mediaStore.destroy(props.modelName, props.itemId, item.id);

            if (res) {
                fetchPageData()
            }
        } else {
            const itemIndex = mediaData.value.findIndex(v => v === item)

            const dt = new DataTransfer()
            const files = addAttachmentsRef.value.files as FileList
            for (let i = 0; i < files.length; i++) {
                if (i === itemIndex) {
                    continue
                }

                dt.items.add(files[i])
            }

            mediaData.value.splice(itemIndex, 1)
            addAttachmentsRef.value.files = dt.files
            updateModelValue()
        }
    }
}

async function removeLocal() {
    if (mediaData.value.length) {
        const dt = new DataTransfer()
        mediaData.value = mediaData.value.filter(el => el.id !== undefined)
        addAttachmentsRef.value.files = dt.files
    }
}
</script>
<template>
    <div>
        <p v-show="mediaStore.loading || categoryStore.loading">Загрузка...</p>
        <div v-if="mediaData?.length" class="grid grid-flow-row grid-cols-3 gap-2 mb-4">
            <div class="w-full relative pt-[60%]" v-for="media in mediaData">
                <img class="absolute w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 object-cover" :src="media.url" alt="preview">
                <div
                    v-show="!mediaStore.loading && !categoryStore.loading"
                    class="absolute flex justify-center items-center w-4 h-4 top-1 right-1 bg-red-600 text-white rounded-full text-xs leading-3 cursor-pointer"
                    @click="removeAttachmentPreview(media)"
                >X</div>
            </div>
        </div>
        <p v-else>Нет медиа</p>
        <div class="mt-2">
            <label for="media" type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
                Загрузить медиа
            </label>
            <input
                :disabled="mediaStore.loading || categoryStore.loading"
                id="media"
                type="file"
                name="files[]"
                hidden
                ref="addAttachmentsRef"
                accept=".jpeg, .jpg, .png, .webp, .mp4"
                @change="selectFiles($event)"
                multiple
            >
        </div>
    </div>
</template>
