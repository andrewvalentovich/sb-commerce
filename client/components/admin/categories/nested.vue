<template>
    <draggable
        v-model="cards"
        :animation="250"
        tag="ul"
        class="dragArea"
        item-key="id"
        :group="{ name: 'children' }"
    >
        <template #item="{element: card}">
            <li class="w-full p-2">
                <button class="px-2 py-1" :disabled="categoryStore.loading" @click="showModal(card)">{{ card.name }}</button>
                <admin-categories-nested
                    :parentId="card.id"
                    v-model="card.children"
                    @showModal="showModal"
                />
            </li>
        </template>
    </draggable>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable'
import { useAdminCategory } from "~/stores/admin/categories";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    parentId: {
        type: Number,
        required: false,
        default: null
    }
})

const categoryStore = useAdminCategory()
const emit = defineEmits(['update:modelValue', 'showModal'])

const showModal = (item) => {
    emit('showModal', item)
}

const cards = computed({
    get() {
        return props.modelValue
    },
    async set(value) {
        // props.modelValue = value
        value?.forEach((v, i) => {
            v.sort_order = i
            v.parent_id = props.parentId ?? null
        })
        emit('update:modelValue', value)
        if (value.length) await categoryStore.sort(JSON.parse(JSON.stringify(value)))
    }
})
</script>

<style scoped>
.dragArea {
    padding-left: 20px;
    min-height: 50px;
    outline: 1px dashed;
}
</style>
