<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useProducts } from "~/stores/products";

const cartStore = useCartStore()
const productStore = useProducts()
const dialog = useDialog()
const dialogProduct = ref<number>(null)

function showModal(product?: models.Product) {
    dialogProduct.value = product
    dialog.open('cartProduct')
}
</script>
<template>
    <div id="main-content" class="dark:bg-gray-900">
        <div v-if="!cartStore.loading && cartStore.cart.length" class="flex flex-col">
            <cartCard
                @showModal="showModal"
                v-for="cart in cartStore.cart" :item="cart"
            />
        </div>

        <p v-show="!cartStore.loading && !cartStore.cart.length">Нет товаров в корзине</p>
        <p v-show="cartStore.loading">Загрузка...</p>
        <teleport to="body">
            <dialogsCartProduct :item="dialogProduct"/>
        </teleport>
    </div>
</template>
