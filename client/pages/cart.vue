<script setup lang="ts">
definePageMeta({
    name: "cart",
    breadcrumbs: "Корзина",
});

import { useProducts } from "~/stores/products";
import { useCartStore } from "~/stores/cart";

const productStore = useProducts()
const cartStore = useCartStore()
const dialog = useDialog()

await productStore.getCart()
</script>
<template>
    <Breadcrumbs class="col-span-12 mb-6" />
    <cartAside class="col-span-12"/>

    <cartContent class="col-span-12 xl:col-span-8"/>
    <cartSidebar class="col-span-12 xl:col-span-4"/>
</template>
