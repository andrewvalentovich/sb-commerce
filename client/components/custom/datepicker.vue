<script setup lang="ts">
const props = defineProps({
    modelValue: String,
    inputName: String,
    placeholder: String,
    onlyYear: {
        type: Boolean,
        default: false
    },
    format: {
        type: String,
        default: 'yyyy-MM-dd'
    },
    modelType: {
        type: String,
        default: 'yyyy-MM-dd'
    }
});

const emit = defineEmits(['update:modelValue']);

const date = ref(props.modelValue);
watch(() => props.modelValue, v => {
    date.value = v
})
watch(date, v => {
    emit('update:modelValue', v)
})
</script>

<template>
    <Datepicker
        v-model="date"
        class="label-input"
        menuClassName="hide__selection_preview"
        selectText="Выбрать"
        cancelText="Отменить"
        :format="format"
        :model-type="modelType"
        :year-picker="onlyYear"
    >
        <template #dp-input="{ value, onInput, onEnter, onTab, onClear, onBlur, onKeypress, onPaste, isMenuOpen }">
            <input
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                :placeholder="placeholder"
                :name="inputName"
                :value="value"
            />
        </template>
    </Datepicker>
</template>
