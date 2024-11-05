import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useProducts } from "~/stores/products";


export const useCartStore = defineStore('cart', () => {
    const cart = ref(useLocalStorage('cart', []))

    function getItemIds(): object
    {
        return cart.value.map((item) => { return item.id })
    }

    function getItemIndex(item: models.Product): number
    {
        return cart.value ? cart.value.findIndex(el => el.id == item.id) : -1;
    }

    function getItem(item: models.Product): object
    {
        const index = getItemIndex(item)
        return index !== -1 ? cart.value[index] : null
    }

    function increase(item: object): void
    {
        item.quantity++
    }

    function decrease(item: object): void
    {
        if (item.quantity <= 1) {
            remove(item)
        } else {
            item.quantity--
        }
    }

    function add(item: models.Product, quantity: number = 1): void
    {
        cart.value.push({ ...item, quantity: quantity })
    }

    function remove(item: models.Product): void
    {
        const index = getItemIndex(item)

        if (index != -1) {
            cart.value.splice(index, 1)
        }
    }

    function exist(item: models.Product): boolean
    {
        return getItemIndex(item) != -1
    }

    watch(
        () => cart.value,
        (v) => {
            useLocalStorage('cart', v)
        },
        { deep: true }
    )

    return {
        cart,
        getItemIds,
        getItemIndex,
        getItem,
        increase,
        decrease,
        add,
        remove,
        exist,
    }
}, {
    persist: true
})
