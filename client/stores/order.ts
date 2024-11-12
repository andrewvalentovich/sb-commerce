import { acceptHMRUpdate, defineStore } from 'pinia'

export const useOrder = defineStore('order', {
    state: () => ({
        loading: false
    }),

    getters: {

    },

    actions: {
        async sendCartOrder(body: object, closeDialog?: string) {
            this.loading = true

            try {
                const { data, error } = await useApi(`orders`, {
                    method: 'post',
                    body
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                console.log('data')
                console.log(data.value)

                if (data.value?.success) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)

                    const cartStore = useCartStore()
                    cartStore.cart = [];

                    useDialog().close(`${closeDialog}`)
                }

                return data.value;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false
            }
        },
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useOrder, import.meta.hot))
}

