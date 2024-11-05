import { acceptHMRUpdate, defineStore } from 'pinia'

export const useApplication = defineStore('application', {
    state: () => ({
        loading: false
    }),

    getters: {

    },

    actions: {
        async sendCartOrder(body: object, closeDialog?: string) {
            this.loading = true

            try {
                const { data, error } = await useApi(`application`, {
                    method: 'post',
                    body
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value?.success) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)

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
    import.meta.hot.accept(acceptHMRUpdate(useApplication, import.meta.hot))
}

