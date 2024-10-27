<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';

const props = defineProps({
    disabledSelect: {
        type: Boolean,
        default: true
    },
    modelValue: {
        require: true,
        type: Object
    },
    name: {
        require: true,
        type: String
    },
    label: {
        require: true,
        type: String
    },
    placeholder: {
        type: String
    },
    options: {
        require: true,
        type: Object
    },
    optionValue: {
        require: true,
        type: String
    },
    optionName: {
        require: true,
        type: String
    },
    noOptionsText: {
        require: true,
        type: String
    },
    noResultsText: {
        require: true,
        type: String
    },
    clearOnSelect: {
        default: false,
        type: Boolean
    },
    closeOnSelect: {
        default: false,
        type: Boolean
    },
    searchable: {
        default: false,
        type: Boolean
    },
    trackBy: {
        type: String
    },
    mode: {
        type: String,
        default: 'tags'
    }
})

const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)
const label = ref(props.label)

watch(() => props.label, v => {
    label.value = v;
})

watch(() => model.value, v => {
    emit('update:modelValue', v)
})

const formatToSelectOptions = () => {
    let options = [];

    if (props.options.length) {
        for (const el of props.options) {
            options.push({value: el.id, label: el.name})
        }
    }

    return options;
}
</script>
<template>
    {{ options }}
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <Multiselect
        :noOptionsText="noOptionsText"
        :noResultsText="noResultsText"
        :clearOnSelect="clearOnSelect"
        :closeOnSelect="closeOnSelect"
        :searchable="searchable"
        :placeholder="placeholder"
        :mode="mode"
        @change="$emit('update:modelValue', model)"
        :name="name"
        :label="label"
        v-model="model"
        :options="formatToSelectOptions"
    />
</template>
