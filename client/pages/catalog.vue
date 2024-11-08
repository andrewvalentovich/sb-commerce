<script setup lang="ts">
definePageMeta({
    name: "catalog",
    breadcrumbs: "Каталог"
})

import { Filter } from "~/utils/filter";
import { useTags } from "~/stores/tags";
import { useCategories } from "~/stores/categories";
import { useProducts } from "~/stores/products";

const productStore = useProducts()
const categoryStore = useCategories()
const tagStore = useTags()
const dialog = useDialog()

productStore.filter = new Filter(productStore.filterParams)
await productStore.filter.parseUrlQuery()

async function fetchParams() {
    await tagStore.getList()
    await categoryStore.getList()
}
await fetchParams();
await productStore.get(productStore.filter.getCloneFilterParams());

watch(productStore.filterParams, v => {
    productStore.filter.updateUrlQuery(v, 'catalog')
    if (v.active_dialog_slug) {
        dialog.open('catalogProduct')
    }
}, {
    deep: true
})

if (productStore.filterParams.active_dialog_slug) {
    dialog.open('catalogProduct')
}
</script>
<template>
    <Breadcrumbs class="col-span-12 mb-6" />
    <catalogAside class="col-span-12"/>
    <catalogSidebar class="col-span-12 xl:col-span-3"/>
    <catalogContent class="col-span-12 xl:col-span-9"/>
    <teleport to="body">
        <dialogsCatalogProduct/>
    </teleport>
</template>
