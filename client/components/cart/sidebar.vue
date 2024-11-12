<script setup lang="ts">
import _ from 'lodash';
import { useProducts } from "~/stores/products";
import { useCartStore } from "~/stores/cart";
import { useDialog } from "~/stores/dialog";

const dialog = useDialog()
const productStore = useProducts()
const cartStore = useCartStore()

const price = computed({
    get() {
        return cartStore.cart.reduce((a, b) => { return a + b.price * b.quantity }, 0)
    }
})

const old_price = computed({
    get() {
        return cartStore.cart.reduce((a, b) => { return a + b.old_price * b.quantity }, 0)
    }
})

const weight = computed({
    get() {
        return cartStore.cart.reduce((a, b) => { return a + parseInt(b.package_weight) * b.quantity }, 0)
    }
})
</script>
<template>
    <div class="p-8 flex flex-col bg-slate-50">
        <div class="w-full flex flex-col">
            <p class="text-xl pb-4 text-gray-900 font-medium">Информация о заказе</p>
            <div class="flex justify-between py-4 border-b border-gray-200">
                <span class="text-base text-gray-500 font-medium">Количество позиций</span>
                <span class="text-base text-gray-500 font-medium">{{ cartStore.cart.length }}</span>
            </div>
            <div class="flex justify-between py-4 border-b border-gray-200">
                <span class="text-base text-gray-500 font-medium">Вес заказа</span>
                <span class="text-base text-gray-500 font-medium">{{ weight }} кг</span>
            </div>
            <div class="flex justify-between pt-4">
                <p class="text-lg pb-4 text-gray-900 font-medium">Итог</p>
                <span v-if="price != old_price" class="text-lg text-gray-900 font-medium">
                    {{ old_price }} ₽
                    <span class="pl-1 text-sm font-medium text-gray-500 line-through">{{ price }} ₽</span>
                </span>
                <span v-else class="text-lg text-gray-900 font-medium">{{ price }} ₽</span>
            </div>

            <uiButtonPrimary
                class="mt-4"
                :disabled="productStore.loading || !cartStore.cart.length"
                @click="dialog.open('cartOrder')"
            >
                <span class="text-lg">Заказать</span>
            </uiButtonPrimary>
        </div>
        <teleport to="body">
            <dialogsCartOrder/>
        </teleport>
    </div>
</template>
