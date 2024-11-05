<script setup lang="ts">
import _ from 'lodash';
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

watch(props.data, (v) => {
    pages.value = _.cloneDeep(v.meta.links)
    handlePages()
})

const emit = defineEmits(['pagination-change-page'])
const pages = ref(_.cloneDeep(props.data.meta.links))

async function handlePages() {
    const nextIndex = pages.value.findIndex(el => el.label == '&laquo; Назад')
    pages.value.splice(nextIndex, 1)
    const prevIndex = pages.value.findIndex(el => el.label == 'Вперёд &raquo;')
    pages.value.splice(prevIndex, 1)
}
await handlePages()

function paginationChangePage(page) {
    emit('changePage', page)
}

</script>
<template>
    <nav v-if="pages.length > 1" aria-label="Pagination" class="flex items-center text-gray-600">
        <button
            :disabled="data.meta.current_page <= 1"
            @click="paginationChangePage(--data.meta.current_page)"
            class="p-2 mr-4 rounded"
            :class="[data.meta.current_page <= 1 ? '' : 'hover:bg-gray-100']"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <button
            v-for="page in pages"
            :disabled="data.meta.current_page == page.label"
            @click="paginationChangePage(page.label)"
            class="px-4 py-2 rounded"
            :class="{
                'bg-gray-200 text-gray-900 font-medium' : data.meta.current_page == page.label,
                'hover:bg-gray-100' : !page.active
            }"
        >
            {{ page.label }}
        </button>

        <button
            :disabled="data.meta.last_page <= data.meta.current_page"
            @click="paginationChangePage(++data.meta.current_page)"
            class="p-2 ml-4 rounded"
            :class="[data.meta.last_page <= data.meta.current_page ? '' : 'hover:bg-gray-100']"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </nav>
</template>
