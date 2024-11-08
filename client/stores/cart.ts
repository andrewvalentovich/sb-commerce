import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";


export const useCartStore = defineStore('cart', () => {
    console.log('useLocalStorage')
    console.log(useLocalStorage('cart', []))
    const cart = ref<Object>(useLocalStorage('cart', []))
    console.log('cart')
    console.log(cart)
    // const cart = computed({
    //     get() {
    //         return useLocalStorage('cart', [])
    //     }
    // })

    // function updateCartInLocalStorage() {
    //     useLocalStorage('cart', cart.value)
    // }

    function getItemIds(): object
    {
        console.log('getItemIds')
        return cart.value.map((item) => { return item.id })
    }

    function getItemIndex(item: models.Product): number
    {
        console.log('getItemIndex')
        return cart.value ? cart.value.findIndex(el => el.id == item.id) : -1;
    }

    function getItem(item: models.Product): object
    {
        console.log('getItem')
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
        useLocalStorage('cart', cart.value)
    }

    function remove(item: models.Product): void
    {
        const index = getItemIndex(item)

        if (index != -1) {
            cart.value.splice(index, 1)
        }
        useLocalStorage('cart', cart.value)
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
