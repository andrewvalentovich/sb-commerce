import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";


export const useCartStore = defineStore('cart', () => {
    console.log('useLocalStorage')
    console.log(useLocalStorage('cart', []))
    const cart = ref<Object>(useLocalStorage('cart', []))
    console.log('cart')
    console.log(cart)

    function getItemIds(): object
    {
        // console.log('getItemIds')
        return cart.value.map((item) => { return item.id ?? null }).filter(el => !!el)
    }

    function getItemIndex(item: models.Product): number
    {
        // console.log('getItemIndex')
        return cart.value ? cart.value.findIndex(el => el.id == item.id) : -1;
    }

    function getItem(item: models.Product): object
    {
        // console.log('getItem')
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
        console.log('add')
        if (item) {
            cart.value.push({ ...item, quantity: quantity })
        }
    }

    function remove(item: models.Product): void
    {
        console.log('remove')
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
            console.log('v')
            console.log(v)
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
